
import { TODO_STATUS } from '@/utils/constants';
import { TODO_SOURCE } from '@/utils/enums';
import type { TodoItem } from '@/types/todo';

export interface TodoDetailForm {
    id: string | number;
    title: string;
    code: string;
    desc: string;
    statusIndex: number;
    sourceIndex: number;
    assigneeIndex: number;
    assigneeId: string;
    dueDate: string;
    notifyDate: string;
    notifyTime: string;
    customerCode: string;
    customerName: string;
    customerNameLabel: string;
    customerPhone: string;
    customerPhoneLabel: string;
    customerManagerName: string;
    customerManagerLabel: string;
    notifyAt: string;
    raw: TodoItem; 
}
const timestampToDateTimeStr = (ts: number): string => {
    if (!ts || ts <= 0) return '';
    try {
        const date = new Date(ts);
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        const h = date.getHours().toString().padStart(2, '0');
        const min = date.getMinutes().toString().padStart(2, '0');
        const sec = '00'; 
        return `${y}-${m}-${d} ${h}:${min}:${sec}`;
    } catch { return ''; }
};






export const mapTodoDetailToForm = (apiData: TodoItem): TodoDetailForm | null => {
    if (!apiData) return null;

    const statusMap = [TODO_STATUS.NEW, TODO_STATUS.IN_PROGRESS, TODO_STATUS.DONE];
    let sIndex = statusMap.indexOf(apiData.status);
    if (sIndex === -1) sIndex = 0; 

    const sourceMap = [TODO_SOURCE.CALL, TODO_SOURCE.CUSTOMER, TODO_SOURCE.CONVERSATION, TODO_SOURCE.CHAT_MESSAGE];
    let srcIndex = sourceMap.indexOf(apiData.links);
    if (srcIndex === -1) srcIndex = 0;

    const notiTimestamp = apiData.notificationReceivedAt || 0;

    return {
        id: apiData.id,
        title: apiData.title || '',
        code: apiData.code || '',
        desc: apiData.description || '',

        statusIndex: sIndex,
        sourceIndex: srcIndex,
        assigneeIndex: 0,
		assigneeId: apiData.assigneeId || '',
		dueDate: timestampToDateTimeStr(apiData.dueDate),
		notifyAt: timestampToDateTimeStr(apiData.notificationReceivedAt),
		customerCode: apiData.customerCode || '', 
		customerName: '', 
		customerNameLabel: 'Tên khách hàng',
		customerPhone: '',
		customerPhoneLabel: 'Số điện thoại',
		customerManagerName: '',
		raw: apiData
    };
};