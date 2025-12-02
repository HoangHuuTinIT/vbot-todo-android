// composables/useCustomerFilter.ts
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getCrmFieldSearch, getCrmCustomers } from '@/api/crm';
import { showError } from '@/utils/toast';
const convertDateRangeToValue = (startDate: string, endDate: string): string => {
    if (!startDate && !endDate) return "";
    let startTs = "";
    let endTs = "";
    if (startDate) {
        const d = new Date(startDate);
        d.setHours(0, 0, 0, 0);
        startTs = d.getTime().toString();
    }
    if (endDate) {
        const d = new Date(endDate);
        d.setHours(0, 0, 0, 0);
        endTs = d.getTime().toString();
    }
    if (!startTs && !endTs) return "";
    return `${startTs}|${endTs}`;
};

export const useCustomerFilter = () => {
    const authStore = useAuthStore();
    const customerList = ref<any[]>([]);
    const loadingCustomer = ref(false);

    const fetchCustomers = async (searchFilter: any = {}) => {
        // searchFilter: { name, phone, managerUID, startDate, endDate }
        loadingCustomer.value = true;
        
        try {
            const token = authStore.crmToken;
            if (!token) {
                console.error("Chưa có CRM Token!");
                return;
            }

            // 1. Lấy danh sách Field ID
            const fields = await getCrmFieldSearch(token);
            
            // Helper tìm field
            const findFieldId = (code: string, defaultId: number) => {
                const f = fields.find((item: any) => item.code === code);
                return f ? f.id : defaultId;
            };

            const createAtId = findFieldId('create_at', -1);
            const nameId = findFieldId('name', 154);
            const phoneId = findFieldId('phone', 155);
            const memberNoId = findFieldId('member_no', 156);

            // 2. Chuẩn bị giá trị lọc
            const filterName = searchFilter?.name || "";
            const filterPhone = searchFilter?.phone || "";
            const filterMemberUID = searchFilter?.managerUID || "";
            const dateValue = convertDateRangeToValue(searchFilter?.startDate, searchFilter?.endDate);

            // 3. Build Request Body
            const requestBody = {
                page: 1, // Mặc định page 1 (có thể mở rộng thêm tham số page nếu cần)
                size: 20,
                fieldSearch: [
                    { 
                        id: createAtId, 
                        value: dateValue, 
                        type: "RANGER", 
                        isSearch: !!dateValue 
                    },
                    { 
                        id: nameId, 
                        value: filterName, 
                        type: "CONTAIN", 
                        isSearch: !!filterName 
                    },
                    { 
                        id: phoneId, 
                        value: filterPhone, 
                        type: "CONTAIN", 
                        isSearch: !!filterPhone 
                    },
                    { 
                        id: memberNoId, 
                        value: filterMemberUID, 
                        type: "EQUAL", 
                        isSearch: !!filterMemberUID 
                    }
                ]
            };

            // 4. Gọi API
            const rawData = await getCrmCustomers(token, requestBody);

            // 5. Map dữ liệu trả về
            customerList.value = rawData.map((item: any) => {
                const nameObj = item.customerFieldItems.find((f: any) => f.code === 'name');
                const phoneObj = item.customerFieldItems.find((f: any) => f.code === 'phone');

                return {
                    id: item.id,
                    uid: item.uid,
                    createAt: item.createAt,
                    name: nameObj ? nameObj.value : '(Không tên)',
                    phone: phoneObj ? phoneObj.value : '',
                    code: item.code || ''
                };
            });

        } catch (error) {
            console.error('Lỗi tải khách hàng:', error);
            showError('Lỗi tải dữ liệu CRM');
        } finally {
            loadingCustomer.value = false;
        }
    };

    return {
        customerList,
        loadingCustomer,
        fetchCustomers
    };
};