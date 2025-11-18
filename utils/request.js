// utils/request.js

export const request = (options) => {
    return new Promise((resolve, reject) => {
        // Lấy Token dành riêng cho Todo mà App.vue đã lưu
        const todoToken = uni.getStorageSync('todo_access_token');
        
        // Fallback: Nếu chưa có token Todo thì lấy tạm Root token (đề phòng)
        // Hoặc bạn có thể chặn luôn nếu không có todoToken
        const rootToken = uni.getStorageSync('vbot_root_token');
        const finalToken = todoToken || rootToken;

        if (!finalToken) {
            console.warn('Chưa có Token nào cả!');
        }

        uni.request({
            url: options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header: {
                'Authorization': `Bearer ${finalToken}`, // Luôn gửi kèm Token
                'Content-Type': 'application/json',
                ...options.header
            },
            success: (res) => {
                // Check logic thành công của API Todo (thường là errorCode === 0)
                if (res.statusCode === 200) {
                    resolve(res.data.data); // Trả về data bên trong
                } else {
                    reject(res.data);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};