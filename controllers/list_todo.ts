//controllers/list_todo.ts
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { getTodos, getTodoCount, deleteTodo } from '@/api/todo';
import { TODO_STATUS, STATUS_LABELS } from '@/utils/constants';
import { buildTodoParams } from '@/models/todo';
import { TODO_SOURCE } from '@/utils/enums';
import type { TodoItem } from '@/types/todo';
import { getAllMembers } from '@/api/project';
import { showSuccess, showError } from '@/utils/toast';
export const useListTodoController = () => {
	const todos = ref<TodoItem[]>([]);
	const isLoading = ref<boolean>(false);
	const isFilterOpen = ref<boolean>(false);

	const isConfirmDeleteOpen = ref<boolean>(false);
	const itemToDelete = ref<TodoItem | null>(null);

	const statusOptions = ['Tất cả', STATUS_LABELS[TODO_STATUS.NEW], STATUS_LABELS[TODO_STATUS.IN_PROGRESS], STATUS_LABELS[TODO_STATUS.DONE]];
	const statusValues = ['', TODO_STATUS.NEW, TODO_STATUS.IN_PROGRESS, TODO_STATUS.DONE];
	const statusIndex = ref<number>(0);

	const rawMemberList = ref<any[]>([]);
	const creatorOptions = ref(['Tất cả']);
	const creatorIndex = ref(0);
	const customerOptions = ['Tất cả', 'KH001', 'KH002', 'VNG'];
	const customerIndex = ref(0);
	const assigneeOptions = ref(['Tất cả']);
	const assigneeIndex = ref(0);

	const sourceOptions = ['Tất cả', 'Cuộc gọi (CALL)', 'Khách hàng (CUSTOMER)', 'Hội thoại (CONVERSATION)', 'Tin nhắn (CHAT_MESSAGE)'];
	const sourceValues = ['', TODO_SOURCE.CALL, TODO_SOURCE.CUSTOMER, TODO_SOURCE.CONVERSATION, TODO_SOURCE.CHAT_MESSAGE];
	const sourceIndex = ref<number>(0);

	const filter = ref({
		title: '', jobCode: '',
		createdFrom: '', createdTo: '',
		dueDateFrom: '', dueDateTo: ''
	});

	const pageSizeOptions = ['5/trang', '10/trang', '15/trang', '20/trang'];
	const pageSizeValues = [5, 10, 15, 20];
	const pageSizeIndex = ref(2);
	const currentPage = ref(1);
	const totalItems = ref(0);

	const totalPages = computed(() => {
		if (totalItems.value === 0) return 1;
		const size = pageSizeValues[pageSizeIndex.value];
		return Math.ceil(totalItems.value / size);
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
	const getTodoList = async () => {
		isLoading.value = true;
		try {


			let selectedCreatorId = '';
			if (creatorIndex.value > 0) {
				selectedCreatorId = rawMemberList.value[creatorIndex.value - 1].UID;
			}

			let selectedAssigneeId = '';
			if (assigneeIndex.value > 0) {
				selectedAssigneeId = rawMemberList.value[assigneeIndex.value - 1].memberUID;
			}

			const filterParams = buildTodoParams(
				filter.value,
				statusValues[statusIndex.value],
				sourceValues[sourceIndex.value],
				selectedCreatorId,
				selectedAssigneeId
			);

			const currentSize = pageSizeValues[pageSizeIndex.value];

			const [listData, countData] = await Promise.all([
				getTodos({
					...filterParams,
					pageNo: currentPage.value,
					pageSize: currentSize
				}),
				getTodoCount(filterParams)
			]);

			todos.value = listData || [];
			totalItems.value = countData || 0;
		} catch (error) {
			console.error(error);
			showError('Lỗi tải dữ liệu');
		} finally {
			isLoading.value = false;
		}
	};

	const onPageSizeChange = (e : any) => {
		pageSizeIndex.value = e.detail.value;
		currentPage.value = 1;
		getTodoList();
	};

	const changePage = (direction : number) => {
		const newPage = currentPage.value + direction;
		if (newPage >= 1 && newPage <= totalPages.value) {
			currentPage.value = newPage;
			getTodoList();
		}
	};

	const onRequestDelete = (item : TodoItem) => { itemToDelete.value = item; isConfirmDeleteOpen.value = true; };
	const cancelDelete = () => { isConfirmDeleteOpen.value = false; itemToDelete.value = null; };

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
	const onCustomerChange = (e : any) => { customerIndex.value = e.detail.value; };
	const onAssigneeChange = (e : any) => { assigneeIndex.value = e.detail.value; };
	const onSourceChange = (e : any) => { sourceIndex.value = e.detail.value; };

	const resetFilter = () => {
		filter.value = {
			title: '', jobCode: '',
			createdFrom: '', createdTo: '',
			dueDateFrom: '', dueDateTo: ''
		};
		statusIndex.value = 0;
		creatorIndex.value = 0;
		customerIndex.value = 0;
		assigneeIndex.value = 0;
		sourceIndex.value = 0;
		currentPage.value = 1;
	};

	const applyFilter = () => {
		currentPage.value = 1;
		closeFilter();
		getTodoList();
	};

	onShow(() => { getTodoList(); });
	const goToDetail = (item : TodoItem) => {
		uni.navigateTo({
			url: `/pages/todo/todo_detail?id=${item.id}`
		});
	};
	return {
		todos, isLoading, isFilterOpen, filter, goToDetail,
		isConfirmDeleteOpen, itemToDelete,
		pageSizeOptions, pageSizeIndex, currentPage, totalPages, totalItems, onPageSizeChange, changePage,
		statusOptions, statusIndex, onStatusChange,
		creatorOptions, creatorIndex, onCreatorChange,
		assigneeOptions, assigneeIndex, onAssigneeChange,
		customerOptions, customerIndex, onCustomerChange,
		sourceOptions, sourceIndex, onSourceChange,
		addNewTask, openFilter, closeFilter, resetFilter, applyFilter,
		showActionMenu, cancelDelete, confirmDelete
	};
};