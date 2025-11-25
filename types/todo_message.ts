//types/todo_message.ts 
// Reaction (Thả tim)
import type { TodoMessageType } from './common';
export interface ReactionDetail {
    codeEmoji: string;
    senderId: string;
}

export interface ReactionData {
    total: number;
    details: ReactionDetail[];
}

// Cấu trúc 1 Bình luận
export interface TodoMessageData {
    id: number;
    todoId: number;
    senderId: string;
    message: string; // HTML content
    type: TodoMessageType;
    files: string;
    createdAt: number;
    updatedAt: number | null;
    parentId: number | null;
    replies: TodoMessageData[]; // Đệ quy
    reactions: ReactionData;
    isDeleted?: boolean; // Có thể có nếu đã xóa
}

// Payload tạo bình luận
export interface CreateMessagePayload {
    todoId: number;
    senderId: string;
    message: string;
    files: string;
    parentId?: number; // -1 hoặc ID comment cha
}

// Payload update bình luận
export interface UpdateMessagePayload {
    id: number;
    todoId: number;
    senderId: string;
    message: string;
    files: string;
}

// Payload Reaction
export interface ReactionPayload {
    todoId: number;
    senderId: string;
    todoMessageId: number;
    codeEmoji: string;
}