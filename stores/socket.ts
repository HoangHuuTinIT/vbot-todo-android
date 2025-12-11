// stores/socket.ts
import { defineStore } from 'pinia';
import { WS_BASE_URL } from '@/utils/config';
import { getProjectByCode } from '@/api/project';
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';
interface SocketState {
    socketTask: UniApp.SocketTask | null;
    isConnected: boolean;
    reconnectInterval: any;
	isConnecting: boolean;
    projectNamesCache: Record<string, string>; 
}

export const useSocketStore = defineStore('socket', {
    state: (): SocketState => ({
        socketTask: null,
        isConnected: false,
		isConnecting: false,
        reconnectInterval: null,
        projectNamesCache: {}
    }),

    actions: {
		initWatcher() {
		            const authStore = useAuthStore();
		            watch(() => authStore.sessionId, (newVal) => {
		                if (newVal && !this.isConnected) {
		                    console.log('Socket: Phát hiện Session ID mới, đang kết nối...');
		                    this.connect();
		                }
		            });
		},
        connect() {
                   
                    if (this.isConnected || this.isConnecting) return;
					const authStore = useAuthStore();
					            const sessionId = authStore.sessionId;
					            if (!sessionId) {
					                return;
					            }
                    this.isConnecting = true; 
        
                    const url = `${WS_BASE_URL}?session_id=${sessionId}`;
                    console.log('Socket: Connecting to...', url);
        
                    this.socketTask = uni.connectSocket({
                        url: url,
                        success: () => console.log('Socket: Init success'),
                        fail: (err) => {
                            console.error('Socket: Init failed', err);
                            this.isConnecting = false; 
                        }
                    });
        
                    this.socketTask.onOpen(() => {
                        console.log('Socket: Connected!');
                        this.isConnected = true;
                        this.isConnecting = false; // <--- Kết nối xong thì tắt cờ
                        
                        if (this.reconnectInterval) {
                            clearInterval(this.reconnectInterval);
                            this.reconnectInterval = null;
                        }
                    });
        
                    this.socketTask.onMessage((res) => {
                        this.handleMessage(res.data);
                    });
        
                    this.socketTask.onError((err) => {
                        console.error('Socket Error:', err);
                        this.isConnected = false;
                        this.isConnecting = false; 
                    });
        
                    this.socketTask.onClose(() => {
                        console.log('Socket: Closed');
                        this.isConnected = false;
                        this.isConnecting = false; 
                        this.socketTask = null;
                        
                        if (!this.reconnectInterval) {
                            this.reconnectInterval = setInterval(() => {
                                console.log('Socket: Reconnecting...');
                                this.connect();
                            }, 5000);
                        }
                    });
                },

        async handleMessage(msgStr: string) {
            try {
                const msg = JSON.parse(msgStr);
                if (msg.module !== 'TODO') return;

                console.log('Socket Received Event:', msg.eventName, msg);

                switch (msg.eventName) {
                    case 'TODO_NOTIFICATION_RECEIVED_AT':
                        await this.handleNotificationReceived(msg.data);
                        break;
                    case 'TODO_REASSIGNED':
                        await this.handleReassigned(msg.data);
                        break;
                    case 'TODO_STATUS_CHANGED':
                        await this.handleStatusChanged(msg.data);
                        break;
                    case 'TODO_TASK_ASSIGNED':
                        await this.handleTaskAssigned(msg.data);
                        break;
                    case 'TODO_NOTIFICATION_DUE_DATE_PASSED':
                        await this.handleDueDatePassed(msg.data);
                        break;
                    default:
                        break;
                }

            } catch (e) {
                console.error('Socket: Parse message error', e);
            }
        },

        async getGroupName(projectCode: string): Promise<string> {
            if (!projectCode) return 'Nhóm không xác định';

            if (this.projectNamesCache[projectCode]) {
                return this.projectNamesCache[projectCode];
            }

            try {
                const res = await getProjectByCode(projectCode);

                const name = res?.Name || res?.data?.Name || projectCode;
                
    
                this.projectNamesCache[projectCode] = name;
                return name;
            } catch (error) {
                console.error('Lỗi lấy tên nhóm:', error);
                return projectCode; 
            }
        },


        async handleNotificationReceived(data: any) {
            const groupName = await this.getGroupName(data.projectCode);
            const content = `Công việc ${data.code} | ${data.title} ở nhóm ${groupName} sẽ hết hạn vào ${data.dueDate}. Vui lòng kiểm tra và xử lý trước thời hạn.`;
            
            this.showNotificationAlert(content);
        },

   
        async handleReassigned(data: any) {
            const groupName = await this.getGroupName(data.projectCode);
            const content = `Công việc ${data.code} | ${data.title} ở nhóm ${groupName} đã được thay đổi người phụ trách: ${data.oldData} -> ${data.newData}`;
            
            this.showNotificationAlert(content);
        },

  
        async handleStatusChanged(data: any) {
            const groupName = await this.getGroupName(data.projectCode);
            const content = `Công việc ${data.code} | ${data.title} ở nhóm ${groupName} đã được cập nhật trạng thái : ${data.oldData} -> ${data.newData}`;
            
            this.showNotificationAlert(content);
        },

    
        async handleTaskAssigned(data: any) {
            const groupName = await this.getGroupName(data.projectCode);
            const content = `Bạn có công việc mới: ${data.code} | ${data.title} ở nhóm ${groupName}`;
            
            this.showNotificationAlert(content);
        },

        async handleDueDatePassed(data: any) {
            const groupName = await this.getGroupName(data.projectCode);
            const content = `Công việc ${data.code} | ${data.title} ở nhóm ${groupName} đã hết hạn vào ${data.dueDate}. Vui lòng kiểm tra và xử lý ngay.`;
            
            this.showNotificationAlert(content);
        },

        showNotificationAlert(content: string) {
            // // Rung nhẹ điện thoại (nếu trên app)
            // // #ifdef APP-PLUS
            // uni.vibrateLong({});
            // // #endif

            uni.showModal({
                title: 'Thông báo',
                content: content,
                showCancel: false,
                confirmText: 'Đã hiểu',
                success: () => {
                }
            });
        }
    }
});