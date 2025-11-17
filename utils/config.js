// utils/config.js

// Lấy giá trị từ .env (Giữ nguyên Hardcode theo ý bạn)
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN; // Token cứng
export const PROJECT_CODE = import.meta.env.VITE_PROJECT_CODE;
export const UID = import.meta.env.VITE_UID;

// Ghép chuỗi URL đầy đủ (Logic cũ của bạn)
export const FULL_API_URL = `${BASE_URL}?projectCode=${PROJECT_CODE}&uid=${UID}&type=TODO&source=Desktop-RTC`;