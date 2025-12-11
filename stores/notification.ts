import { defineStore } from 'pinia';

interface NotificationItem {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    duration: number;
}

interface NotificationState {
    visible: boolean;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    queue: NotificationItem[]; 
    timeoutId: any;
    isAnimating: boolean; 
}

export const useNotificationStore = defineStore('notification', {
    state: (): NotificationState => ({
        visible: false,
        message: '',
        type: 'info',
        queue: [],
        timeoutId: null,
        isAnimating: false,
    }),
    
    actions: {
        show(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', duration = 7000) {
            this.queue.push({ message, type, duration });
            if (!this.visible && !this.isAnimating) {
                this.processQueue();
            }
        },
        processQueue() {
            if (this.queue.length === 0) return;
            const nextItem = this.queue.shift();
            if (!nextItem) return;
            this.message = nextItem.message;
            this.type = nextItem.type;
            this.visible = true;
            if (this.timeoutId) clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.hide();
            }, nextItem.duration);
        },

        hide() {
            if (!this.visible) return;

            this.visible = false;
            this.isAnimating = true; 

            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
            setTimeout(() => {
                this.isAnimating = false;
                this.processQueue();
            }, 450);
        }
    }
});