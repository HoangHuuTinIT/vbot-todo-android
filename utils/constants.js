// utils/constants.js

export const TODO_STATUS = {
    NEW: 'TO_DO',
    IN_PROGRESS: 'IN_PROGRESS',
    DONE: 'DONE'
};

export const STATUS_LABELS = {
    [TODO_STATUS.NEW]: 'Mới',
    [TODO_STATUS.IN_PROGRESS]: 'Đang làm',
    [TODO_STATUS.DONE]: 'Xong'
};

export const STATUS_COLORS = {
    [TODO_STATUS.DONE]: 'bg-green',
    [TODO_STATUS.IN_PROGRESS]: 'bg-blue',
    [TODO_STATUS.NEW]: 'bg-orange'
};