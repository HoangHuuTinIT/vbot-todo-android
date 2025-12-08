//controllers/list_todo.ts
import { ref, computed, onMounted } from 'vue';
import { onShow ,onPullDownRefresh} from '@dcloudio/uni-app';
import { getTodos, getTodoCount, deleteTodo } from '@/api/todo';
import { useAuthStore } from '@/stores/auth';
import { TODO_STATUS, STATUS_LABELS } from '@/utils/constants';
import { buildTodoParams } from '@/models/todo';
import { TODO_SOURCE } from '@/utils/enums';
import type { TodoItem } from '@/types/todo';
import { getAllMembers } from '@/api/project';
import { showSuccess, showError } from '@/utils/toast';
import { usePagination } from '@/composables/usePagination';
import { useCustomerFilter } from '@/composables/useCustomerFilter';

export const useListTodoController = () => {
	const todos = ref<TodoItem[]>([]);
	const {
		pageNo, pageSize, totalCount, pageSizeOptions,
		resetPage, setTotal, changePage, changePageSize
	} = usePagination(15);
	const isLoading = ref<boolean>(false);
	const isFilterOpen = ref<boolean>(false);
	const authStore = useAuthStore();

	const showCustomerModal = ref(false);
	const selectedCustomerName = ref('');

	const isConfirmDeleteOpen = ref<boolean>(false);
	const itemToDelete = ref<TodoItem | null>(null);

	const statusOptions = ['Tất cả', STATUS_LABELS[TODO_STATUS.NEW], STATUS_LABELS[TODO_STATUS.IN_PROGRESS], STATUS_LABELS[TODO_STATUS.DONE]];
	const statusValues = ['', TODO_STATUS.NEW, TODO_STATUS.IN_PROGRESS, TODO_STATUS.DONE];
	const statusIndex = ref<number>(0);

	const rawMemberList = ref<any[]>([]);
	const creatorOptions = ref(['Tất cả']);
	const creatorIndex = ref(0);
	const assigneeOptions = ref(['Tất cả']);
	const assigneeIndex = ref(0);

	const sourceOptions = ['Tất cả', 'Cuộc gọi', 'Khách hàng', 'Hội thoại', 'Tin nhắn'];
	const sourceValues = ['', TODO_SOURCE.CALL, TODO_SOURCE.CUSTOMER, TODO_SOURCE.CONVERSATION, TODO_SOURCE.CHAT_MESSAGE];
	const sourceIndex = ref<number>(0);

	const filter = ref({
		title: '', jobCode: '',
		createdFrom: '', createdTo: '',
		dueDateFrom: '', dueDateTo: '',
		customerCode: '',
		notifyFrom: '', notifyTo: '',
	});
	const fetchFilterMembers = async () => {
		if (rawMemberList.value.length > 0) return;
		try {
			const data = await getAllMembers();
			rawMemberList.value = data;
			const names = data.map(m => m.UserName || 'Thành viên ẩn');
			creatorOptions.value = ['Tất cả', ...names];
			assigneeOptions.value = ['Tất cả', ...names];
		} catch (error) {
			console.error('Lỗi lấy danh sách thành viên filter:', error);
		}
	};
	const {
		customerList,
		loadingCustomer,
		loadingMore,
		fetchCustomers,
		loadMoreCustomers
	} = useCustomerFilter();
	const fetchData = async () => {
		if (todos.value.length === 0) {
		            isLoading.value = true;
		        }
		try {
			const params = {
				...filter.value,
				pageNo: pageNo.value,
				pageSize: pageSize.value
			};

			let selectedCreatorId = '';
			if (creatorIndex.value > 0) {
				const member = rawMemberList.value[creatorIndex.value - 1];
				selectedCreatorId = member.UID || '';
			}

			let selectedAssigneeId = '';
			if (assigneeIndex.value > 0) {
				const member = rawMemberList.value[assigneeIndex.value - 1];
				selectedAssigneeId = member.UID || '';
			}

			const filterParams = buildTodoParams(
				filter.value,
				statusValues[statusIndex.value],
				sourceValues[sourceIndex.value],
				selectedCreatorId,
				selectedAssigneeId
			);

			const [listData, countData] = await Promise.all([
				getTodos({
					...filterParams,
					pageNo: pageNo.value,
					pageSize: pageSize.value
				}),
				getTodoCount(filterParams)
			]);

			todos.value = listData || [];
			setTotal(countData || 0);

		} catch (error) {
			console.error(error);
			showError('Lỗi tải dữ liệu');
		} finally {
			isLoading.value = false;

		}
	};
	const onChangePage = (step : number) => {
		const changed = changePage(step);
		if (changed) {
			getTodoList();
		}
	};
	const onUpdatePageSize = (newSize : number) => {
		changePageSize(newSize);
		getTodoList();
	};
	const openCustomerPopup = () => {
		showCustomerModal.value = true;
		fetchFilterMembers();

		if (customerList.value.length === 0) {
			fetchCustomers({});
		}
	};
	const onCustomerSelect = (customer : any) => {
		filter.value.customerCode = customer.uid;

		selectedCustomerName.value = customer.name;
		showCustomerModal.value = false;
	};
	const onFilterCustomerInModal = (filterParams : any) => {
		fetchCustomers(filterParams);
	};



	const onRequestDelete = (item : TodoItem) => { itemToDelete.value = item; isConfirmDeleteOpen.value = true; };
	const cancelDelete = () => { isConfirmDeleteOpen.value = false; itemToDelete.value = null; };
	const getTodoList = async () => {
	
			if (todos.value.length === 0) {
				isLoading.value = true;
			}
		
			try {
				let selectedCreatorId = '';
				if (creatorIndex.value > 0) {
					const member = rawMemberList.value[creatorIndex.value - 1];
					selectedCreatorId = member.UID || '';
				}
	
				let selectedAssigneeId = '';
				if (assigneeIndex.value > 0) {
					const member = rawMemberList.value[assigneeIndex.value - 1];
					selectedAssigneeId = member.UID || '';
				}
	
				const filterParams = buildTodoParams(
					filter.value,
					statusValues[statusIndex.value],
					sourceValues[sourceIndex.value],
					selectedCreatorId,
					selectedAssigneeId
				);
	
				const [listData, countData] = await Promise.all([
					getTodos({
						...filterParams,
						pageNo: pageNo.value,
						pageSize: pageSize.value
					}),
					getTodoCount(filterParams)
				]);
	
				todos.value = listData || [];
				setTotal(countData || 0);
	
			} catch (error) {
				console.error(error);
				showError('Lỗi tải dữ liệu');
	            if (todos.value.length === 0) {
	                todos.value = [];
	            }
			} finally {
				isLoading.value = false;
uni.stopPullDownRefresh();
			}
		};
		onPullDownRefresh(() => {
		        console.log('Đang làm mới trang...');
		        resetPage(); 
		        getTodoList(); 
		    });
	const confirmDelete = async () => {
		if (!itemToDelete.value) return;
		try {
			await deleteTodo(itemToDelete.value.id);
			showSuccess('Đã xóa thành công');
			isConfirmDeleteOpen.value = false;
			itemToDelete.value = null;
			getTodoList();
		} catch (error) {
			console.error("Delete Error:", error);
			showError('Xóa thất bại');
		}
	};

	const showActionMenu = (item : TodoItem) => {
		uni.showActionSheet({
			itemList: ['Xóa'],
			itemColor: '#ff3b30',
			success: (res) => {
				if (res.tapIndex === 0) onRequestDelete(item);
			}
		});
	};

	const addNewTask = () => { uni.navigateTo({ url: '/pages/todo/create_todo' }); };
	const openFilter = () => {
		isFilterOpen.value = true;
		fetchFilterMembers();
	};
	const closeFilter = () => { isFilterOpen.value = false; };

	const onStatusChange = (e : any) => { statusIndex.value = e.detail.value; };
	const onCreatorChange = (e : any) => { creatorIndex.value = e.detail.value; };
	const onAssigneeChange = (e : any) => { assigneeIndex.value = e.detail.value; };
	const onSourceChange = (e : any) => { sourceIndex.value = e.detail.value; };

	const resetFilter = () => {
		filter.value = {
			title: '', jobCode: '',
			createdFrom: '', createdTo: '',
			dueDateFrom: '', dueDateTo: '',
			customerCode: '',
			notifyFrom: '', notifyTo: ''
		};
		statusIndex.value = 0;
		creatorIndex.value = 0;
		assigneeIndex.value = 0;
		sourceIndex.value = 0;
		selectedCustomerName.value = '';
		resetPage();
	};

	const applyFilter = () => {
		resetPage();
		fetchData();
		closeFilter();
	};

	onShow(() => {
		getTodoList();
	});
	const goToDetail = (item : TodoItem) => {
		uni.navigateTo({
			url: `/pages/todo/todo_detail?id=${item.id}`
		});
	};
	return {
		todos, isLoading, isFilterOpen, filter, goToDetail,
		isConfirmDeleteOpen, itemToDelete,
		pageSizeOptions,
		statusOptions, statusIndex, onStatusChange,
		creatorOptions, creatorIndex, onCreatorChange,
		assigneeOptions, assigneeIndex, onAssigneeChange,
		sourceOptions, sourceIndex, onSourceChange,
		addNewTask, openFilter, closeFilter, resetFilter, applyFilter,
		showActionMenu, cancelDelete, confirmDelete,
		showCustomerModal, loadingCustomer, customerList, selectedCustomerName,
		openCustomerPopup, onCustomerSelect, onFilterCustomerInModal,

		pageNo, pageSize, totalCount,
		onChangePage, onUpdatePageSize,

		rawMemberList, fetchCustomers,
		loadingMore, loadMoreCustomers,
	};
};