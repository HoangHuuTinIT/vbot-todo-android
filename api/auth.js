// api/auth.js
import { request } from '@/utils/request.js';

// 1. API Đăng nhập hệ thống (Chỉ dùng cho Dev Mode / Localhost)
export const systemLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: 'https://api-staging.vbot.vn/v1.0/token', // API Auth gốc
            method: 'POST',
            header: { 'Content-Type': 'application/x-www-form-urlencoded' }, // API token thường dùng form-urlencoded
            data: {
                username: username,
                password: password,
                grant_type: 'password',
                type_account: 0, // Hoặc giá trị mặc định của bạn
                source: 'Desktop-RTC'
                // Các field khác nếu cần fix cứng: firebase_token, token_call...
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data.access_token) {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            },
            fail: (err) => reject(err)
        });
    });
};

// 2. API Lấy Token riêng cho module Todo (Quan trọng)
export const getTodoToken = (rootToken, projectCode, uid) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: `https://api-staging.vbot.vn/v1.0/api/module-crm/token`,
            method: 'GET',
            data: {
                projectCode: projectCode,
                uid: uid,
                type: 'TODO',
                source: 'Desktop-RTC'
            },
            header: {
                // QUAN TRỌNG: Dùng Token Gốc để xin Token Con
                'Authorization': `Bearer ${rootToken}` 
            },
            success: (res) => {
                // API trả về data bọc trong data: { status: 1, data: { token: '...' } }
                if (res.data && res.data.data && res.data.data.token) {
                    resolve(res.data.data.token);
                } else {
                    reject(res.data);
                }
            },
            fail: (err) => reject(err)
        });
    });
};