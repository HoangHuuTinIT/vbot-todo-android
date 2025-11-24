// src/utils/dateUtils.ts (Tạo file mới nếu chưa có)

export const formatRelativeTime = (timestamp: number | null): string => {
    if (!timestamp) return '';
    
    const now = Date.now();
    const diff = now - timestamp;
    
    // Dưới 1 phút
    if (diff < 60000) return 'Vừa xong';
    
    // Dưới 1 giờ
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} phút trước`;
    }
    
    // Dưới 24 giờ
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} giờ trước`;
    }
    
    // Quá 1 ngày -> Hiển thị ngày tháng năm giờ phút
    const date = new Date(timestamp);
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    const h = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    
    return `${d}/${m}/${y} ${h}:${min}`;
};