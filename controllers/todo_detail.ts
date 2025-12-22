//controllers/todo_detail.ts
import { ref, nextTick, computed } from 'vue';
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app';
import { updateTodo, getTodoDetail, getTodoMessages, createTodoMessage, deleteTodoMessage, getTodoMessageDetail, updateTodoMessage, reactionTodoMessage, uploadTodoFile } from '@/api/todo';
import { getAllMembers } from '@/api/project';
import { getCrmCustomerDetail, getCrmActionTimeline } from '@/api/crm';
import { mapTodoDetailToForm, type TodoDetailForm } from '@/models/todo_detail';
import { TIMELINE_TYPE_MAP } from '@/utils/constants';
import { useAuthStore } from '@/stores/auth';
import {
	formatRelativeTime,
	getMinuteTimestamp,
	validateNotifyAndDueDate,
	timestampToDateTimeStr
} from '@/utils/dateUtils';
import { TODO_STATUS } from '@/utils/constants';
import { showSuccess, showError, showInfo } from '@/utils/toast';
import { extractLinksAndCleanHtml } from '@/utils/linkHelper';
import { useI18n } from 'vue-i18n';
interface CommentItem {
	id : number;
	senderId : string | number;
	senderName : string;
	senderAvatarChar : string;
	senderAvatarColor : string;
	message : string;
	files : string;
	timeDisplay : string;
	actionText : string;
	isEdited : boolean;
	type : string;
	reactions : any[];
	children : CommentItem[];
	rootParentId ?: number;
	isMe : boolean;
}

interface HistoryItem {
	id : number;
	timeStr : string;
	content : string;
	actorName : string;
	originalType : string;
}
export const useTodoDetailController = () => {
	const { t } = useI18n();
	const authStore = useAuthStore();
	const currentUserId = computed(() => authStore.uid);
	const isLoading = ref(false);
	const isLoadingCustomer = ref(false);
	const isLoadingHistory = ref(false);
	const historyList = ref<HistoryItem[]>([]);
	const isHistoryOpen = ref(false);
	const comments = ref<CommentItem[]>([]);
	const isLoadingComments = ref(false);

	const newCommentText = ref('');
	const isSubmittingComment = ref(false);


	const isConfirmDeleteCommentOpen = ref(false);
	const commentToDeleteId = ref<number | null>(null);

	const isEditingComment = ref(false);
	const editingMemberName = ref('');
	const isConfirmCancelEditOpen = ref(false);
	const isReplying = ref(false);
	const isConfirmCancelReplyOpen = ref(false);
	const replyingCommentData = ref<CommentItem | null>(null);
	const replyingMemberName = ref('');

	const isEmojiPickerOpen = ref(false);
	const currentReactingComment = ref<any>(null);
	const emojiList = ['👍', '👎', '😍', '😆', '😱', '😭', '😤'];

	const commentFilterIndex = ref(0);
	const commentFilterOptions = computed(() => [
		t('todo.filter_activity_all'),
		t('todo.filter_activity_comment')
	]);
	const commentFilterValues = ['', 'COMMENT'];

	const isSavingDescription = ref(false);
	const replyingMessagePreview = ref('');
	const isDone = computed(() => {
		return form.value.raw && form.value.raw.status === 'DONE';
	});
	const toggleHistory = () => {
		isHistoryOpen.value = !isHistoryOpen.value;
	};
	const convertDateTimeToTimestamp = (dateTimeStr : string) : number => {
		if (!dateTimeStr) return 0;
		try {
			const safeStr = dateTimeStr.replace(/-/g, '/');
			return new Date(safeStr).getTime();
		} catch {
			return 0;
		}
	};


	const isStatusDisabled = computed(() => {
		if (!form.value.raw) return true;
		return form.value.raw.status === 'DONE';
	});
	const onDateUpdate = async (event : { field : string, value : string }) => {
		if (isDone.value) return;
		if (!form.value.raw) return;
		let tempDueDate = form.value.dueDate;
		let tempNotifyAt = form.value.notifyAt;

		if (event.field === 'dueDate') {
			tempDueDate = event.value;
		} else if (event.field === 'notifyAt') {
			tempNotifyAt = event.value;
		}

		const isValid = validateNotifyAndDueDate(tempDueDate, tempNotifyAt);

		if (!isValid) {
			showInfo(t('todo.msg_notify_must_be_before_due'));
			const oldValue = event.field === 'dueDate' ? form.value.dueDate : form.value.notifyAt;
			if (event.field === 'dueDate') {
				form.value.dueDate = form.value.raw.dueDate ? timestampToDateTimeStr(form.value.raw.dueDate) : '';
			} else {
				form.value.notifyAt = form.value.raw.notificationReceivedAt ? timestampToDateTimeStr(form.value.raw.notificationReceivedAt) : '';
			}
			return;
		}

		isLoading.value = true;
		try {
			const payload = {
				...form.value.raw,
				preFixCode: "TODO",
				description: form.value.desc,
				files: "",
				tagCodes: "",
				title: form.value.title || form.value.raw.title
			};
			const ts = convertDateTimeToTimestamp(event.value);

			if (event.field === 'dueDate') {
				payload.dueDate = ts;
			} else if (event.field === 'notifyAt') {
				payload.notificationReceivedAt = ts;
			}

			console.log(`Payload Update ${event.field}:`, payload);
			const res = await updateTodo(payload);

			if (res) {
				showSuccess(t('todo.msg_update_success'));

				if (event.field === 'dueDate') {
					form.value.raw.dueDate = payload.dueDate;
					form.value.dueDate = event.value;
				} else {
					form.value.raw.notificationReceivedAt = payload.notificationReceivedAt;
					form.value.notifyAt = event.value;
				}

				if (form.value.customerCode) await fetchHistoryLog(form.value.customerCode);
				await fetchComments(form.value.id);
			}
		} catch (error) {
			console.error("Lỗi cập nhật ngày:", error);
			showError(t('todo.msg_update_error'));
			if (event.field === 'dueDate') {
				form.value.dueDate = timestampToDateTimeStr(form.value.raw.dueDate);
			} else {
				form.value.notifyAt = timestampToDateTimeStr(form.value.raw.notificationReceivedAt);
			}
		} finally {
			isLoading.value = false;
		}
	};
	const isHtmlContentEmpty = (html : string) => {
		if (!html) return true;

		// 1. Nếu có ảnh hoặc video (iframe) thì coi như KHÔNG rỗng
		if (html.includes('<img') || html.includes('<iframe')) {
			return false;
		}

		// 2. Thay thế các ký tự khoảng trắng đặc biệt (&nbsp;) thành khoảng trắng thường
		let textOnly = html.replace(/&nbsp;/gi, ' ');

		// 3. Loại bỏ toàn bộ thẻ HTML (<p>, <br>, <div>...)
		textOnly = textOnly.replace(/<[^>]+>/g, '');

		// 4. Cắt khoảng trắng đầu đuôi và kiểm tra độ dài
		return textOnly.trim().length === 0;
	};
	const processCommentInput = async (htmlContent : string) : Promise<{ cleanMessage : string, fileUrl : string }> => {
		if (!htmlContent) return { cleanMessage: '', fileUrl: '' };

		const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
		let match;
		let fileUrl = '';
		let cleanMessage = htmlContent;

		const uploadPromises : Promise<string>[] = [];

		while ((match = imgRegex.exec(htmlContent)) !== null) {
			const fullImgTag = match[0];
			const src = match[1];

			cleanMessage = cleanMessage.replace(fullImgTag, '');

			if (!src.startsWith('http') && !src.startsWith('https')) {
				const p = uploadTodoFile(src)
					.then(serverUrl => serverUrl)
					.catch(err => {
						console.error('Upload ảnh bình luận lỗi:', err);
						return '';
					});
				uploadPromises.push(p);
			} else {

				fileUrl = src;
			}
		}

		if (uploadPromises.length > 0) {
			const results = await Promise.all(uploadPromises);
			const successfulUrl = results.find(u => u !== '');
			if (successfulUrl) {
				fileUrl = successfulUrl;
			}
		}

		cleanMessage = cleanMessage.trim();

		return { cleanMessage, fileUrl };
	};
	const processDescriptionImages = async (htmlContent : string) : Promise<{ newContent : string, fileUrls : string[] }> => {
		if (!htmlContent) return { newContent: '', fileUrls: [] };

		const imgRegex = /<img[^>]+src="([^">]+)"/g;
		let match;
		const promises : Promise<any>[] = [];
		const replacements : { oldSrc : string, newSrc : string }[] = [];
		const uploadedUrls : string[] = [];

		while ((match = imgRegex.exec(htmlContent)) !== null) {
			const src = match[1];
			if (!src.startsWith('http') && !src.startsWith('https')) {
				const uploadPromise = uploadTodoFile(src)
					.then(serverUrl => {
						replacements.push({ oldSrc: src, newSrc: serverUrl });
						uploadedUrls.push(serverUrl);
					})
					.catch(err => {
						console.error(`Upload ảnh detail lỗi:`, err);
					});
				promises.push(uploadPromise);
			}
		}

		if (promises.length > 0) {
			await Promise.all(promises);
		}

		let newHtml = htmlContent;
		replacements.forEach(rep => {
			newHtml = newHtml.split(rep.oldSrc).join(rep.newSrc);
		});

		return { newContent: newHtml, fileUrls: uploadedUrls };
	};

	const onSaveDescription = async () => {
		if (isDone.value) return;
		if (!form.value.raw) {
			showError(t('common.error_missing_data'));
			return;
		}

		isSavingDescription.value = true;


		try {

			const { newContent, fileUrls } = await processDescriptionImages(form.value.desc);

			form.value.desc = newContent;

			const filesString = fileUrls.length > 0 ? fileUrls.join(',') : '';

			const payload = {
				...form.value.raw,
				preFixCode: "TODO",
				description: form.value.desc,
				files: filesString,
				tagCodes: "",
				title: form.value.title || form.value.raw.title,
			};

			console.log("Payload Update Description:", payload);

			const res = await updateTodo(payload);

			if (res) {
				showSuccess(t('todo.msg_desc_saved'));


				form.value.raw.description = form.value.desc;
				if (filesString) {
					form.value.raw.files = filesString;
				}
				await fetchComments(form.value.id);
			}
		} catch (error) {
			console.error("Lỗi cập nhật công việc:", error);
			showError(t('common.error_update'));
		} finally {

			isSavingDescription.value = false;
		}
	};
	const onSaveTitle = async () => {
		if (isDone.value) return;
		if (!form.value.raw) return;

		const newTitle = form.value.title ? form.value.title.trim() : '';
		const oldTitle = form.value.raw.title;

		if (!newTitle) {
			showInfo(t('todo.msg_title_empty'));
			form.value.title = oldTitle;
			return;
		}

		if (newTitle === oldTitle) return;


		isLoading.value = true;
		try {

			const payload = {
				...form.value.raw,
				title: newTitle,
				preFixCode: "TODO",
				description: form.value.raw.description,
				files: form.value.raw.files || "",
				tagCodes: form.value.raw.tagCodes || ""
			};

			console.log("Payload Update Title:", payload);

			const res = await updateTodo(payload);

			if (res) {
				showSuccess(t('todo.msg_title_changed'));

				form.value.raw.title = newTitle;

				if (form.value.customerCode) {
					await fetchHistoryLog(form.value.customerCode);
				}
				await fetchComments(form.value.id);
			}
		} catch (error) {
			console.error("Lỗi cập nhật tiêu đề:", error);
			showError(t('todo.msg_update_error'));
			form.value.title = oldTitle;
		} finally {

			isLoading.value = false;
		}
	};
	const onRequestReply = async (item : any) => {
		isEditingComment.value = false;
		editingCommentData.value = null;
		newCommentText.value = '';

		replyingCommentData.value = item;


		const rawMsg = item.message || '';

		const { cleanHtml } = extractLinksAndCleanHtml(rawMsg);
		replyingMessagePreview.value = cleanHtml;


		isReplying.value = true;

		const senderId = item.senderId;
		const foundMember = memberList.value.find(m => m.memberUID === senderId);
		if (foundMember) {
			replyingMemberName.value = foundMember.UserName;
		} else {
			replyingMemberName.value = t('todo.user_hidden');
		}

		await nextTick();
	};

	const onCancelReply = () => {

		if (!newCommentText.value.trim()) {
			confirmCancelReply();
		} else {
			isConfirmCancelReplyOpen.value = true;
		}
	};

	const confirmCancelReply = () => {
		isConfirmCancelReplyOpen.value = false;
		resetReplyState();
	};

	const continueReplying = () => {
		isConfirmCancelReplyOpen.value = false;
	};
	const getCurrentMemberUID = () => {
		const currentSystemUID = String(authStore.uid);
		const member = memberList.value.find(m => String(m.UID) === currentSystemUID);
		if (member) {
			return member.memberUID;
		}
		return currentSystemUID;
	};
	const submitReply = async () => {
		if (isHtmlContentEmpty(newCommentText.value)) {
			showInfo(t('todo.msg_empty_content'));
			return;
		}
		if (!replyingCommentData.value) return;

		isSubmittingComment.value = true;

		try {
			const { cleanMessage, fileUrl } = await processCommentInput(newCommentText.value);

			const todoId = form.value.id;
			const senderId = getCurrentMemberUID();
			let apiParentId = replyingCommentData.value.id;

			if (replyingCommentData.value.rootParentId) {
				apiParentId = replyingCommentData.value.rootParentId;
			}

			const payload = {
				todoId: todoId,
				senderId: senderId,
				message: cleanMessage,
				files: fileUrl,
				parentId: apiParentId
			};
			const newReplyId = await createTodoMessage(payload);

			if (newReplyId) {
				showSuccess(t('todo.msg_reply_success'));
				const newReplyData = await getTodoMessageDetail(newReplyId, form.value.id);
				const processedReply = processCommentData(newReplyData);

				const rootParentId = replyingCommentData.value.rootParentId || replyingCommentData.value.id;

				const parentComment = comments.value.find(c => c.id === rootParentId);
				if (parentComment) {
					if (!parentComment.children) parentComment.children = [];
					processedReply.rootParentId = rootParentId;
					parentComment.children.push(processedReply);
				}

				resetReplyState();

			}
		} catch (error) {
			console.error("Lỗi gửi trả lời:", error);
			showError(t('common.error_send'));
		} finally {
			isSubmittingComment.value = false;
		}
	};

	const resetReplyState = () => {
		isReplying.value = false;
		replyingCommentData.value = null;
		replyingMessagePreview.value = '';
		replyingMemberName.value = '';
		newCommentText.value = '';
	};

	const onToggleEmojiPicker = (commentItem : any) => {
		currentReactingComment.value = commentItem;
		isEmojiPickerOpen.value = true;
	};

	const closeEmojiPicker = () => {
		isEmojiPickerOpen.value = false;
		currentReactingComment.value = null;
	};

	const selectEmoji = async (emoji : string) => {
		if (!currentReactingComment.value) return;

		const messageId = currentReactingComment.value.id;


		closeEmojiPicker();

		const todoId = form.value.id;
		const senderId = authStore.uid;

		const payload = {
			todoId: Number(todoId),
			senderId: senderId,
			todoMessageId: Number(messageId),
			codeEmoji: emoji
		};

		try {
			const res = await reactionTodoMessage(payload);

			if (res) {

				let foundComment : any = null;
				const parentIdx = comments.value.findIndex(c => c.id === messageId);
				if (parentIdx !== -1) {
					foundComment = comments.value[parentIdx];
				} else {
					for (const parent of comments.value) {
						if (parent.children) {
							const child = parent.children.find(c => c.id === messageId);
							if (child) {
								foundComment = child;
								break;
							}
						}
					}
				}

				if (foundComment) {
					if (!foundComment.reactions) foundComment.reactions = [];


					const existingReactionIndex = foundComment.reactions.findIndex(
						(r : any) => r.senderId === senderId
					);

					if (existingReactionIndex !== -1) {

						const currentEmoji = foundComment.reactions[existingReactionIndex].codeEmoji;

						if (currentEmoji === emoji) {

							console.log('User thả trùng emoji cũ');
						} else {

							foundComment.reactions[existingReactionIndex].codeEmoji = emoji;
						}
					} else {

						foundComment.reactions.push({
							codeEmoji: emoji,
							senderId: senderId,

						});
					}

					foundComment.reactions = [...foundComment.reactions];
				}
			}
		} catch (error) {
			console.error("Lỗi thả cảm xúc:", error);
			showError(t('common.error_connection'));
		}
	};
	const editingCommentData = ref<{
		id : number;
		todoId : number;
		senderId : string;
	} | null>(null);
	const historyFilterIndex = ref(0);

	const historyFilterOptions = computed(() => [
		t('todo.history_all'),
		t('todo.history_todo'),
		t('todo.history_ticket'),
		t('todo.history_call'),
		t('todo.history_customer'),
		t('todo.history_note')
	]);
	const historyFilterValues = [
		'ALL',
		'TODO',
		'TICKET',
		'HISTORY_CALL',
		'CUSTOMER',
		'NOTE'
	];
	const form = ref<TodoDetailForm>({
		id: '', title: '', code: t('common.loading'), desc: '',
		statusIndex: 0, sourceIndex: 0, assigneeIndex: 0, assigneeId: '',
		dueDate: '',
		notifyAt: '',
		customerCode: '', customerName: '', customerNameLabel: '',
		customerPhone: '', customerPhoneLabel: '',
		customerManagerName: '', customerManagerLabel: '',
		raw: undefined
	});


	const sourceOptions = computed(() => [
		t('source.call'),
		t('source.customer'),
		t('source.conversation'),
		t('source.message')
	]);

	const memberList = ref<any[]>([]);
	const assigneeOptions = ref<string[]>([]);
	const dynamicStatusOptions = computed(() => {
		const options = [
			{ label: t('todo.status_todo'), value: 'TO_DO' },
			{ label: t('todo.status_progress'), value: 'IN_PROGRESS' },
			{ label: t('todo.status_done'), value: 'DONE' }
		];
		if (form.value.raw && form.value.raw.status === 'IN_PROGRESS') {
			return options.filter(opt => opt.value !== 'TO_DO');
		}
		return options;
	});
	const statusLabels = computed(() => dynamicStatusOptions.value.map(opt => opt.label));
	const onRequestEditComment = async (commentId : number) => {
		const todoId = form.value.id;
		if (!todoId) return;
		isReplying.value = false;
		replyingCommentData.value = null;
		replyingMemberName.value = '';
		replyingMessagePreview.value = '';
		try {
			const res = await getTodoMessageDetail(commentId, todoId);
			console.log("API Response Detail:", res);
			if (res) {
				const dataDetail = res.data || res;
				editingCommentData.value = {
					id: dataDetail.id,
					todoId: dataDetail.todoId,
					senderId: dataDetail.senderId
				};
				const senderId = dataDetail.senderId;
				const foundMember = memberList.value.find(m => m.UID === senderId);
				if (foundMember) {
					editingMemberName.value = foundMember.UserName;
				} else {

					editingMemberName.value = t('common.me');
				}
				const content = dataDetail.message || '';
				console.log("Nội dung edit:", content);
				isEditingComment.value = true;
				await nextTick();
				newCommentText.value = content;
			}
		} catch (error) {
			console.error("Lỗi lấy chi tiết bình luận:", error);
			showError(t('common.error_load'));
		} finally {

			isLoading.value = false;
		}
	};

	const submitUpdateComment = async () => {
		if (!editingCommentData.value) return;


		if (isHtmlContentEmpty(newCommentText.value)) {
			showInfo(t('todo.msg_empty_content'));
			return;
		}

		isSubmittingComment.value = true;

		try {
			const { cleanMessage, fileUrl } = await processCommentInput(newCommentText.value);

			const payload = {
				id: editingCommentData.value.id,
				todoId: editingCommentData.value.todoId,
				senderId: editingCommentData.value.senderId,
				message: cleanMessage,
				files: fileUrl
			};
			const updatedData = await updateTodoMessage(payload);

			if (updatedData) {
				showSuccess(t('todo.msg_update_success'));

				const parentIndex = comments.value.findIndex(c => c.id === updatedData.id);
				if (parentIndex !== -1) {

					comments.value[parentIndex].message = updatedData.message;
					comments.value[parentIndex].files = updatedData.files;
					comments.value[parentIndex].isEdited = true;
				} else {

					for (const parent of comments.value) {
						if (parent.children) {
							const childIndex = parent.children.findIndex(c => c.id === updatedData.id);
							if (childIndex !== -1) {
								parent.children[childIndex].message = updatedData.message;
								parent.children[childIndex].files = updatedData.files;
								parent.children[childIndex].isEdited = true;
								break;
							}
						}
					}
				}
				resetEditState();
			}

		} catch (error) {
			console.error("Lỗi cập nhật:", error);
			showError(t('common.error_update'));
		} finally {
			isSubmittingComment.value = false;
		}
	};


	const onCancelEditComment = () => {
		isConfirmCancelEditOpen.value = true;
	};


	const continueEditing = () => {
		isConfirmCancelEditOpen.value = false;
	};


	const confirmCancelEdit = async () => {
		isConfirmCancelEditOpen.value = false;
		resetEditState();
	};

	const resetEditState = () => {
		isEditingComment.value = false;
		editingCommentData.value = null;
		newCommentText.value = '';
		editingMemberName.value = '';
	};
	const onRequestDeleteComment = (commentId : number) => {
		commentToDeleteId.value = commentId;
		isConfirmDeleteCommentOpen.value = true;
	};
	const confirmDeleteComment = async () => {
		if (!commentToDeleteId.value) return;

		const idToDelete = commentToDeleteId.value;
		isConfirmDeleteCommentOpen.value = false;

		try {
			await deleteTodoMessage(idToDelete);
			showSuccess(t('todo.msg_deleted'));
			const parentIndex = comments.value.findIndex(c => c.id === idToDelete);
			if (parentIndex !== -1) {
				comments.value.splice(parentIndex, 1);
			} else {

				for (const parent of comments.value) {
					if (parent.children && parent.children.length > 0) {
						const childIndex = parent.children.findIndex(c => c.id === idToDelete);
						if (childIndex !== -1) {
							parent.children.splice(childIndex, 1);
							break;
						}
					}
				}
			}


		} catch (error) {
			console.error("Lỗi xóa bình luận:", error);
			showError(t('common.fail_delete'));
		} finally {
			commentToDeleteId.value = null;
		}
	};

	const cancelDeleteComment = () => {
		isConfirmDeleteCommentOpen.value = false;
		commentToDeleteId.value = null;
	};
	const submitComment = async () => {
		if (isHtmlContentEmpty(newCommentText.value)) {
			showInfo(t('todo.msg_empty_content'));
			return;
		}
		isSubmittingComment.value = true;
		try {
			const { cleanMessage, fileUrl } = await processCommentInput(newCommentText.value);


			const todoId = form.value.id;
			const senderId = getCurrentMemberUID();

			const payload = {
				todoId: todoId,
				senderId: senderId,
				message: cleanMessage,
				files: fileUrl,
				parentId: -1
			};
			const newCommentId = await createTodoMessage(payload);

			if (newCommentId) {
				showSuccess(t('todo.msg_comment_success'));
				newCommentText.value = '';

				const newCommentData = await getTodoMessageDetail(newCommentId, todoId);
				if (newCommentData) {
					const processedItem = processCommentData(newCommentData);

					comments.value.unshift(processedItem);
				}

			}


		} catch (error) {
			console.error("Lỗi gửi bình luận:", error);
			showError(t('common.error_send'));
		} finally {
			isSubmittingComment.value = false;
		}
	};
	onLoad(async (options : any) => {
		await fetchMembers();
		if (options && options.id) {
			fetchDetail(options.id);
		}
	});

	const fetchMembers = async () => {
		try {
			const data = await getAllMembers();
			memberList.value = data;
			assigneeOptions.value = data.map(m => m.UserName || t('common.unknown_member'));
			if (form.value.assigneeId) {
				const index = memberList.value.findIndex(m => m.memberUID === form.value.assigneeId);
				if (index !== -1) form.value.assigneeIndex = index;
			}
		} catch (e) {
			console.error('Lỗi lấy members', e);
		}
	};
	const reloadDetail = async () => {
		if (!form.value.id) {
			uni.stopPullDownRefresh();
			return;
		}

		try {
			await Promise.all([
				fetchDetail(form.value.id),
			]);
		} catch (e) {
			console.error(e);
		} finally {
			uni.stopPullDownRefresh();
		}
	};

	onPullDownRefresh(() => {
		console.log('Refreshing detail...');
		reloadDetail();
	});
	const fetchDetail = async (id : string | number) => {
		if (!form.value.title) {
			isLoading.value = true;
		} else {
			uni.showNavigationBarLoading();
		}

		try {
			const rawResponse = await getTodoDetail(id);
			const realData = (rawResponse && rawResponse.data && !rawResponse.id)
				? rawResponse.data
				: rawResponse;

			const mappedData = mapTodoDetailToForm(realData);

			if (mappedData) {
				form.value = mappedData;

				const currentStatus = mappedData.raw.status;
				const realIndex = dynamicStatusOptions.value.findIndex(opt => opt.value === currentStatus);
				if (realIndex !== -1) {
					form.value.statusIndex = realIndex;
				}

				if (form.value.assigneeId && memberList.value.length > 0) {
					const index = memberList.value.findIndex(m => m.memberUID === form.value.assigneeId);
					if (index !== -1) form.value.assigneeIndex = index;
				}

				fetchComments(id);

				if (form.value.customerCode) {
					fetchCustomerInfo(form.value.customerCode);
					fetchHistoryLog(form.value.customerCode);
				}
			}
		} catch (error) {
			console.error('Lỗi lấy chi tiết:', error);
			showError(t('common.error_connection'));
		} finally {
			isLoading.value = false;
			uni.hideNavigationBarLoading();
		}
	};
	const processCommentData = (item : any) : CommentItem => {
		let senderName = t('todo.user_hidden');
		let avatarChar = '?';
		let avatarColor = '#e3f2fd';
		let isMe = false;
		const mySystemUid = String(authStore.uid);

		if (item.senderId) {
			const searchId = String(item.senderId);
			const member = memberList.value.find(m =>
				String(m.UID) === searchId ||
				String(m.memberUID) === searchId
			);

			if (member) {
				senderName = member.UserName;
				if (member.AvatarColor) {
					avatarColor = member.AvatarColor;
				}
				if (String(member.UID) === mySystemUid) {
					isMe = true;
				}
			} else {
				if (searchId === mySystemUid) {
					isMe = true;
				}
			}
		}

		avatarChar = senderName.charAt(0).toUpperCase();

		let actionText = '';
		switch (item.type) {
			case 'NEW_TODO':
				actionText = t('todo.action_NEW_TODO');
				break;
			case 'REOPEN_TODO':
				actionText = t('todo.action_REOPEN_TODO');
				break;
			case 'NEW_SUB_TODO':
				actionText = t('todo.action_NEW_SUB_TODO');
				break;
			case 'UPDATE_TODO':
				actionText = t('todo.action_UPDATE_TODO');
				break;
			case 'UPLOAD_ATTACHMENT':
				actionText = t('todo.action_UPLOAD_ATTACHMENT');
				break;
			case 'COMMENT':
				actionText = t('todo.action_COMMENT');
				break;
			default:
				actionText = '';
		}

		const reactionList = item.reactions?.details || [];

		return {
			id: item.id,
			senderId: item.senderId,
			senderName,
			senderAvatarChar: avatarChar,
			senderAvatarColor: avatarColor,
			message: item.message || '',
			files: item.files || '',
			timeDisplay: formatRelativeTime(item.createdAt, t),
			actionText,
			isEdited: !!item.updatedAt,
			type: item.type,
			reactions: reactionList,
			children: [],
			isMe: isMe
		};
	};

	const fetchComments = async (todoId : string | number) => {
		isLoadingComments.value = true;
		try {
			const currentKeySearch = commentFilterValues[commentFilterIndex.value];
			const rawData = await getTodoMessages(todoId, currentKeySearch);

			if (Array.isArray(rawData)) {
				comments.value = rawData.map((parent : any) => {
					const parentComment = processCommentData(parent);
					if (parent.replies && parent.replies.length > 0) {
						parentComment.children = parent.replies.map((child : any) => {
							const childComment = processCommentData(child);
							childComment.rootParentId = parent.id;
							return childComment;
						});
					}
					return parentComment;
				});
			} else {
				comments.value = [];
			}
		} catch (error) {
			console.error("Lỗi lấy bình luận:", error);
		} finally {
			isLoadingComments.value = false;
		}
	};
	const onCommentFilterChange = (e : any) => {
		const newIndex = e.detail.value;

		if (commentFilterIndex.value === newIndex) return;

		commentFilterIndex.value = newIndex;


		if (form.value.id) {
			fetchComments(form.value.id);
		}
	};

	const fetchCustomerInfo = async (customerUid : string) => {
		isLoadingCustomer.value = true;
		try {

			const crmToken = authStore.todoToken;
			if (!crmToken) return;

			const res = await getCrmCustomerDetail(crmToken, customerUid);


			const fields = res.fields || res.data?.fields || [];

			const nameField = fields.find((f : any) => f.code === 'name');
			const phoneField = fields.find((f : any) => f.code === 'phone');
			const managerField = fields.find((f : any) => f.code === 'member_no');


			if (nameField) {
				form.value.customerName = nameField.value;
				form.value.customerNameLabel = nameField.name || t('todo.customer_name_label');

			}


			if (phoneField) {
				form.value.customerPhone = phoneField.value;
				form.value.customerPhoneLabel = phoneField.name;
			}


			if (managerField) {

				form.value.customerManagerLabel = managerField.name || t('todo.customer_manager_label');

				const managerUid = managerField.value;
				const manager = memberList.value.find(m => m.memberUID === managerUid);
				form.value.customerManagerName = manager ? manager.UserName : t('todo.unknown');
			}

		} catch (error) {
			console.error("Lỗi CRM:", error);
		} finally {
			isLoadingCustomer.value = false;
		}
	};
	const fetchHistoryLog = async (customerUid : string) => {
		isLoadingHistory.value = true;
		try {
			const currentType = historyFilterValues[historyFilterIndex.value];

			const crmToken = authStore.todoToken;
			if (!crmToken) {
				console.error("Chưa có Token CRM/Todo");
				return;
			}

			const rawHistory = await getCrmActionTimeline(crmToken, customerUid, currentType);

			if (Array.isArray(rawHistory)) {
				historyList.value = rawHistory.map((item : any) => {

					const date = new Date(item.createAt);
					const day = date.getDate().toString().padStart(2, '0');
					const month = (date.getMonth() + 1).toString().padStart(2, '0');
					const year = date.getFullYear();


					const timeStr = `${day}/${month}/${year}`;

					let actorName = t('common.system');
					if (item.memberUid) {
						const foundMember = memberList.value.find(m => m.memberUID === item.memberUid);
						if (foundMember) {
							actorName = foundMember.UserName;
						}
					}

					let content = '';
					if (item.typeSub) {
						const key = `timeline.${item.typeSub}`;
						content = t(key);
						if (content === key) {
							content = TIMELINE_TYPE_MAP[item.typeSub] || item.typeSub;
						}
					} else {
						content = t('todo.interaction_other');
					}

					return {
						id: item.id,
						timeStr,
						content,
						actorName,
						originalType: item.typeSub
					};
				});
			}

		} catch (error) {
			console.error("Lỗi lấy lịch sử:", error);
		} finally {
			isLoadingHistory.value = false;
		}
	};
	const onHistoryFilterChange = (e : any) => {

		historyFilterIndex.value = e.detail.value;


		if (form.value.customerCode) {
			fetchHistoryLog(form.value.customerCode);
		}
	};

	const onStatusChange = async (e : any) => {

		const newIndex = parseInt(e.detail.value);
		const selectedOption = dynamicStatusOptions.value[newIndex];
		if (!selectedOption) return;

		form.value.statusIndex = newIndex;

		const apiStatusValues = ['TO_DO', 'IN_PROGRESS', 'DONE'];
		const newStatus = selectedOption.value;


		if (!form.value.raw) return;

		isLoading.value = true;

		try {

			const payload = {
				...form.value.raw,

				status: newStatus,


				preFixCode: "TODO",
				description: form.value.desc,
				files: "",
				tagCodes: "",

				title: form.value.title || form.value.raw.title
			};

			console.log("Payload Update Status:", payload);


			const res = await updateTodo(payload);

			if (res) {
				showSuccess(t('todo.msg_status_changed'));

				form.value.raw.status = newStatus;
				const newDisplayIndex = dynamicStatusOptions.value.findIndex(opt => opt.value === newStatus);
				form.value.statusIndex = newDisplayIndex !== -1 ? newDisplayIndex : 0;

				if (form.value.customerCode) await fetchHistoryLog(form.value.customerCode);
				await fetchComments(form.value.id);
			}
		} catch (error) {
			console.error("Lỗi cập nhật trạng thái:", error);

			showError(t('todo.msg_update_error'));
		} finally {
			isLoading.value = false;

		}
	};
	const onSourceChange = (e : any) => { form.value.sourceIndex = e.detail.value; };
	const onAssigneeChange = async (e : any) => {

		const idx = parseInt(e.detail.value);


		if (!memberList.value[idx]) return;


		const selectedMember = memberList.value[idx];
		const newAssigneeId = selectedMember.memberUID;

		form.value.assigneeIndex = idx;
		form.value.assigneeId = newAssigneeId;

		if (!form.value.raw) {
			showError(t('common.error_missing_data'));
			return;
		}
		isLoading.value = true;
		try {

			const payload = {
				...form.value.raw,

				assigneeId: newAssigneeId,

				preFixCode: "TODO",
				description: form.value.desc,
				files: "",
				tagCodes: "",


				title: form.value.title || form.value.raw.title
			};

			console.log("Payload Update Assignee:", payload);


			const res = await updateTodo(payload);

			if (res) {
				showSuccess(t('todo.msg_assignee_changed'));


				form.value.raw.assigneeId = newAssigneeId;

				if (form.value.customerCode) {
					await fetchHistoryLog(form.value.customerCode);
				}

				await fetchComments(form.value.id);
			}
		} catch (error) {
			console.error("Lỗi cập nhật người giao:", error);
			showError(t('todo.msg_update_error'));
		} finally {

			isLoading.value = false;
		}
	};
	const goBack = () => { uni.navigateBack(); };
	const saveTodo = () => {
		console.log("Lưu:", form.value);
		showSuccess(t('todo.msg_saved'));
	};

	return {
		isLoading, isLoadingCustomer,
		isLoadingHistory, historyList,
		form,
		statusOptions: statusLabels, sourceOptions, assigneeOptions,
		onStatusChange, onSourceChange, onAssigneeChange,
		goBack, saveTodo,
		historyFilterOptions,
		historyFilterIndex,
		onHistoryFilterChange,
		comments, isLoadingComments,
		newCommentText, isSubmittingComment, submitComment,
		isConfirmDeleteCommentOpen,
		onRequestDeleteComment,
		confirmDeleteComment,
		cancelDeleteComment,
		currentUserId,

		isEditingComment,
		onRequestEditComment,
		submitUpdateComment,
		onCancelEditComment,
		isConfirmCancelEditOpen,
		continueEditing,
		confirmCancelEdit,
		editingMemberName,

		isEmojiPickerOpen,
		emojiList,
		onToggleEmojiPicker,
		closeEmojiPicker,
		selectEmoji,


		isReplying,
		isConfirmCancelReplyOpen,
		replyingCommentData,
		replyingMemberName,
		onRequestReply,
		onCancelReply,
		confirmCancelReply,
		continueReplying,
		submitReply,

		commentFilterIndex,
		commentFilterOptions,
		onCommentFilterChange,

		isSavingDescription,
		onSaveDescription,

		onDateUpdate,
		isStatusDisabled,

		dynamicStatusOptions,
		onSaveTitle,
		replyingMessagePreview,
		isHistoryOpen,
		toggleHistory, isDone,
	};
};