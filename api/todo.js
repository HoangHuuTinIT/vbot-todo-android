// api/todo.js
import { request } from '@/utils/request.js';
import { PROJECT_CODE } from '@/utils/config.js';

// URL gốc của module TODO (Lưu ý: check lại domain staging của bạn cho chính xác)
const API_TODO_URL = 'https://api-staging.vbot.vn/v1.0/api/module-todo/todo';

export const getTodos = (params) => {
    return request({
        url: `${API_TODO_URL}/getAll`,
        method: 'GET',
        data: {
            projectCode: PROJECT_CODE,
            pageNo: 1,
            pageSize: 20,
            ...params // Truyền filter vào đây
        }
    });
};