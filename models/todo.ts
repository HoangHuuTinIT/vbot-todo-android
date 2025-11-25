//models/todo.ts 
import { TODO_STATUS, STATUS_LABELS, STATUS_COLORS } from '@/utils/constants';
import type { TodoItem } from '@/types/todo'; // Import Type

// --- PRIVATE HELPERS ---
const formatFullDateTime = (timestamp: number): string => {
    if (!timestamp || timestamp === -1 || timestamp === 0) return '';
    const date = new Date(timestamp);
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    const h = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    const s = date.getSeconds().toString().padStart(2, '0');
    return `${d}/${m}/${y} ${h}:${min}:${s}`;
};

const dateToTimestamp = (dateStr: string): number => (!dateStr ? -1 : new Date(dateStr).getTime());
export interface TodoListFilterState {
    title: string;
    jobCode: string;
    createdFrom: string;
    createdTo: string;
    dueDateFrom: string;
    dueDateTo: string;
}
// --- PUBLIC MODELS ---

// Note: Params lọc có thể định nghĩa Interface riêng nếu muốn kỹ hơn
export const buildTodoParams = (
    filter: TodoListFilterState, // Dùng interface vừa định nghĩa
    statusValue: string, 
    sourceValue: string, 
    creatorId: string, 
    assigneeId: string
): Partial<GetTodoParams> => {
    return {
        keySearch: filter.title || '',
        code: filter.jobCode || '',
        status: statusValue || '',
        
        startDate: dateToTimestamp(filter.createdFrom),
        endDate: dateToTimestamp(filter.createdTo),
        
        dueDateFrom: dateToTimestamp(filter.dueDateFrom),
        dueDateTo: dateToTimestamp(filter.dueDateTo),
        
        createdBy: creatorId || '',
        assigneeId: assigneeId || '',
        links: sourceValue || '',
        
        // Mặc định các trường khác rỗng
        customerCode: '',
        groupId: '',
        transId: '',
        pluginType: '',
    };
};

export const mapTodoFromApi = (apiData: TodoItem): TodoItem => {
    if (!apiData) return {} as TodoItem;
    // Vì apiData bây giờ đã là Type TodoItem chuẩn nên ta chỉ cần format lại các trường hiển thị nếu cần
    // Hoặc giữ nguyên nếu không cần transform gì phức tạp
    
    // Logic map cũ của bạn:
    const status = apiData.status || TODO_STATUS.NEW;
    const title = apiData.title || 'Không tên';

    return {
        ...apiData, // Spread toàn bộ thuộc tính gốc
        title: title,
        // Các thuộc tính UI thêm vào (nếu TodoItem cho phép mở rộng hoặc bạn tạo interface UI riêng)
        // Ở đây mình giả sử TodoItem chứa cả UI fields (statusClass, statusLabel...)
        // Nếu TodoItem chỉ thuần data API, bạn nên tạo interface TodoItemUI extends TodoItem
        statusClass: STATUS_COLORS[status] || 'bg-orange',
        statusLabel: STATUS_LABELS[status] || status,
        avatarText: title.substring(0, 2).toUpperCase(),
        createdAtFormatted: formatFullDateTime(apiData.createdAt),
    } as any; // Cast as any tạm thời nếu Interface TodoItem của bạn chưa có statusClass, statusLabel
};