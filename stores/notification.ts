// stores/notification.ts
import { defineStore } from 'pinia';

interface NotificationState {
    visible: boolean;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timeoutId: any;
}

export const useNotificationStore = defineStore('notification', {
    state: (): NotificationState => ({
        visible: false,
        message: '',
        type: 'info',
        timeoutId: null,
    }),
    actions: {
        show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration = 10000) {
            if (this.timeoutId) clearTimeout(this.timeoutId);

            this.message = message;
            this.type = type;
            this.visible = true;
            this.timeoutId = setTimeout(() => {
                this.hide();
            }, duration);
        },
        hide() {
            this.visible = false;
            this.timeoutId = null;
        }
    }
});