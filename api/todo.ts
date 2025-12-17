import { request } from '@/utils/request';
import { mapTodoFromApi } from '@/models/todo';
import { TODO_API_URL, SERVER_BASE_URL } from '@/utils/config';
import { useAuthStore } from '@/stores/auth';
import type { 
    TodoItem, 
    GetTodoParams, 
    CreateTodoPayload, 
    UpdateTodoPayload 
} from '@/types/todo';
import type { 
    TodoMessageData, 
    CreateMessagePayload, 
    UpdateMessagePayload, 
    ReactionPayload 
} from '@/types/todo_message';

export const getTodos = async (params: Partial<GetTodoParams>): Promise<TodoItem[]> => {
	const authStore = useAuthStore();
	console.log('API getTodos đang dùng ProjectCode:', authStore.projectCode);
    const response = await request<TodoItem[]>({
        url: `${TODO_API_URL}/getAll`,
        method: 'GET',
        data: {
            projectCode: authStore.projectCode,
            pageNo: 1,
            pageSize: 15,
            ...params
        }
    });

    if (Array.isArray(response)) {
        return response.map((item) => mapTodoFromApi(item));
    }
    return [];
};

export const getTodoCount = async (params: Partial<GetTodoParams>): Promise<number> => {
	const authStore = useAuthStore();
    const response = await request<number>({
        url: `${TODO_API_URL}/countAll`,
        method: 'GET',
        data: {
            projectCode: authStore.projectCode,
            ...params
        }
    });
    return Number(response) || 0;
};


export const createTodo = (data: CreateTodoPayload): Promise<number> => {
    return request<number>({
        url: `${TODO_API_URL}/create`,
        method: 'POST',
        data: data
    });
};

export const deleteTodo = (id: string | number): Promise<boolean> => {
    return request<boolean>({
        url: `${TODO_API_URL}/delete`,
        method: 'POST',
        data: { id: id }
    });
};

export const getTodoDetail = (id: string | number): Promise<TodoItem> => {
	const authStore = useAuthStore();
    return request<TodoItem>({
        url: `${TODO_API_URL}/getDetail`,
        method: 'GET',
        data: {
            id: id,
            projectCode: authStore.projectCode
        }
    });
};

export const updateTodo = (data: UpdateTodoPayload): Promise<number> => {
    return request<number>({
        url: `${TODO_API_URL}/update`,
        method: 'POST',
        data: data
    });
};


export const getTodoMessages = (todoId: string | number, keySearch: string = ''): Promise<TodoMessageData[]> => {
    return request<TodoMessageData[]>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/getAllNoPageWithReact`,
        method: 'GET',
        data: {
            todoId: todoId,
            keySearch: keySearch
        }
    });
};

export const createTodoMessage = (data: CreateMessagePayload): Promise<number> => {
    return request<number>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/create`,
        method: 'POST',
        data: data
    });
};

export const deleteTodoMessage = (id: number | string): Promise<boolean> => {
    return request<boolean>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/delete`,
        method: 'POST',
        data: { id: id }
    });
};

export const getTodoMessageDetail = (id: number | string, todoId: number | string): Promise<TodoMessageData> => {
    return request<TodoMessageData>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/getDetail`,
        method: 'GET',
        data: {
            id: id,
            todoId: todoId
        }
    });
};

export const updateTodoMessage = (data: UpdateMessagePayload): Promise<TodoMessageData> => {
    return request<TodoMessageData>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/update`,
        method: 'POST',
        data: data
    });
};

export const reactionTodoMessage = (data: ReactionPayload): Promise<number> => {
    return request<number>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/reaction`,
        method: 'POST',
        data: data
    });
};

export const uploadTodoFile = (filePath: string): Promise<string> => {
    const authStore = useAuthStore();
    
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: `${SERVER_BASE_URL}/api/module-todo/file/upload`,
            filePath: filePath,
            name: 'file',
            header: {
                'Authorization': `Bearer ${authStore.todoToken}`, 
            },
            success: (uploadFileRes) => {
                try {
                    const res = JSON.parse(uploadFileRes.data);
                    if (res.status === 200 && res.data) {
                        resolve(res.data);
                    } else {
                        reject(res.message || 'Upload thất bại');
                    }
                } catch (e) {
                    reject('Lỗi phân tích phản hồi từ server');
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};