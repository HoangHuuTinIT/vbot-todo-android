import { request } from '@/utils/request';
import { SYSTEM_CONFIG } from '@/utils/enums';
import { useAuthStore } from '@/stores/auth';
import { CRM_API_URL } from '@/utils/config';
import type { ApiResponse } from '@/types/common';
import type { TokenData } from '@/types/Auth';
import type { 
    CrmFieldDefinition, 
    CrmCustomer, 
    SearchCustomerPayload, 
    CrmTimelineItem 
} from '@/types/CRM';

// 1. Lấy Token CRM
export const getCrmToken = (projectCode: string, uid: string): Promise<string> => {
    const authStore = useAuthStore();
    // Dùng request wrapper để tận dụng logic xử lý lỗi chung
    return request<TokenData>({
        url: `${CRM_API_URL}/token`,
        method: 'GET',
        data: {
            projectCode,
            uid,
            type: 'CRM',
            source: SYSTEM_CONFIG.SOURCE_PARAM
        },
        // Lưu ý: request wrapper đã tự thêm Authorization từ Store
        // Nếu API này cần token ROOT đặc biệt thì đè lại header như sau:
        header: {
            'Authorization': `Bearer ${authStore.rootToken}`
        }
    }).then(data => data.token); 
    // Lưu ý: TokenData = { token: "...", ... } nên cần lấy .token
};

// 2. Lấy định nghĩa trường tìm kiếm
export const getCrmFieldSearch = (crmToken: string): Promise<CrmFieldDefinition[]> => {
    return request<CrmFieldDefinition[]>({
        url: `${CRM_API_URL}/Customer/getAllFieldSearch`,
        method: 'POST',
        data: {},
        header: { 'Authorization': `Bearer ${crmToken}` }
    });
};

// 3. Lấy danh sách khách hàng
export const getCrmCustomers = (crmToken: string, body: SearchCustomerPayload): Promise<CrmCustomer[]> => {
    return request<CrmCustomer[]>({
        url: `${CRM_API_URL}/Customer/getAll`,
        method: 'POST',
        data: body,
        header: { 'Authorization': `Bearer ${crmToken}` }
    });
};

// 4. Lấy chi tiết khách hàng (SỬA LỖI Ở ĐÂY)
// [SỬA]: Bỏ .then(res => res.data) vì request đã trả về CrmCustomer rồi
export const getCrmCustomerDetail = (crmToken: string, customerUid: string): Promise<CrmCustomer> => {
    return request<CrmCustomer>({
        url: `${CRM_API_URL}/Customer/getDetail`,
        method: 'GET',
        data: { uid: customerUid },
        header: { 'Authorization': `Bearer ${crmToken}` }
    });
};

// 5. Lấy lịch sử timeline (SỬA LỖI Ở ĐÂY)
// [SỬA]: Bỏ .then(res => res.data)
export const getCrmActionTimeline = (crmToken: string, customerUid: string, type: string = 'ALL'): Promise<CrmTimelineItem[]> => {
    return request<CrmTimelineItem[]>({
        url: `${CRM_API_URL}/ActionTimeline/getAll?from=-1&to=-1&customerUid=${customerUid}&type=${type}&page=1&size=10&memberUid=&projectCode=`,
        method: 'GET',
        header: { 'Authorization': `Bearer ${crmToken}` }
    });
};