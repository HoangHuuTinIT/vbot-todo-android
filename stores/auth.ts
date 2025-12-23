import { defineStore } from 'pinia';
import { getTodoToken } from '@/api/auth';
import { getCrmToken } from '@/api/crm';
import { useSocketStore } from '@/stores/socket';
import { changeLanguage } from '@/utils/language';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const useAuthStore = defineStore('auth', {
	state: () => ({
		rootToken: uni.getStorageSync('vbot_root_token') || '',
		rootLoginTime: uni.getStorageSync('vbot_root_login_time') || 0,
		sessionId: uni.getStorageSync('vbot_session_id') || '',
		todoToken: uni.getStorageSync('todo_access_token') || '',
		crmToken: uni.getStorageSync('crm_access_token') || '',
		uid: uni.getStorageSync('vbot_uid') || '',
		projectCode: uni.getStorageSync('vbot_project_code') || '',
		refreshPromise: null as Promise<void> | null,
		themeMode: uni.getStorageSync('app_theme_mode') || 'auto',
		// MỚI: Lưu trạng thái thực tế đang hiển thị (true = dark, false = light)
		isActualDark: false
	}),

	getters: {
		isLoggedIn: (state) => !!state.todoToken && !!state.crmToken && !!state.sessionId,
		isDark: (state) => state.isActualDark,
		isRootTokenValid: (state) => {
			if (!state.rootToken) return false;
			if (!state.rootLoginTime) return true;
			const now = Date.now();
			return (now - state.rootLoginTime) < SEVEN_DAYS_MS;
		}
	},

	actions: {
		setAuthData(data : any) {
			if (data.rootToken) {
				this.rootToken = data.rootToken;
				uni.setStorageSync('vbot_root_token', data.rootToken);
				this.rootLoginTime = Date.now();
				uni.setStorageSync('vbot_root_login_time', this.rootLoginTime);
			}
			if (data.sessionId) {
				this.sessionId = data.sessionId;
				uni.setStorageSync('vbot_session_id', data.sessionId);
			}
			if (data.uid) {
				this.uid = data.uid;
				uni.setStorageSync('vbot_uid', data.uid);
			}
			if (data.projectCode) {
				this.projectCode = data.projectCode;
				uni.setStorageSync('vbot_project_code', data.projectCode);
			}
			if (data.todoToken) {
				this.todoToken = data.todoToken;
				uni.setStorageSync('todo_access_token', data.todoToken);
			}
			if (data.crmToken) {
				this.crmToken = data.crmToken;
				uni.setStorageSync('crm_access_token', data.crmToken);
			}
		},
		applyTheme(mode : string) {
			this.themeMode = mode;
			uni.setStorageSync('app_theme_mode', mode);
			if (mode === 'dark') {
				this.isActualDark = true;
			} else if (mode === 'light') {
				this.isActualDark = false;
			} else {
				// AUTO: Lấy theo hệ thống máy
				const sysInfo = uni.getSystemInfoSync();
				// osTheme có thể trả về 'dark' hoặc 'light' (tuỳ phiên bản UniApp/Android)
				this.isActualDark = (sysInfo.osTheme === 'dark' || sysInfo.hostTheme === 'dark');
			}
			console.log(`🎨 Theme applied: Mode=${mode}, ActualDark=${this.isActualDark}`);
		},
		async initFromNative(nativeData : any) {
			console.log('Store: Nhận dữ liệu từ Native Android', nativeData);

			if (!nativeData || !nativeData.uid || !nativeData.access_token) {
				console.error('Dữ liệu từ Native bị thiếu!');
				return;
			}
			if (nativeData.language) {
				console.log("🌍 Native yêu cầu ngôn ngữ:", nativeData.language);
				if (nativeData.language === 'en' || nativeData.language === 'vi') {
					changeLanguage(nativeData.language);
				}
			}
			if (nativeData.themeMode) {
				this.applyTheme(nativeData.themeMode);
			}
			if (this.rootToken && this.rootToken !== nativeData.access_token) {
				console.warn('Store: Phát hiện Token gốc thay đổi -> Đang dọn dẹp dữ liệu phiên cũ...');
				const socketStore = useSocketStore();
				socketStore.disconnect();
				this.todoToken = '';
				this.crmToken = '';
				this.sessionId = '';
				uni.removeStorageSync('todo_access_token');
				uni.removeStorageSync('crm_access_token');
				uni.removeStorageSync('vbot_session_id');
			}
			this.setAuthData({
				uid: nativeData.uid,
				rootToken: nativeData.access_token,
				projectCode: nativeData.projectCode,
				sessionId: nativeData.session_id
			});
			await this.fetchModuleTokens();
		},

		async fetchModuleTokens() {
			try {
				if (!this.rootToken || !this.projectCode || !this.uid) {
					console.error('Thiếu thông tin để lấy Module Token');
					return;
				}

				console.log('Store: Đang lấy Token cho Todo và CRM...');

				const [newTodoToken, newCrmToken] = await Promise.all([
					getTodoToken(this.rootToken, this.projectCode, this.uid),
					getCrmToken(this.projectCode, this.uid)
				]);

				this.setAuthData({
					todoToken: newTodoToken,
					crmToken: newCrmToken
				});

				console.log('Store: Đã lấy đủ Token (Todo & CRM).');
			} catch (error) {
				console.error('Store: Lỗi lấy module tokens:', error);
				this.logout();
				throw error;
			}
		},
		async exchangeForTodoToken() {
			if (this.refreshPromise) {
				return this.refreshPromise;
			}
			this.refreshPromise = this.fetchModuleTokens().finally(() => {
				this.refreshPromise = null;
			});
			return this.refreshPromise;
		},

		logout() {
			console.log('Store: Đăng xuất...');
			const socketStore = useSocketStore();
			socketStore.disconnect();

			this.rootToken = '';
			this.todoToken = '';
			this.crmToken = '';
			this.sessionId = '';

			uni.clearStorageSync();
		}
	}
});