// src/controllers/todo_detail.ts
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getTodoDetail } from '@/api/todo';
import { getAllMembers } from '@/api/project';
import { getCrmToken, getCrmCustomerDetail } from '@/api/crm'; // Import API CRM
import { mapTodoDetailToForm, type TodoDetailForm } from '@/models/todo_detail';
import { PROJECT_CODE, UID } from '@/utils/config';

export const useTodoDetailController = () => {
    const isLoading = ref(false);
    // State loading riêng cho phần khách hàng để UI mượt hơn
    const isLoadingCustomer = ref(false); 

    const form = ref<TodoDetailForm>({
        id: '', title: '', code: 'Loading...', desc: '',
        statusIndex: 0, sourceIndex: 0, assigneeIndex: 0, assigneeId: '',
        dueDate: '', notifyDate: '', notifyTime: '',
        customerCode: '', customerName: '', customerPhone: '', customerManagerName: ''
    });

    const statusOptions = ['Chưa xử lý', 'Đang xử lý', 'Hoàn thành'];
    const sourceOptions = ['Cuộc gọi', 'Khách hàng', 'Hội thoại', 'Tin nhắn'];
    
    const memberList = ref<any[]>([]); 
    const assigneeOptions = ref<string[]>([]);

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

                // Map người được giao (Assignee)
                if (form.value.assigneeId && memberList.value.length > 0) {
                    const index = memberList.value.findIndex(m => m.memberUID === form.value.assigneeId);
                    if (index !== -1) form.value.assigneeIndex = index;
                }

                // [QUAN TRỌNG] Nếu có mã khách hàng -> Gọi tiếp API CRM
                if (form.value.customerCode) {
                    await fetchCustomerInfo(form.value.customerCode);
                }
            }
        } catch (error) {
            console.error('❌ Lỗi lấy chi tiết:', error);
            uni.showToast({ title: 'Lỗi kết nối', icon: 'none' });
        } finally {
            isLoading.value = false;
        }
    };

    // [LOGIC MỚI] Hàm xử lý lấy thông tin khách hàng
    const fetchCustomerInfo = async (customerUid: string) => {
            isLoadingCustomer.value = true;
            try {
                // B1. Lấy Token
                const crmToken = await getCrmToken(PROJECT_CODE, UID);
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
        isLoading, isLoadingCustomer, // Trả về thêm biến này
        form,
        statusOptions, sourceOptions, assigneeOptions,
        onStatusChange, onSourceChange, onAssigneeChange,
        goBack, saveTodo
    };
};