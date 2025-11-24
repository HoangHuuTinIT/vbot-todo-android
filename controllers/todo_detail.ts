// src/controllers/todo_detail.ts
import { ref , nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTodoDetail , getTodoMessages , createTodoMessage ,deleteTodoMessage , getTodoMessageDetail, updateTodoMessage,} from '@/api/todo';
import { getAllMembers } from '@/api/project';
import {  getCrmCustomerDetail , getCrmActionTimeline} from '@/api/crm'; // Import API CRM
import { mapTodoDetailToForm, type TodoDetailForm } from '@/models/todo_detail';
import { PROJECT_CODE, UID } from '@/utils/config';
import { TIMELINE_TYPE_MAP } from '@/utils/constants';
import { useAuthStore } from '@/stores/auth';
import { formatRelativeTime } from '@/utils/dateUtils';
interface CommentItem {
    id: number;
	senderId: string | number;
    senderName: string;
    senderAvatarChar: string; // Chữ cái đầu
    message: string; // HTML content
    timeDisplay: string;
    actionText: string; // "thêm 1 bình luận"
    isEdited: boolean;
    reactions: any[]; // Mảng emoji
    children: CommentItem[]; // Bình luận con (Replies)
}

interface HistoryItem {
    id: number;
    timeStr: string;      // Giờ hiển thị (VD: 10:30 21/11)
    content: string;      // Nội dung tương tác (Tiếng Việt)
    actorName: string;    // Tên người thực hiện
    originalType: string; // Lưu loại gốc để icon nếu cần
}
export const useTodoDetailController = () => {
	const authStore = useAuthStore();
	
	const currentUserId = authStore.uid;
    const isLoading = ref(false);
    // State loading riêng cho phần khách hàng để UI mượt hơn
    const isLoadingCustomer = ref(false); 
    const isLoadingHistory = ref(false);
	const historyList = ref<HistoryItem[]>([]);
	
	const comments = ref<CommentItem[]>([]);
	const isLoadingComments = ref(false);
	
	const newCommentText = ref(''); 
	const isSubmittingComment = ref(false);
	
	
	const isConfirmDeleteCommentOpen = ref(false);
	const commentToDeleteId = ref<number | null>(null);
	
	const isEditingComment = ref(false); // Đang ở chế độ sửa hay không
	    const isConfirmCancelEditOpen = ref(false); // Modal xác nhận hủy sửa
	    // Lưu tạm thông tin bình luận đang sửa để lát gửi lại API update
	    const editingCommentData = ref<{
	        id: number;
	        todoId: number;
	        senderId: string;
	    } | null>(null);
       const historyFilterIndex = ref(0); // Vị trí đang chọn (0 là Tất cả)
           
           // 1. Danh sách hiển thị (UI)
           const historyFilterOptions = [
               'Tất cả', 
               'Công việc', 
               'Ticket', 
               'Lịch sử gọi', 
               'Khách hàng', 
               'Ghi chú'
           ];
    const historyFilterValues = [
            'ALL',          // Tất cả
            'TODO',         // Công việc
            'TICKET',       // Ticket
            'HISTORY_CALL', // Lịch sử gọi
            'CUSTOMER',     // Khách hàng
            'NOTE'          // Ghi chú
        ];
        const form = ref<TodoDetailForm>({
            // ... giữ nguyên
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
	
	const onRequestEditComment = async (commentId: number) => {
	        const todoId = form.value.id; 
	        if (!todoId) return;
	
	        uni.showLoading({ title: 'Đang tải...' });
	        
	        try {
	            // Gọi API lấy chi tiết
	            const res = await getTodoMessageDetail(commentId, todoId);
	            
	            console.log("API Response Detail:", res); // In ra để kiểm tra cấu trúc thực tế
	
	            if (res) {
	                // [QUAN TRỌNG] Xử lý lấy dữ liệu đúng cấp độ
	                // Kiểm tra xem dữ liệu nằm trực tiếp ở res hay nằm trong res.data
	                // Dựa theo JSON bạn gửi thì dữ liệu nằm trong 'data'
	                const dataDetail = res.data || res; 
	
	                editingCommentData.value = {
	                    id: dataDetail.id,
	                    todoId: dataDetail.todoId,
	                    senderId: dataDetail.senderId
	                };
	
	                // Lấy message từ dataDetail (chứ không phải từ res cấp ngoài cùng)
	                const content = dataDetail.message || '';
	                
	                console.log("Nội dung edit:", content);
	
	                // 1. Bật chế độ Edit để giao diện đổi sang input
	                isEditingComment.value = true;
	
	                // 2. Đợi Vue cập nhật DOM xong mới gán giá trị vào Editor
	                await nextTick();
	                
	                // 3. Gán giá trị
	                newCommentText.value = content;
	            }
	        } catch (error) {
	            console.error("Lỗi lấy chi tiết bình luận:", error);
	            uni.showToast({ title: 'Lỗi tải dữ liệu', icon: 'none' });
	        } finally {
	            uni.hideLoading();
	        }
	    };
		
	const submitUpdateComment = async () => {
	        if (!editingCommentData.value) return;
	        if (!newCommentText.value || !newCommentText.value.trim()) {
	            uni.showToast({ title: 'Nội dung không được để trống', icon: 'none' });
	            return;
	        }
	
	        isSubmittingComment.value = true;
	
	        try {
	            // Chuẩn bị payload theo yêu cầu
	            const payload = {
	                id: editingCommentData.value.id,
	                todoId: editingCommentData.value.todoId,
	                senderId: editingCommentData.value.senderId,
	                message: newCommentText.value,
	                files: "" // Tạm để trống
	            };
	
	            console.log("Payload Update:", payload);
	
	            // Gọi API Update
	            await updateTodoMessage(payload);
	
	            uni.showToast({ title: 'Đã cập nhật', icon: 'success' });
	
	            // Reset trạng thái về ban đầu
	            resetEditState();
	            
	            // Load lại danh sách
	            await fetchComments(form.value.id);
	
	        } catch (error) {
	            console.error("Lỗi cập nhật:", error);
	            uni.showToast({ title: 'Cập nhật thất bại', icon: 'none' });
	        } finally {
	            isSubmittingComment.value = false;
	        }
	    };
	
	    // 3. Nhấn "Hủy" -> Hiện Modal xác nhận
	    const onCancelEditComment = () => {
	        isConfirmCancelEditOpen.value = true;
	    };
	
	    // 4. Trong Modal hủy: Nhấn "Tiếp tục chỉnh sửa"
	    const continueEditing = () => {
	        isConfirmCancelEditOpen.value = false;
	    };
	
	    // 5. Trong Modal hủy: Nhấn "Có, hủy bỏ"
	    const confirmCancelEdit = async () => {
	        isConfirmCancelEditOpen.value = false;
	        
	        // Reset trạng thái
	        resetEditState();
	
	        // Gọi lại API list theo yêu cầu
	        if (form.value.id) {
	             await fetchComments(form.value.id);
	        }
	    };
	
	    // Hàm phụ: Reset state edit
	    const resetEditState = () => {
	        isEditingComment.value = false;
	        editingCommentData.value = null;
	        newCommentText.value = ''; // Xóa ô nhập
	    };
	const onRequestDeleteComment = (commentId: number) => {
	        commentToDeleteId.value = commentId;
	        isConfirmDeleteCommentOpen.value = true;
	    };
	const confirmDeleteComment = async () => {
	        if (!commentToDeleteId.value) return;
	        
	        // Đóng modal ngay cho mượt
	        isConfirmDeleteCommentOpen.value = false;
	        
	        try {
	            await deleteTodoMessage(commentToDeleteId.value);
	            uni.showToast({ title: 'Đã xóa', icon: 'success' });
	            
	            // Reload lại list comment
	            if (form.value.id) {
	                await fetchComments(form.value.id);
	            }
	        } catch (error) {
	            console.error("Lỗi xóa bình luận:", error);
	            uni.showToast({ title: 'Xóa thất bại', icon: 'none' });
	        } finally {
	            commentToDeleteId.value = null;
	        }
	    };
	
	    // [MỚI] Hàm hủy xóa
	    const cancelDeleteComment = () => {
	        isConfirmDeleteCommentOpen.value = false;
	        commentToDeleteId.value = null;
	    };
    const submitComment = async () => {
            // 1. Validate dữ liệu
            if (!newCommentText.value || !newCommentText.value.trim()) {
                uni.showToast({ title: 'Vui lòng nhập nội dung', icon: 'none' });
                return;
            }
    
            // 2. Bật loading
            isSubmittingComment.value = true;
    
            try {
                // 3. Chuẩn bị dữ liệu gửi đi
                // Lấy todoId từ form (đã được load từ trước)
                const todoId = form.value.id; 
                
                // Lấy senderId từ Auth Store (UID của user đang đăng nhập)
                const senderId = authStore.uid;
    
                const payload = {
                    todoId: todoId,
                    senderId: senderId,
                    message: newCommentText.value, // Nội dung từ editor
                    files: "", // Tạm thời rỗng
                    parentId: -1 // Mặc định là comment cha
                };
    
                console.log("Đang gửi bình luận:", payload);
    
                // 4. Gọi API tạo bình luận
                const res = await createTodoMessage(payload);
    
                // 5. Xử lý thành công
                if (res) {
                    uni.showToast({ title: 'Đã gửi bình luận', icon: 'success' });
                    
                    // Reset ô nhập liệu
                    newCommentText.value = ''; 
                    
                    // [QUAN TRỌNG] Gọi lại API lấy danh sách để cập nhật giao diện
                    // (Hàm fetchComments đã viết ở bước trước)
                    await fetchComments(todoId);
                }
    
            } catch (error) {
                console.error("Lỗi gửi bình luận:", error);
                uni.showToast({ title: 'Gửi thất bại', icon: 'none' });
            } finally {
                // Tắt loading
                isSubmittingComment.value = false;
            }
        };
    onLoad(async (options: any) => {
        // 1. Lấy danh sách thành viên trước (để lát nữa map ID -> Tên quản lý)
        await fetchMembers(); 

        // 2. Lấy chi tiết Todo
        if (options && options.id) {
            await fetchDetail(options.id);
        }
    });

    const fetchMembers = async () => {
        try {
            const data = await getAllMembers();
            memberList.value = data;
            assigneeOptions.value = data.map(m => m.UserName || 'Thành viên ẩn danh');
        } catch (e) {
            console.error('Lỗi lấy members', e);
        }
    };

    const fetchDetail = async (id: string | number) => {
        isLoading.value = true;
        try {
            const rawResponse = await getTodoDetail(id);
            const realData = (rawResponse && rawResponse.data && !rawResponse.id) 
                             ? rawResponse.data 
                             : rawResponse;

            const mappedData = mapTodoDetailToForm(realData);
            
            if (mappedData) {
                form.value = mappedData;
				fetchComments(id);
                // Map người được giao (Assignee)
                if (form.value.assigneeId && memberList.value.length > 0) {
                    const index = memberList.value.findIndex(m => m.memberUID === form.value.assigneeId);
                    if (index !== -1) form.value.assigneeIndex = index;
                }

                // [QUAN TRỌNG] Nếu có mã khách hàng -> Gọi tiếp API CRM
                if (form.value.customerCode) {
                    await fetchCustomerInfo(form.value.customerCode);
					fetchHistoryLog(form.value.customerCode);
                }
            }
        } catch (error) {
            console.error('❌ Lỗi lấy chi tiết:', error);
            uni.showToast({ title: 'Lỗi kết nối', icon: 'none' });
        } finally {
            isLoading.value = false;
        }
    };
const processCommentData = (item: any): CommentItem => {
        // 1. Map Sender Info
        let senderName = 'Người dùng ẩn';
        let avatarChar = '?';
        
        if (item.senderId) {
            // Tìm trong memberList (đã load từ trước)
            // Lưu ý: memberList API trả về UID, so sánh với senderId
            const member = memberList.value.find(m => m.UID === item.senderId || m.memberUID === item.senderId);
            if (member) {
                senderName = member.UserName;
            }
        }
        avatarChar = senderName.charAt(0).toUpperCase();

        // 2. Xử lý hành động
        let actionText = '';
        if (item.type === 'COMMENT') actionText = 'đã thêm một bình luận';
        else if (item.type === 'LOG') actionText = 'đã cập nhật hoạt động';
        
        // 3. Xử lý Reactions
        const reactionList = item.reactions?.details || [];

        return {
            id: item.id,
			senderId: item.senderId,
            senderName,
            senderAvatarChar: avatarChar,
            message: item.message || '',
            timeDisplay: formatRelativeTime(item.createdAt),
            actionText,
            isEdited: !!item.updatedAt, // Nếu có updatedAt thì là đã sửa
            reactions: reactionList,
            children: [] // Sẽ map đệ quy nếu cần
        };
    };
	
	const fetchComments = async (todoId: string | number) => {
	        isLoadingComments.value = true;
	        try {
	            const rawData = await getTodoMessages(todoId);
	            
	            if (Array.isArray(rawData)) {
	                // Map dữ liệu cha và con
	                comments.value = rawData.map((parent: any) => {
	                    const parentComment = processCommentData(parent);
	                    
	                    // Xử lý replies (nếu có)
	                    if (parent.replies && parent.replies.length > 0) {
	                        parentComment.children = parent.replies.map((child: any) => processCommentData(child));
	                    }
	                    
	                    return parentComment;
	                });
	            }
	        } catch (error) {
	            console.error("Lỗi lấy bình luận:", error);
	        } finally {
	            isLoadingComments.value = false;
	        }
	    };
    // [LOGIC MỚI] Hàm xử lý lấy thông tin khách hàng
    const fetchCustomerInfo = async (customerUid: string) => {
            isLoadingCustomer.value = true;
            try {
                // B1. Lấy Token
              const crmToken = authStore.todoToken;
			  if (!crmToken) return;
                // B2. Gọi API
               const res = await getCrmCustomerDetail(crmToken, customerUid);
                
                // B3. Lấy danh sách fields
                const fields = res.fields || res.data?.fields || [];
    
                // Tìm các field tương ứng theo mã code
                const nameField = fields.find((f: any) => f.code === 'name');
                const phoneField = fields.find((f: any) => f.code === 'phone');
                const managerField = fields.find((f: any) => f.code === 'member_no');
    
                // --- CẬP NHẬT VALUE & LABEL ---
    
                // 1. Tên khách hàng
                if (nameField) {
                    form.value.customerName = nameField.value;
                    form.value.customerNameLabel = nameField.name; // <--- Lấy tiêu đề từ API
                }
    
                // 2. Số điện thoại
                if (phoneField) {
                    form.value.customerPhone = phoneField.value;
                    form.value.customerPhoneLabel = phoneField.name; // <--- Lấy tiêu đề từ API
                }
    
                // 3. Người quản lý
                if (managerField) {
                    // Lấy tiêu đề
                    form.value.customerManagerLabel = managerField.name; // <--- Lấy tiêu đề từ API
    
                    // Xử lý Value (Map ID -> Tên Member)
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
const fetchHistoryLog = async (customerUid: string) => {
        isLoadingHistory.value = true;
        try {
			const currentType = historyFilterValues[historyFilterIndex.value];
            // B1. Lấy token
            const crmToken = authStore.todoToken;
            if (!crmToken) {
                            console.error("Chưa có Token CRM/Todo");
                            return;
                        }
            // B2. Gọi API
         const rawHistory = await getCrmActionTimeline(crmToken, customerUid, currentType);
            
            // B3. Xử lý dữ liệu (Map)
            if (Array.isArray(rawHistory)) {
                historyList.value = rawHistory.map((item: any) => {
                    // 1. Xử lý thời gian (createAt)
                    const date = new Date(item.createAt);
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear();
                                        
                                        // Format mới: dd/mm/yyyy (VD: 21/11/2025)
                                        const timeStr = `${day}/${month}/${year}`;

                    // 2. Xử lý Tên người tương tác (memberUid)
                    let actorName = 'Hệ thống';
                    if (item.memberUid) {
                        // So sánh memberUid từ API Timeline với memberUID trong danh sách Member
                        const foundMember = memberList.value.find(m => m.memberUID === item.memberUid);
                        if (foundMember) {
                            actorName = foundMember.UserName;
                        }
                    }

                    // 3. Xử lý Nội dung tương tác (typeSub)
                    // Nếu typeSub có trong map thì lấy tiếng Việt, không thì lấy chính nó
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
	const onHistoryFilterChange = (e: any) => {
	        // 1. Cập nhật index mới
	        historyFilterIndex.value = e.detail.value;
	        
	        // 2. Gọi lại API ngay lập tức (nếu đã có mã khách hàng)
	        if (form.value.customerCode) {
	            fetchHistoryLog(form.value.customerCode);
	        }
	    };
    // ... (Giữ nguyên các event handler cũ: onStatusChange, saveTodo...)
    const onStatusChange = (e: any) => { form.value.statusIndex = e.detail.value; };
    const onSourceChange = (e: any) => { form.value.sourceIndex = e.detail.value; };
    const onAssigneeChange = (e: any) => { 
        const idx = e.detail.value;
        form.value.assigneeIndex = idx;
        if (memberList.value[idx]) {
            form.value.assigneeId = memberList.value[idx].memberUID;
        }
    };
    const goBack = () => { uni.navigateBack(); };
    const saveTodo = () => { 
        console.log("Lưu:", form.value); 
        uni.showToast({ title: 'Đã lưu', icon: 'success' }); 
    };

    return {
        isLoading, isLoadingCustomer,
		 isLoadingHistory, historyList,// Trả về thêm biến này
        form,
        statusOptions, sourceOptions, assigneeOptions,
        onStatusChange, onSourceChange, onAssigneeChange,
        goBack, saveTodo,
		
		historyFilterOptions, 
		historyFilterIndex, 
		onHistoryFilterChange,
		
		comments, isLoadingComments,
		newCommentText, isSubmittingComment,submitComment, 
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
    };
};