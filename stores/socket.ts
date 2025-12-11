// stores/socket.ts
import { defineStore } from 'pinia';
import { WS_BASE_URL } from '@/utils/config';
import { getProjectByCode } from '@/api/project';
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import i18n from '@/locale/index';

interface SocketState {
	socketTask : UniApp.SocketTask | null;
	isConnected : boolean;
	reconnectInterval : any;
	isConnecting : boolean;
	projectNamesCache : Record<string, string>;
	isManualClose : boolean;
}

export const useSocketStore = defineStore('socket', {
	state: () : SocketState => ({
		socketTask: null,
		isConnected: false,
		isConnecting: false,
		reconnectInterval: null,
		projectNamesCache: {},
		isManualClose: false,
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
			this.isManualClose = false;
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
				this.isConnecting = false;

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
				if (!this.isManualClose) {
					if (!this.reconnectInterval) {
						this.reconnectInterval = setInterval(() => {
							console.log('Socket: Reconnecting (Auto)...');
							this.connect();
						}, 5000);
					}
				} else {
					console.log('Socket: Chủ động ngắt kết nối, không reconnect.');
				}
			});
		},
		disconnect() {
			console.log('Socket: Đang thực hiện Cleanup...');
			this.isManualClose = true;

			if (this.reconnectInterval) {
				clearInterval(this.reconnectInterval);
				this.reconnectInterval = null;
			}

			if (this.socketTask) {
				this.socketTask.close({});
				this.socketTask = null;
			}


			this.isConnected = false;
			this.isConnecting = false;

		},
		async handleMessage(msgStr : string) {
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
		getNotificationContent(key : string, params : Record<string, any>) {
			let text = i18n.global.t(key);
			for (const [paramKey, paramValue] of Object.entries(params)) {
				const regex = new RegExp(`{${paramKey}}`, 'g');
				text = text.replace(regex, String(paramValue));
			}

			return text;
		},
		async getGroupName(projectCode : string) : Promise<string> {
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


		async handleNotificationReceived(data : any) {
			const groupName = await this.getGroupName(data.projectCode);
			const content = this.getNotificationContent('socket.received_at', {
				code: data.code || 'N/A',
				title: data.title || '',
				group: groupName,
				date: data.dueDate || ''
			});

			this.showNotificationAlert(content, 'warning');
		},

		async handleReassigned(data : any) {
			const groupName = await this.getGroupName(data.projectCode);

			const content = this.getNotificationContent('socket.reassigned', {
				code: data.code || 'N/A',
				title: data.title || '',
				group: groupName,
				oldData: data.oldData || 'Unknown',
				newData: data.newData || 'Unknown'
			});

			this.showNotificationAlert(content, 'info');
		},

		async handleStatusChanged(data : any) {
			const groupName = await this.getGroupName(data.projectCode);

			const content = this.getNotificationContent('socket.status_changed', {
				code: data.code || 'N/A',
				title: data.title || '',
				group: groupName,
				oldData: data.oldData || 'Unknown',
				newData: data.newData || 'Unknown'
			});

			this.showNotificationAlert(content, 'success');
		},

		async handleTaskAssigned(data : any) {
			const groupName = await this.getGroupName(data.projectCode);

			const content = this.getNotificationContent('socket.task_assigned', {
				code: data.code || 'N/A',
				title: data.title || '',
				group: groupName
			});

			this.showNotificationAlert(content, 'info');
		},

		async handleDueDatePassed(data : any) {
			const groupName = await this.getGroupName(data.projectCode);

			const content = this.getNotificationContent('socket.due_date_passed', {
				code: data.code || 'N/A',
				title: data.title || '',
				group: groupName,
				date: data.dueDate || ''
			});

			this.showNotificationAlert(content, 'error');
		},

		showNotificationAlert(content : string, type : 'info' | 'success' | 'warning' | 'error' = 'info') {
			// #ifdef APP-PLUS
			uni.vibrateShort({});
			// #endif
			const notificationStore = useNotificationStore();
			notificationStore.show(content, type);
		}
	}
});