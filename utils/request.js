// utils/request.js
import { AUTH_TOKEN } from '@/utils/config.js';

export const request = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header: {
                'Authorization': `Bearer ${AUTH_TOKEN}`, // Dùng token cứng từ config
                'Content-Type': 'application/json',
                ...options.header
            },
            success: (res) => {
                // Xử lý response chuẩn
                if (res.statusCode === 200 && res.data?.errorCode === 0) {
                    resolve(res.data.data);
                } else {
                    console.error(`[API Error] ${options.url}:`, res.data);
                    reject(res.data);
                }
            },
            fail: (err) => {
                console.error('[Network Error]:', err);
                reject(err);
            }
        });
    });
};