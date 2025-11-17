// api/auth.js
import { AUTH_TOKEN, FULL_API_URL } from '@/utils/config.js';

export const fetchAppToken = () => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: FULL_API_URL,
            method: 'GET',
            header: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            },
            success: (res) => {
                if (res.statusCode === 200 && res.data?.status === 1) {
                    resolve(res.data.data);
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