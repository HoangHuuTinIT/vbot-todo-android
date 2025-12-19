// utils/dateUtils.ts
export const formatRelativeTime = (timestamp : number | null, t ?: any) : string => {
	if (!timestamp) return '';
	const now = Date.now();
	const diff = now - timestamp;
	const translate = (key : string, value ?: number) => {
		let text = '';
		if (t) {
			text = t(key);
		} else {
			if (key === 'common.time_just_now') return 'Vừa xong';
			if (key === 'common.time_minutes_ago') text = '{n} phút trước';
			if (key === 'common.time_hours_ago') text = '{n} giờ trước';
		}
		if (value !== undefined) {
			return text.replace('{n}', String(value));
		}

		return text;
	};

	if (diff < 60000) return translate('common.time_just_now');

	if (diff < 3600000) {
		const minutes = Math.floor(diff / 60000);
		return translate('common.time_minutes_ago', minutes);
	}

	if (diff < 86400000) {
		const hours = Math.floor(diff / 3600000);
		return translate('common.time_hours_ago', hours);
	}
	const date = new Date(timestamp);
	const d = date.getDate().toString().padStart(2, '0');
	const m = (date.getMonth() + 1).toString().padStart(2, '0');
	const y = date.getFullYear();
	const h = date.getHours().toString().padStart(2, '0');
	const min = date.getMinutes().toString().padStart(2, '0');
	return `${d}/${m}/${y} ${h}:${min}`;
};

export const formatDateDisplay = (dateStr : string) : string => {
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


const parseSafeDate = (dateStr : string) : Date | null => {
	if (!dateStr) return null;

	const safeStr = dateStr.replace(/-/g, '/');
	const d = new Date(safeStr);
	return isNaN(d.getTime()) ? null : d;
}

export const getStartOfDay = (dateStr : string) : number => {
	const d = parseSafeDate(dateStr);
	if (!d) return -1;
	d.setHours(0, 0, 0, 0);
	return d.getTime();
};

export const getStartOfNextDay = (dateStr : string) : number => {
	const d = parseSafeDate(dateStr);
	if (!d) return -1;


	d.setDate(d.getDate() + 1);

	d.setHours(0, 0, 0, 0);

	return d.getTime();
};

export const convertDateRangeToValue = (startDate : string, endDate : string) : string => {
	if (!startDate && !endDate) return "";
	const startTs = getStartOfDay(startDate);
	const endTs = getStartOfNextDay(endDate);
	if (startTs === -1 && endTs === -1) return "";
	const s = startTs === -1 ? '' : startTs;
	const e = endTs === -1 ? '' : endTs;
	return `${s}|${e}`;
};

export const getMinuteTimestamp = (dateStr : string) : number => {
	if (!dateStr) return 0;
	const d = new Date(dateStr.replace(/-/g, '/'));
	if (isNaN(d.getTime())) return 0;

	d.setSeconds(0);
	d.setMilliseconds(0);
	return d.getTime();
};

export const validateNotifyAndDueDate = (dueDateStr : string, notifyDateStr : string) : boolean => {
	const dueTime = getMinuteTimestamp(dueDateStr);
	const notifyTime = getMinuteTimestamp(notifyDateStr);
	if (!dueTime || !notifyTime) return true;
	if (notifyTime >= dueTime) {
		return false;
	}
	return true;
};

export const timestampToDateTimeStr = (ts : number) : string => {
	if (!ts || ts <= 0) return '';
	try {
		const date = new Date(ts);
		const y = date.getFullYear();
		const m = (date.getMonth() + 1).toString().padStart(2, '0');
		const d = date.getDate().toString().padStart(2, '0');
		const h = date.getHours().toString().padStart(2, '0');
		const min = date.getMinutes().toString().padStart(2, '0');
		return `${y}-${m}-${d} ${h}:${min}:00`;
	} catch { return ''; }
};