//types/CRM.ts 
// Cấu trúc Field Search (API getAllFieldSearch)
export interface CrmFieldDefinition {
    id: number;
    code: string;
    uid: string;
    name: string;
    description: string;
    type: string; // VD: "DATE", "STRING", "PHONE"
    isRequired: boolean;
    isUnique: boolean;
    number: number;
    options: any[];
    [key: string]: any;
}

// Cấu trúc 1 Item Field trong Object Khách hàng
export interface CrmCustomerFieldItem {
    id: number;
    name: string;
    code: string; // "name", "phone", "member_no"...
    type: string;
    value: string;
    number: number;
    valueOption: any | null;
    [key: string]: any;
}

// Cấu trúc Khách hàng (List & Detail)
export interface CrmCustomer {
    id: number;
    uid: string;
    createAt?: number;
    // API getAll trả về 'customerFieldItems', getDetail trả về 'fields'
    customerFieldItems?: CrmCustomerFieldItem[]; 
    fields?: CrmCustomerFieldItem[]; 
}

// Payload gửi đi để search Khách hàng
export interface SearchCustomerPayload {
    page: number;
    size: number;
    fieldSearch: Array<{
        id: number;
        value: string;
        type: string;
        isSearch: boolean;
    }>;
}

// Lịch sử hoạt động (ActionTimeline)
export interface CrmTimelineItem {
    id: number;
    createAt: number;
    memberUid: string;
    dataOld: string; // JSON String
    param: string;   // JSON String: "{\"code\":\"TD_...\"}"
    type: string;    // VD: "TODO"
    typeSub: string; // VD: "NEW_TODO"
    content: string; // HTML String
    customerUid: string;
    customerId: number;
}