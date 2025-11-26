export type ToastType = 'success' | 'error' | 'warning' | 'info';
export const showMessage = (message: string, type: ToastType = 'success') => {
    uni.$emit('app-toast-show', { message, type });
};
export const showSuccess = (msg: string) => showMessage(msg, 'success');
export const showError = (msg: string) => showMessage(msg, 'error');
export const showInfo = (msg: string) => showMessage(msg, 'info');
export const showWarning = (msg: string) => showMessage(msg, 'warning');

export const showLoading = (title = 'Đang xử lý...') => uni.showLoading({ title, mask: true });
export const hideLoading = () => uni.hideLoading();