import { TODO_STATUS, STATUS_LABELS, STATUS_COLORS } from '@/utils/constants';
import type { TodoItem } from '@/types/todo'; 

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
const getStartOfDay = (dateStr: string): number => {
    if (!dateStr) return -1;
    const safeDate = dateStr.replace(/-/g, '/');
    return new Date(`${safeDate} 00:00:00`).getTime();
};

const getEndOfDay = (dateStr: string): number => {
    if (!dateStr) return -1;
    const safeDate = dateStr.replace(/-/g, '/');
    return new Date(`${safeDate} 00:00:00`).getTime();
};
const dateToTimestamp = (dateStr: string): number => {
    if (!dateStr) return -1; 
    return new Date(dateStr).getTime();
};
export interface TodoListFilterState {
    title: string;
    jobCode: string;
    createdFrom: string;
    createdTo: string;
    dueDateFrom: string;
    dueDateTo: string;
	notifyFrom: string;
	notifyTo: string;
	customerCode: string;
}
export const buildTodoParams = (
    filter: TodoListFilterState, 
    statusValue: string, 
    sourceValue: string, 
    creatorId: string, 
    assigneeId: string
): Partial<GetTodoParams> => {
    return {
        keySearch: filter.title || '',
        code: filter.jobCode || '',
        status: statusValue || '',
        
        startDate: getStartOfDay(filter.createdFrom), 
                endDate: getEndOfDay(filter.createdTo),     
              
                dueDateFrom: getStartOfDay(filter.dueDateFrom), 
                dueDateTo: getEndOfDay(filter.dueDateTo),       
           
                notificationReceivedAtFrom: getStartOfDay(filter.notifyFrom), 
                notificationReceivedAtTo: getEndOfDay(filter.notifyTo),      
		
		createdBy: creatorId || '',
		assigneeId: assigneeId || '',
		customerCode: filter.customerCode || '',

        links: sourceValue || '',
        groupId: '',
        transId: '',
        pluginType: '',
    };
};

export const mapTodoFromApi = (apiData: TodoItem): TodoItem => {
    if (!apiData) return {} as TodoItem;
    const status = apiData.status || TODO_STATUS.NEW;
    const title = apiData.title || 'Không tên';

    return {
        ...apiData, 
        title: title,
        statusClass: STATUS_COLORS[status] || 'bg-orange',
        statusLabel: STATUS_LABELS[status] || status,
        avatarText: title.substring(0, 2).toUpperCase(),
        createdAtFormatted: formatFullDateTime(apiData.createdAt),
    } as any; 
};