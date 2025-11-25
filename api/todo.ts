import { request } from '@/utils/request';
import { mapTodoFromApi } from '@/models/todo';
import { PROJECT_CODE, TODO_API_URL, SERVER_BASE_URL } from '@/utils/config';

// Import Types
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

// 1. Lấy danh sách Todo
// [SỬA]: request trả về thẳng Array, không qua ApiResponse nữa
export const getTodos = async (params: Partial<GetTodoParams>): Promise<TodoItem[]> => {
    const response = await request<TodoItem[]>({
        url: `${TODO_API_URL}/getAll`,
        method: 'GET',
        data: {
            projectCode: PROJECT_CODE,
            pageNo: 1,
            pageSize: 15,
            ...params
        }
    });

    // Kiểm tra trực tiếp response có phải là Array không
    if (Array.isArray(response)) {
        return response.map((item) => mapTodoFromApi(item));
    }
    return [];
};

// 2. Đếm số lượng
// [SỬA]: request trả về thẳng số (number)
export const getTodoCount = async (params: Partial<GetTodoParams>): Promise<number> => {
    const response = await request<number>({
        url: `${TODO_API_URL}/countAll`,
        method: 'GET',
        data: {
            projectCode: PROJECT_CODE,
            ...params
        }
    });
    return Number(response) || 0;
};

// 3. Tạo công việc
// [SỬA]: Server trả về ID (number)
export const createTodo = (data: CreateTodoPayload): Promise<number> => {
    return request<number>({
        url: `${TODO_API_URL}/create`,
        method: 'POST',
        data: data
    });
};

// 4. Xóa công việc
export const deleteTodo = (id: string | number): Promise<boolean> => {
    return request<boolean>({
        url: `${TODO_API_URL}/delete`,
        method: 'POST',
        data: { id: id }
    });
};

// 5. Chi tiết công việc
// [SỬA]: Server trả về Object TodoItem
export const getTodoDetail = (id: string | number): Promise<TodoItem> => {
    return request<TodoItem>({
        url: `${TODO_API_URL}/getDetail`,
        method: 'GET',
        data: {
            id: id,
            projectCode: PROJECT_CODE
        }
    });
};

// 6. Cập nhật công việc
export const updateTodo = (data: UpdateTodoPayload): Promise<number> => {
    return request<number>({
        url: `${TODO_API_URL}/update`,
        method: 'POST',
        data: data
    });
};

// --- TODO MESSAGES ---

// 7. Lấy danh sách tin nhắn
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

// 8. Tạo tin nhắn
export const createTodoMessage = (data: CreateMessagePayload): Promise<number> => {
    return request<number>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/create`,
        method: 'POST',
        data: data
    });
};

// 9. Xóa tin nhắn
export const deleteTodoMessage = (id: number | string): Promise<boolean> => {
    return request<boolean>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/delete`,
        method: 'POST',
        data: { id: id }
    });
};

// 10. Chi tiết tin nhắn
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

// 11. Cập nhật tin nhắn
export const updateTodoMessage = (data: UpdateMessagePayload): Promise<TodoMessageData> => {
    return request<TodoMessageData>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/update`,
        method: 'POST',
        data: data
    });
};

// 12. Thả tim
export const reactionTodoMessage = (data: ReactionPayload): Promise<number> => {
    return request<number>({
        url: `${SERVER_BASE_URL}/api/module-todo/todoMessages/reaction`,
        method: 'POST',
        data: data
    });
};