//composables/usePagination.ts
import { ref, computed } from 'vue';

export const usePagination = (defaultPageSize = 15) => {
	const pageNo = ref(1);
	const pageSize = ref(defaultPageSize);
	const totalCount = ref(0);
	const pageSizeOptions = [5, 10, 15, 20];

	const totalPages = computed(() => {
		if (totalCount.value === 0) return 1;
		return Math.ceil(totalCount.value / pageSize.value);
	});

	const resetPage = () => {
		pageNo.value = 1;
	};

	const setTotal = (count : number) => {
		totalCount.value = count;
	};

	const changePage = (step : number) => {
		const newPage = pageNo.value + step;
		if (newPage >= 1 && newPage <= totalPages.value) {
			pageNo.value = newPage;
			return true;
		}
		return false;
	};

	const changePageSize = (newSize : number) => {
		pageSize.value = newSize;
		pageNo.value = 1;
	};

	return {
		pageNo,
		pageSize,
		totalCount,
		pageSizeOptions,
		totalPages,
		resetPage,
		setTotal,
		changePage,
		changePageSize
	};
};