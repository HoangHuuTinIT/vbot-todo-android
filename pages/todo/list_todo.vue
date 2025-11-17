<script setup>
    import { ref } from 'vue';
    import { onShow } from '@dcloudio/uni-app';
    
    // Import Service và Constants mới
    import { getTodos } from '@/api/todo.js';
    import { TODO_STATUS, STATUS_LABELS, STATUS_COLORS } from '@/utils/constants.js';

    const todos = ref([]);
    const isLoading = ref(false);
    const isFilterOpen = ref(false);

    // Sử dụng Constants thay cho chuỗi cứng
    const statusOptions = ['Tất cả', STATUS_LABELS[TODO_STATUS.NEW], STATUS_LABELS[TODO_STATUS.IN_PROGRESS], STATUS_LABELS[TODO_STATUS.DONE]];
    // Mapping index của picker sang giá trị API
    const statusValues = ['', TODO_STATUS.NEW, TODO_STATUS.IN_PROGRESS, TODO_STATUS.DONE];
    
    const statusIndex = ref(0);
    const filter = ref({ title: '', jobCode: '', createdFrom: '', createdTo: '' });

    onShow(() => { 
        getTodoList(); 
    });

    // --- Giữ nguyên các hàm format date ---
    const dateToTimestamp = (dateStr) => (!dateStr ? -1 : new Date(dateStr).getTime());
    const formatTimeShort = (timestamp) => { /* ...giữ nguyên code cũ... */ };

    // --- Helper functions dùng Constants ---
    const getStatusLabel = (code) => STATUS_LABELS[code] || code;
    const getStatusColorClass = (code) => STATUS_COLORS[code] || 'bg-orange';
    const getAvatarText = (title) => title ? title.substring(0, 2).toUpperCase() : 'NA';

    // --- Logic gọi API đã được Refactor ---
    const getTodoList = async () => {
        isLoading.value = true;
        try {
            // Gọi qua Service, không cần quan tâm header hay token ở đây nữa
            const data = await getTodos({
                keySearch: filter.value.title || '',
                code: filter.value.jobCode || '',
                status: statusValues[statusIndex.value],
                startDate: dateToTimestamp(filter.value.createdFrom),
                endDate: dateToTimestamp(filter.value.createdTo),
                // Các params mặc định khác nếu cần
                dueDateFrom: -1, dueDateTo: -1
            });
            
            todos.value = data || [];
        } catch (error) {
            uni.showToast({ title: 'Lỗi tải dữ liệu', icon: 'none' });
        } finally {
            isLoading.value = false;
        }
    }

    // --- Các hàm UI event giữ nguyên ---
    const addNewTask = () => { uni.navigateTo({ url: '/pages/todo/create_todo' }); }
    const openFilter = () => { isFilterOpen.value = true; }
    const closeFilter = () => { isFilterOpen.value = false; }
    const onStatusChange = (e) => { statusIndex.value = e.detail.value; }
    
    const resetFilter = () => { 
        filter.value = { title: '', jobCode: '', createdFrom: '', createdTo: '' };
        statusIndex.value = 0; 
    }
    
    const applyFilter = () => { closeFilter(); getTodoList(); }
</script>