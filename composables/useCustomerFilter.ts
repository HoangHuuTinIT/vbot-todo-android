// composables/useCustomerFilter.ts
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getCrmFieldSearch, getCrmCustomers } from '@/api/crm';
import { showError } from '@/utils/toast';
import { convertDateRangeToValue } from '@/utils/dateUtils';
import { useI18n } from 'vue-i18n';

export const useCustomerFilter = () => {
	const { t } = useI18n();
	const authStore = useAuthStore();
	const customerList = ref<any[]>([]);
	const loadingCustomer = ref(false);
	const loadingMore = ref(false);

	const currentPage = ref(1);
	const savedFilter = ref<any>({});
	const isFinished = ref(false);

	const PAGE_SIZE = 15;

	const fetchCustomers = async (searchFilter : any = {}, isLoadMore = false) => {
		if (isLoadMore) {
			if (isFinished.value || loadingMore.value) return;
			loadingMore.value = true;
			currentPage.value += 1;
		} else {
			loadingCustomer.value = true;
			currentPage.value = 1;
			isFinished.value = false;
			savedFilter.value = searchFilter;
		}

		try {
			const token = authStore.crmToken;
			if (!token) return;

			const fields = await getCrmFieldSearch(token);
			const findFieldId = (code : string, defaultId : number) => {
				const f = fields.find((item : any) => item.code === code);
				return f ? f.id : defaultId;
			};
			const createAtId = findFieldId('create_at', -1);
			const nameId = findFieldId('name', 154);
			const phoneId = findFieldId('phone', 155);
			const memberNoId = findFieldId('member_no', 156);

			const activeFilter = isLoadMore ? savedFilter.value : searchFilter;

			const filterName = activeFilter?.name || "";
			const filterPhone = activeFilter?.phone || "";
			const filterMemberUID = activeFilter?.managerUID || "";
			const dateValue = convertDateRangeToValue(activeFilter?.startDate, activeFilter?.endDate);

			const requestBody = {
				page: currentPage.value,
				size: PAGE_SIZE,
				fieldSearch: [
					{ id: createAtId, value: dateValue, type: "RANGER", isSearch: !!dateValue },
					{ id: nameId, value: filterName, type: "CONTAIN", isSearch: !!filterName },
					{ id: phoneId, value: filterPhone, type: "CONTAIN", isSearch: !!filterPhone },
					{ id: memberNoId, value: filterMemberUID, type: "EQUAL", isSearch: !!filterMemberUID }
				]
			};

			const rawData = await getCrmCustomers(token, requestBody);

			const mappedData = rawData.map((item : any) => {
				const nameObj = item.customerFieldItems.find((f : any) => f.code === 'name');
				const phoneObj = item.customerFieldItems.find((f : any) => f.code === 'phone');
				const managerObj = item.customerFieldItems.find((f : any) => f.code === 'member_no');
				return {
					id: item.id,
					uid: item.uid,
					createAt: item.createAt,
					name: nameObj ? nameObj.value : t('common.no_name'),
					phone: phoneObj ? phoneObj.value : '',
					code: item.code || '',
					managerUid: managerObj ? managerObj.value : ''
				};
			});

			if (isLoadMore) {
				customerList.value = [...customerList.value, ...mappedData];
			} else {
				customerList.value = mappedData;
			}

			if (mappedData.length < PAGE_SIZE) {
				isFinished.value = true;
			}

		} catch (error) {
			console.error('Lỗi tải khách hàng:', error);
			showError(t('todo.error_load_crm'));
			if (!isLoadMore) customerList.value = [];
		} finally {
			loadingCustomer.value = false;
			loadingMore.value = false;
		}
	};

	const loadMoreCustomers = () => {
		fetchCustomers(null, true);
	};

	return {
		customerList,
		loadingCustomer,
		loadingMore,
		fetchCustomers,
		loadMoreCustomers
	};
};