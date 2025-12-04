//controllers/todo_detail.ts
import { ref, nextTick, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { updateTodo, getTodoDetail, getTodoMessages, createTodoMessage, deleteTodoMessage, getTodoMessageDetail, updateTodoMessage, reactionTodoMessage,uploadTodoFile } from '@/api/todo';
import { getAllMembers } from '@/api/project';
import { getCrmCustomerDetail, getCrmActionTimeline } from '@/api/crm'; 
import { mapTodoDetailToForm, type TodoDetailForm } from '@/models/todo_detail';
import { PROJECT_CODE, UID } from '@/utils/config';
import { TIMELINE_TYPE_MAP } from '@/utils/constants';
import { useAuthStore } from '@/stores/auth';
import { formatRelativeTime } from '@/utils/dateUtils';
import { TODO_STATUS } from '@/utils/constants';
import { showSuccess, showError, showInfo, showLoading, hideLoading } from '@/utils/toast';
interface CommentItem {
	id : number;
	senderId : string | number;
	
	senderName : string;
	senderAvatarChar : string;
	senderAvatarColor : string;
	message : string;
	files: string;
	timeDisplay : string;
	actionText : string;
	isEdited : boolean;
	type : string;
	reactions : any[];
	children : CommentItem[];
	rootParentId ?: number;
}

interface HistoryItem {
	id : number;
	timeStr : string;
	content : string;
	actorName : string;
	originalType : string;
}
export const useTodoDetailController = () => {
	const authStore = useAuthStore();

	const currentUserId = authStore.uid;
	const isLoading = ref(false);
	const isLoadingCustomer = ref(false);
	const isLoadingHistory = ref(false);
	const historyList = ref<HistoryItem[]>([]);

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
	const commentFilterOptions = ['Tất cả hoạt động', 'Bình luận'];
	const commentFilterValues = ['', 'COMMENT'];

	const isSavingDescription = ref(false);


	const convertToTimestamp = (dateStr : string, timeStr : string = '00:00') : number => {
		if (!dateStr) return 0;
		try {
			const dateTimeStr = `${dateStr}T${timeStr}:00`;
			return new Date(dateTimeStr).getTime();
		} catch {
			return 0;
		}
	};

	const isStatusDisabled = computed(() => {
		if (!form.value.raw) return true;
		return form.value.raw.status === 'DONE';
	});
	const onDateUpdate = async (event : { field : string, value : string }) => {
		if (!form.value.raw) return;

		showLoading('Đang cập nhật...');

		try {
			const payload = {
				...form.value.raw,
				preFixCode: "TODO",
				description: form.value.desc,
				files: "",
				tagCodes: "",
				title: form.value.title || form.value.raw.title
			};
			if (event.field === 'dueDate') {
				payload.dueDate = convertToTimestamp(event.value, '23:59');
			}
			else if (event.field === 'notifyDate' || event.field === 'notifyTime') {
				const datePart = event.field === 'notifyDate' ? event.value : form.value.notifyDate;
				const timePart = event.field === 'notifyTime' ? event.value : form.value.notifyTime;

				if (datePart && timePart) {
					payload.notificationReceivedAt = convertToTimestamp(datePart, timePart);
				}
			}

			console.log(`Payload Update ${event.field}:`, payload);

			const res = await updateTodo(payload);

			if (res) {
				showSuccess('Cập nhật thành công');

				if (event.field === 'dueDate') {
					form.value.raw.dueDate = payload.dueDate;
				} else {
					form.value.raw.notificationReceivedAt = payload.notificationReceivedAt;
				}

				if (form.value.customerCode) await fetchHistoryLog(form.value.customerCode);
				await fetchComments(form.value.id);
			}

		} catch (error) {
			console.error("Lỗi cập nhật ngày:", error);
			showError('Lỗi cập nhật');
		} finally {
			hideLoading();
		}
	};

	    const processCommentInput = async (htmlContent: string): Promise<{ cleanMessage: string, fileUrl: string }> => {
	        if (!htmlContent) return { cleanMessage: '', fileUrl: '' };
	
	        const imgRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;
	        let match;
	        let fileUrl = '';
	        let cleanMessage = htmlContent;
	
	        const uploadPromises: Promise<string>[] = [];
	        
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
	const processDescriptionImages = async (htmlContent: string): Promise<{ newContent: string, fileUrls: string[] }> => {
			if (!htmlContent) return { newContent: '', fileUrls: [] };
	
			const imgRegex = /<img[^>]+src="([^">]+)"/g;
			let match;
			const promises: Promise<any>[] = [];
			const replacements: { oldSrc: string, newSrc: string }[] = [];
	        const uploadedUrls: string[] = []; 
	
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
			if (!form.value.raw) {
				showError('Không tìm thấy dữ liệu gốc');
				return;
			}
	
			isSavingDescription.value = true;
	        showLoading('Đang lưu...');
	
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
					showSuccess('Đã cập nhật mô tả');
	                
	           
	                form.value.raw.description = form.value.desc;
	                if(filesString) {
	                    form.value.raw.files = filesString;
	                }
				}
			} catch (error) {
				console.error("Lỗi cập nhật công việc:", error);
				showError('Cập nhật thất bại');
			} finally {
	            hideLoading();
				isSavingDescription.value = false;
			}
		};

	const onRequestReply = async (item : any) => {

		isEditingComment.value = false;
		editingCommentData.value = null;
		newCommentText.value = '';

		replyingCommentData.value = item;
		isReplying.value = true;

		const senderId = item.senderId;
		const foundMember = memberList.value.find(m => m.UID === senderId);
		if (foundMember) {
			replyingMemberName.value = foundMember.UserName;
		} else {
			replyingMemberName.value = 'Người dùng ẩn';
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

	const submitReply = async () => {
	        if ((!newCommentText.value || !newCommentText.value.trim()) && !newCommentText.value.includes('<img')) {
	             showInfo('Vui lòng nhập nội dung');
	             return;
	        }
	        if (!replyingCommentData.value) return;
	
	        isSubmittingComment.value = true;
	
	        try {
	            const { cleanMessage, fileUrl } = await processCommentInput(newCommentText.value);
	
	            const todoId = form.value.id;
	            const senderId = authStore.uid;
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
	
	            console.log(">> Gửi trả lời (đã xử lý):", payload);
	
	            const res = await createTodoMessage(payload);
	
	            if (res) {
	                showSuccess('Đã trả lời');
	                resetReplyState();
	                await fetchComments(todoId);
	            }
	        } catch (error) {
	            console.error("Lỗi gửi trả lời:", error);
	            showError('Gửi thất bại');
	        } finally {
	            isSubmittingComment.value = false;
	        }
	    };

	const resetReplyState = () => {
		isReplying.value = false;
		replyingCommentData.value = null;
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

		console.log(">> Gửi Reaction:", payload);

		try {
			const res = await reactionTodoMessage(payload);

			if (res) {
				showSuccess('Đã thả cảm xúc');

				await fetchComments(todoId);
			}
		} catch (error) {
			console.error("Lỗi thả cảm xúc:", error);
			showError('Lỗi kết nối');
		}
	};
	const editingCommentData = ref<{
		id : number;
		todoId : number;
		senderId : string;
	} | null>(null);
	const historyFilterIndex = ref(0);

	const historyFilterOptions = [
		'Tất cả',
		'Công việc',
		'Ticket',
		'Lịch sử gọi',
		'Khách hàng',
		'Ghi chú'
	];
	const historyFilterValues = [
		'ALL',
		'TODO',
		'TICKET',
		'HISTORY_CALL',
		'CUSTOMER',
		'NOTE'
	];
	const form = ref<TodoDetailForm>({
		id: '', title: '', code: 'Loading...', desc: '',
		statusIndex: 0, sourceIndex: 0, assigneeIndex: 0, assigneeId: '',
		dueDate: '', notifyDate: '', notifyTime: '',
		customerCode: '', customerName: '', customerNameLabel: '',
		customerPhone: '', customerPhoneLabel: '',
		customerManagerName: '', customerManagerLabel: ''
	});

	const statusOptions = ['Chưa xử lý', 'Đang xử lý', 'Hoàn thành'];
	const sourceOptions = ['Cuộc gọi', 'Khách hàng', 'Hội thoại', 'Tin nhắn'];

	const memberList = ref<any[]>([]);
	const assigneeOptions = ref<string[]>([]);
	const dynamicStatusOptions = computed(() => {
		const options = [
			{ label: 'Chưa xử lý', value: 'TO_DO' },
			{ label: 'Đang xử lý', value: 'IN_PROGRESS' },
			{ label: 'Hoàn thành', value: 'DONE' }
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

		showLoading('Đang tải...');

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

					editingMemberName.value = 'tôi';
				}

				const content = dataDetail.message || '';

				console.log("Nội dung edit:", content);


				isEditingComment.value = true;


				await nextTick();

				newCommentText.value = content;
			}
		} catch (error) {
			console.error("Lỗi lấy chi tiết bình luận:", error);
			showError('Lỗi tải dữ liệu');
		} finally {
			uni.hideLoading();
		}
	};

	const submitUpdateComment = async () => {
	        if (!editingCommentData.value) return;
	        

	        if ((!newCommentText.value || !newCommentText.value.trim()) && !newCommentText.value.includes('<img')) {
	             showInfo('Nội dung không được để trống');
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
	
	            console.log("Payload Update (đã xử lý):", payload);
	
	            await updateTodoMessage(payload);
	
	            showSuccess('Đã cập nhật');
	            resetEditState();
	            await fetchComments(form.value.id);
	
	        } catch (error) {
	            console.error("Lỗi cập nhật:", error);
	            showError('Cập nhật thất bại');
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

		if (form.value.id) {
			await fetchComments(form.value.id);
		}
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


		isConfirmDeleteCommentOpen.value = false;

		try {
			await deleteTodoMessage(commentToDeleteId.value);
			showSuccess('Đã xóa');

			if (form.value.id) {
				await fetchComments(form.value.id);
			}
		} catch (error) {
			console.error("Lỗi xóa bình luận:", error);
			showError('Xóa thất bại');
		} finally {
			commentToDeleteId.value = null;
		}
	};

	const cancelDeleteComment = () => {
		isConfirmDeleteCommentOpen.value = false;
		commentToDeleteId.value = null;
	};
	const submitComment = async () => {
	        if ((!newCommentText.value || !newCommentText.value.trim()) && !newCommentText.value.includes('<img')) {
	            showInfo('Vui lòng nhập nội dung');
	            return;
	        }
	
	        isSubmittingComment.value = true;
	
	        try {
	            const { cleanMessage, fileUrl } = await processCommentInput(newCommentText.value);
	            
	            
	            const todoId = form.value.id;
	            const senderId = authStore.uid;
	
	            const payload = {
	                todoId: todoId,
	                senderId: senderId,
	                message: cleanMessage, 
	                files: fileUrl,       
	                parentId: -1
	            };
	
	            console.log("Đang gửi bình luận (đã xử lý):", payload);
	
	            const res = await createTodoMessage(payload);
	
	            if (res) {
	                showSuccess('Đã gửi bình luận');
	                newCommentText.value = '';
	                await fetchComments(todoId);
	            }
	
	        } catch (error) {
	            console.error("Lỗi gửi bình luận:", error);
	            showError('Gửi thất bại');
	        } finally {
	            isSubmittingComment.value = false;
	        }
	    };
	onLoad((options : any) => {
			
			fetchMembers(); 
	
			if (options && options.id) {
				fetchDetail(options.id); 
			}
		});

	const fetchMembers = async () => {
			try {
				const data = await getAllMembers();
				memberList.value = data;
				assigneeOptions.value = data.map(m => m.UserName || 'Thành viên ẩn danh');
	            if(form.value.assigneeId) {
	                const index = memberList.value.findIndex(m => m.memberUID === form.value.assigneeId);
					if (index !== -1) form.value.assigneeIndex = index;
	            }
			} catch (e) {
				console.error('Lỗi lấy members', e);
			}
		};

	const fetchDetail = async (id : string | number) => {
			isLoading.value = true; 
	        uni.showNavigationBarLoading(); 
	
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
				showError('Lỗi kết nối');
			} finally {
				isLoading.value = false;
	            uni.hideNavigationBarLoading();
			}
		};
	const processCommentData = (item : any) : CommentItem => {

		let senderName = 'Người dùng ẩn';
		let avatarChar = '?';
		let avatarColor = '#e3f2fd';
		if (item.senderId) {

			const member = memberList.value.find(m => m.UID === item.senderId || m.memberUID === item.senderId);
			if (member) {
				senderName = member.UserName;

				if (member.AvatarColor) {
					avatarColor = member.AvatarColor;
				}
			}
		}
		avatarChar = senderName.charAt(0).toUpperCase();


		let actionText = '';
		if (item.type === 'COMMENT') actionText = 'đã thêm một bình luận';
		else if (item.type === 'LOG') actionText = 'đã cập nhật hoạt động';
		else if (item.type === 'UPDATE_TODO') actionText = 'cập nhật thông tin công việc';

		const reactionList = item.reactions?.details || [];

		return {
			id: item.id,
			senderId: item.senderId,
			senderName,
			senderAvatarChar: avatarChar,
			senderAvatarColor: avatarColor,
			message: item.message || '',
			files: item.files || '',
			timeDisplay: formatRelativeTime(item.createdAt),
			actionText,
			isEdited: !!item.updatedAt,
			type: item.type,
			reactions: reactionList,
			children: []
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
				form.value.customerNameLabel = nameField.name;
			}


			if (phoneField) {
				form.value.customerPhone = phoneField.value;
				form.value.customerPhoneLabel = phoneField.name;
			}


			if (managerField) {

				form.value.customerManagerLabel = managerField.name;

				const managerUid = managerField.value;
				const manager = memberList.value.find(m => m.memberUID === managerUid);
				form.value.customerManagerName = manager ? manager.UserName : '(Chưa xác định)';
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

					let actorName = 'Hệ thống';
					if (item.memberUid) {
						const foundMember = memberList.value.find(m => m.memberUID === item.memberUid);
						if (foundMember) {
							actorName = foundMember.UserName;
						}
					}

					const content = TIMELINE_TYPE_MAP[item.typeSub] || item.typeSub || 'Tương tác khác';

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
		showLoading('Đang cập nhật...');


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
				showSuccess('Đã cập nhật trạng thái');

				form.value.raw.status = newStatus;
				const newDisplayIndex = dynamicStatusOptions.value.findIndex(opt => opt.value === newStatus);
				form.value.statusIndex = newDisplayIndex !== -1 ? newDisplayIndex : 0;

				if (form.value.customerCode) await fetchHistoryLog(form.value.customerCode);
				await fetchComments(form.value.id);
			}
		} catch (error) {
			console.error("Lỗi cập nhật trạng thái:", error);

			showError('Lỗi cập nhật');
		} finally {
			uni.hideLoading();
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
			showError('Thiếu dữ liệu gốc');
			return;
		}
		showLoading('Đang cập nhật người giao...');
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
				showSuccess('Đã đổi người thực hiện');


				form.value.raw.assigneeId = newAssigneeId;

				if (form.value.customerCode) {
					await fetchHistoryLog(form.value.customerCode);
				}

				await fetchComments(form.value.id);
			}
		} catch (error) {
			console.error("Lỗi cập nhật người giao:", error);
			showError('Lỗi cập nhật');
		} finally {
			hideLoading();
		}
	};
	const goBack = () => { uni.navigateBack(); };
	const saveTodo = () => {
		console.log("Lưu:", form.value);
		showSuccess('Đã lưu');
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

	};
};