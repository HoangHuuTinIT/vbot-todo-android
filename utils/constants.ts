import type { TodoStatus } from '@/types/todo';

// Sử dụng Enum hoặc đối tượng có kiểu rõ ràng hơn
export const TODO_STATUS: Record<string, TodoStatus> = {
    NEW: 'TO_DO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
};

export const STATUS_LABELS: Record<TodoStatus, string> = {
    [TODO_STATUS.NEW]: 'Chờ xử lý',
    [TODO_STATUS.IN_PROGRESS]: 'Đang xử lý',
    [TODO_STATUS.DONE]: 'Hoàn thành'
};

export const STATUS_COLORS: Record<TodoStatus, string> = {
    [TODO_STATUS.DONE]: 'bg-green',
    [TODO_STATUS.IN_PROGRESS]: 'bg-orange',
    [TODO_STATUS.NEW]: 'bg-gray'
};

export const TIMELINE_TYPE_MAP: Record<string, string> = {
    "HISTORY_CALL_IN": "Cuộc gọi đến",
    "HISTORY_CALL_OUT": "Cuộc gọi đi",
    "HISTORY_MISS_CALL": "Cuộc gọi nhỡ",
    "NEW_TICKET": "Tạo mới ticket",
    "REOPEN_TICKET": "Mở lại ticket",
    "NEW_SUB_TICKET": "Tạo ticket con",
    "UPDATE_STATUS_TICKET": "Cập nhật trạng thái ticket",
    "UPDATE_ASSIGNEE_TICKET": "Đổi người xử lý ticket",
    "NEW_TODO": "Tạo mới công việc",
    "REOPEN_TODO": "Mở lại công việc",
    "UPDATE_STATUS_TODO": "Cập nhật trạng thái công việc",
    "UPDATE_ASSIGNEE_TODO": "Đổi người thực hiện công việc",
    "CUSTOMER_UPDATE": "Cập nhật thông tin khách hàng",
    "NOTE_INSERT": "Thêm ghi chú",
    "NOTE_UPDATE": "Sửa ghi chú",
    "NOTE_DELETE": "Xóa ghi chú"
};