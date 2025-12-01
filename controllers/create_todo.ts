//controllers/create_todo.ts
import { ref, onMounted, computed } from 'vue';
import { createTodo, uploadTodoFile } from '@/api/todo';
import { getAllMembers } from '@/api/project';
import { PROJECT_CODE, UID } from '@/utils/config';
import { buildCreateTodoPayload } from '@/models/create_todo';
import type { TodoForm } from '@/types/todo';
import { getCrmFieldSearch, getCrmCustomers } from '@/api/crm';
import { useAuthStore } from '@/stores/auth';
import { TODO_SOURCE } from '@/utils/enums';
import { showSuccess, showError, showInfo,showLoading, hideLoading } from '@/utils/toast';
export const useCreateTodoController = () => {
	const authStore = useAuthStore();
	const pad = (n : number) => n.toString().padStart(2, '0');
	const getTodayISO = () => {
		const d = new Date();
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
	};
	const getCurrentTime = () => {
		const d = new Date();
		return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
	};

	const loading = ref<boolean>(false);

	const form = ref<TodoForm>({
		name: '',
		desc: '',
		customer: '',
		customerUid: '',
		assignee: '',
		dueDate: getTodayISO(),
		notifyDate: getTodayISO(),
		notifyTime: getCurrentTime()
	});
	const sourceOptions = ['Cuộc gọi', 'Khách hàng', 'Hội thoại'];
	const sourceValues = [TODO_SOURCE.CALL, TODO_SOURCE.CUSTOMER, TODO_SOURCE.CONVERSATION];
	const sourceIndex = ref(-1);
	const memberList = ref<any[]>([]);
	const memberOptions = ref<string[]>([]);
	const selectedMemberIndex = ref<number>(-1);


	const showCustomerModal = ref(false);
	const loadingCustomer = ref(false);
	const customerList = ref<any[]>([]);
	const customerToken = ref('');
	const onSourceChange = (e : any) => {
		sourceIndex.value = parseInt(e.detail.value);
	};
	const fetchMembers = async () => {
		try {
			const data = await getAllMembers();
			memberList.value = data;
			memberOptions.value = data.map(m => m.UserName || 'Thành viên ẩn danh');
		} catch (error) {
			console.error('Lỗi lấy thành viên:', error);
			showError('Không thể tải danh sách thành viên');
		}
	};

	const fetchCustomers = async () => {
		if (customerList.value.length > 0) return;

		loadingCustomer.value = true;
		try {
			const token = authStore.crmToken;
			if (!token) {
				console.error("Chưa có CRM Token!");
				return;
			}
			customerToken.value = token;
			const fields = await getCrmFieldSearch(token);

			const nameField = fields.find((f : any) => f.code === 'name');
			const phoneField = fields.find((f : any) => f.code === 'phone');
			const memberNoField = fields.find((f : any) => f.code === 'member_no');

			const nameId = nameField ? nameField.id : 134;
			const phoneId = phoneField ? phoneField.id : 135;
			const memberNoId = memberNoField ? memberNoField.id : 136;

			const requestBody = {
				page: 1,
				size: 20,
				fieldSearch: [
					{ id: -1, value: "", type: "", isSearch: false },
					{ id: nameId, value: "", type: "", isSearch: false },
					{ id: phoneId, value: "", type: "", isSearch: false },
					{ id: memberNoId, value: "", type: "", isSearch: false }
				]
			};

			const rawData = await getCrmCustomers(token, requestBody);
			customerList.value = rawData.map((item : any) => {
				const nameObj = item.customerFieldItems.find((f : any) => f.code === 'name');
				const phoneObj = item.customerFieldItems.find((f : any) => f.code === 'phone');

				return {
					id: item.id,
					uid: item.uid,
					createAt: item.createAt,
					name: nameObj ? nameObj.value : '(Không tên)',
					phone: phoneObj ? phoneObj.value : '',
				};
			});

		} catch (error) {
			console.error('Lỗi tải khách hàng:', error);
			showError('Lỗi tải dữ liệu CRM');
		} finally {
			loadingCustomer.value = false;
		}
	};

	const openCustomerPopup = () => {
		showCustomerModal.value = true;
		fetchCustomers();
	};

	const onCustomerSelect = (customer : any) => {

		form.value.customer = `${customer.name} - ${customer.phone}`;

		form.value.customerUid = customer.uid;
	};
	const onMemberChange = (e : any) => {
		const index = e.detail.value;
		selectedMemberIndex.value = index;
		const selectedMember = memberList.value[index];
		if (selectedMember) {
			form.value.assignee = selectedMember.memberUID;
		}
	};

	const currentAssigneeName = computed(() => {
		if (selectedMemberIndex.value > -1 && memberOptions.value.length > 0) {
			return memberOptions.value[selectedMemberIndex.value];
		}
		return '';
	});

	const goBack = () => uni.navigateBack();
const processDescriptionImages = async (htmlContent: string): Promise<{ newContent: string, fileUrls: string[] }> => {
        if (!htmlContent) return { newContent: '', fileUrls: [] };
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        let match;
        const promises: Promise<any>[] = [];
        const replacements: { oldSrc: string, newSrc: string }[] = [];
        const uploadedUrls: string[] = [];

        while ((match = imgRegex.exec(htmlContent)) !== null) {
            const src = match[1];
            if (!src.startsWith('http') || src.startsWith('file://') || src.startsWith('blob:')) {
                 const uploadPromise = uploadTodoFile(src)
                    .then(serverUrl => {
                        replacements.push({ oldSrc: src, newSrc: serverUrl });
                        uploadedUrls.push(serverUrl);
                    })
                    .catch(err => {
                        console.error(`Upload ảnh ${src} lỗi:`, err);
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
	const submitForm = async () => {
	        if (!form.value.name || !form.value.name.trim()) {
	            showInfo('Vui lòng nhập tên công việc');
	            return;
	        }
	
	        let selectedLink = 'CALL';
	        if (sourceIndex.value >= 0) {
	            selectedLink = sourceValues[sourceIndex.value];
	        }
	
	        loading.value = true;
	        showLoading('Đang xử lý dữ liệu...'); 
	
	        try {
	            const { newContent, fileUrls } = await processDescriptionImages(form.value.desc);
	            
	            form.value.desc = newContent; 
	
	            const payload = buildCreateTodoPayload(form.value, {
	                projectCode: PROJECT_CODE,
	                uid: UID,
	                link: selectedLink,
	                uploadedFiles: fileUrls.length > 0 ? fileUrls[0] : '' 
	            });
	
	            console.log("Payload Submit:", payload);
	
	            await createTodo(payload);
	
	            hideLoading();
	            showSuccess('Tạo thành công!');
	            setTimeout(() => { uni.navigateBack(); }, 1500);
	
	        } catch (error : any) {
	            hideLoading();
	            console.error("Create Error:", error);
	            const errorMsg = error?.message || (typeof error === 'string' ? error : 'Thất bại');
	            showError('Lỗi: ' + errorMsg);
	        } finally {
	            loading.value = false;
	        }
	    };

	onMounted(() => {
		fetchMembers();
	});

	return {
		loading, form,
		memberOptions, onMemberChange, currentAssigneeName,
		showCustomerModal, loadingCustomer, customerList,
		openCustomerPopup, onCustomerSelect,
		goBack, submitForm,
		sourceOptions,
		sourceIndex,
		onSourceChange,
	};
};