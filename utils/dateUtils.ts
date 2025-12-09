// utils/dateUtils.ts

export const formatRelativeTime = (timestamp: number | null): string => {
    if (!timestamp) return '';
    const now = Date.now();
    const diff = now - timestamp;
    if (diff < 60000) return 'Vừa xong';
    if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} phút trước`;
    }
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} giờ trước`;
    }
    const date = new Date(timestamp);
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    const h = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${d}/${m}/${y} ${h}:${min}`;
};

export const formatDateDisplay = (dateStr: string): string => {
    if (!dateStr) return '';
    try {
        if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                const [year, month, day] = parts;
                return `${day}/${month}/${year}`;
            }
        }
        return dateStr;
    } catch (e) {
        return dateStr;
    }
};


const parseSafeDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
   
    const safeStr = dateStr.replace(/-/g, '/');
    const d = new Date(safeStr);
    return isNaN(d.getTime()) ? null : d;
}

export const getStartOfDay = (dateStr: string): number => {
    const d = parseSafeDate(dateStr);
    if (!d) return -1; 
    d.setHours(0, 0, 0, 0);
    return d.getTime();
};

export const getStartOfNextDay = (dateStr: string): number => {
    const d = parseSafeDate(dateStr);
    if (!d) return -1;
    
   
    d.setDate(d.getDate() + 1);
   
    d.setHours(0, 0, 0, 0);
    
    return d.getTime();
};

export const convertDateRangeToValue = (startDate: string, endDate: string): string => {
    if (!startDate && !endDate) return "";
    const startTs = getStartOfDay(startDate);
    const endTs = getStartOfNextDay(endDate); 
    if (startTs === -1 && endTs === -1) return "";
    const s = startTs === -1 ? '' : startTs;
    const e = endTs === -1 ? '' : endTs;
    return `${s}|${e}`;
};