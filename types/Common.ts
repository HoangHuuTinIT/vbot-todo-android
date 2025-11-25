//types/common.ts 
// Wrapper chung cho tất cả phản hồi API
export interface ApiResponse<T> {
    status: number;
    error?: number;
    errorCode?: number; // Một số API trả về error, một số trả về errorCode
    msg?: string;       // Có API trả msg
    message?: string;   // Có API trả message
    data: T;
}

// Enum cho các loại Link (Nguồn)
export type TodoLinkType = 'CALL' | 'CUSTOMER' | 'CONVERSATION' | 'CHAT_MESSAGE';

// Enum cho Trạng thái
export type TodoStatusType = 'TO_DO' | 'IN_PROGRESS' | 'DONE';

// Enum cho Loại tin nhắn
export type TodoMessageType = 'COMMENT' | 'UPDATE_TODO' | 'LOG';