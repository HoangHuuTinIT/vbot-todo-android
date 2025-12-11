// stores/socket.ts
import { defineStore } from 'pinia';
import { WS_BASE_URL } from '@/utils/config';
import { getProjectByCode } from '@/api/project';
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';
import { useNotificationStore } from '@/stores/notification';
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
			const content = `Công việc <span class="highlight">${data.code}</span> | <b>${data.title}</b> ở nhóm <b>${groupName}</b> sẽ hết hạn vào ${data.dueDate}. Vui lòng kiểm tra!`;

			this.showNotificationAlert(content, 'warning');
		},


		async handleReassigned(data : any) {
			const groupName = await this.getGroupName(data.projectCode);
			const content = `Công việc <span class="highlight">${data.code}</span> | <b>${data.title}</b> ở nhóm <b>${groupName}</b> đã đổi người phụ trách: <b>${data.oldData}</b> ➝ <span class="highlight">${data.newData}</span>`;

			this.showNotificationAlert(content, 'info');
		},


		async handleStatusChanged(data : any) {
			const groupName = await this.getGroupName(data.projectCode);
			const content = `Công việc <span class="highlight">${data.code}</span> | <b>${data.title}</b> ở nhóm <b>${groupName}</b> trạng thái mới: <b>${data.oldData}</b> ➝ <span class="highlight">${data.newData}</span>`;

			this.showNotificationAlert(content, 'success');
		},


		async handleTaskAssigned(data : any) {
			const groupName = await this.getGroupName(data.projectCode);
			const content = `Bạn có công việc mới: <span class="highlight">${data.code}</span> | <b>${data.title}</b> ở nhóm <b>${groupName}</b>`;

			this.showNotificationAlert(content, 'info');
		},

		async handleDueDatePassed(data : any) {
			const groupName = await this.getGroupName(data.projectCode);
			const content = `Công việc <span class="highlight">${data.code}</span> | <b>${data.title}</b> ở nhóm <b>${groupName}</b> đã hết hạn vào ${data.dueDate}. Xử lý ngay!`;

			this.showNotificationAlert(content, 'error');
		},
		showNotificationAlert(content : string, type : 'info' | 'success' | 'warning' | 'error' = 'info') {
			// // Rung nhẹ điện thoại
			// // #ifdef APP-PLUS
			// uni.vibrateShort({});
			// // #endif
			const notificationStore = useNotificationStore();
			notificationStore.show(content, type);
		}
	}
});