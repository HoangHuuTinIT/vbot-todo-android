//types/todo.ts  
// Cấu trúc 1 Todo (Dùng cho cả List và Detail)
import type { TodoStatusType, TodoLinkType } from './common';
export interface AppConfig {
    projectCode: string;
    uid: string;
}

export interface TodoForm {
    name: string;
    desc: string;
    customer: string;
    customerUid?: string; // Có thể null nếu không chọn KH
    assignee: string;     // memberUID
    dueDate: string;      // YYYY-MM-DD
    notifyDate: string;   // YYYY-MM-DD
    notifyTime: string;   // HH:mm
}
export interface TodoItem {
    id: number;
    title: string;
    code: string;
    customerCode: string;
    projectCode: string | null;
    groupId: string;
    transId: string;
    description: string; // HTML content
    status: TodoStatusType;
    createdBy: string;
    assigneeId: string;
    groupMemberUid: string | null;
    dueDate: number; // Timestamp
    notificationReceivedAt: number; // Timestamp
    tags: string[];
    links: TodoLinkType;
    pluginType: string;
    createdAt: number;
    updatedAt: number;
    completedAt: number | null;
    firstActionAt: number | null;
    reAssignCount: number | null;
}

// Param trên URL khi Filter/Get All Todo
export interface GetTodoParams {
    projectCode: string;
    keySearch?: string;
    code?: string;
    customerCode?: string;
    groupId?: string;
    transId?: string;
    status?: string;
    createdBy?: string;
    assigneeId?: string;
    pluginType?: string;
    links?: string;
    startDate?: number;
    endDate?: number;
    dueDateFrom?: number;
    dueDateTo?: number;
    pageNo?: number;
    pageSize?: number;
}

// Payload gửi đi khi TẠO MỚI (Create)
export interface CreateTodoPayload {
    title: string;
    customerCode: string;
    projectCode: string;
    description: string;
    status: TodoStatusType;
    groupId: string;
    transId: string;
    tagCodes: string;
    links: TodoLinkType;
    pluginType: string;
    createdBy: string;
    assigneeId: string;
    groupMemberUid: string;
    files: string;
    phone: string;
    dueDate: number; // gửi -1 nếu không có
    notificationReceivedAt: number; // gửi -1 nếu không có
}

// Payload gửi đi khi CẬP NHẬT (Update)
export interface UpdateTodoPayload extends CreateTodoPayload {
    id: number;
    preFixCode: string; // VD: "TODO"
}