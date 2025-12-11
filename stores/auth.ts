
import { defineStore } from 'pinia';
import { systemLogin, getTodoToken } from '@/api/auth';
import { getCrmToken } from '@/api/crm';
import { PROJECT_CODE, UID } from '@/utils/config';

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
    }),

    getters: {
        isLoggedIn: (state) => !!state.todoToken && !!state.crmToken && !!state.sessionId,
        isRootTokenValid: (state) => {
            if (!state.rootToken || !state.rootLoginTime) return false;
            const now = Date.now();
            return (now - state.rootLoginTime) < SEVEN_DAYS_MS;
        }
    },

    actions: {
        setAuthData(data: any) {
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

        async fetchModuleTokens() {
                    try {
                        // Nếu root token hết hạn, gọi login dev mode
                        if (!this.isRootTokenValid) {
                            console.log('Root Token hết hạn, login lại...');
                            await this.loginDevMode(); 
                            // loginDevMode sẽ tự gọi lại setAuthData để cập nhật rootToken mới
                            // Sau đó code sẽ chạy tiếp xuống dưới
                        }
        
                        console.log('Store: Đang lấy Token cho Todo và CRM...');
                        
                        // Quan trọng: Phải đảm bảo rootToken đã được cập nhật trước khi gọi dòng này
                        const [newTodoToken, newCrmToken] = await Promise.all([
                            getTodoToken(this.rootToken, this.projectCode, this.uid),
                            getCrmToken(this.projectCode, this.uid)
                        ]);
        
                        this.setAuthData({ 
                            todoToken: newTodoToken,
                            crmToken: newCrmToken
                        });
                        
                        console.log('✅ Store: Đã lấy đủ Token (Todo & CRM).');
                    } catch (error) {
                        console.error('❌ Store: Lỗi lấy module tokens:', error);
                        this.logout();
                        throw error;
                    }
                },
        async loginDevMode() {
            const devUser = import.meta.env.VITE_TEST_USERNAME;
            const devPass = import.meta.env.VITE_TEST_PASSWORD;
            const devUid = import.meta.env.VITE_UID;
            const devProject = import.meta.env.VITE_PROJECT_CODE;

            if (!devUser || !devPass) {
                console.warn('Chưa cấu hình tài khoản Dev trong .env');
                return;
            }

            try {
                console.log('Store: Đang gọi API đăng nhập hệ thống...');
                const loginData = await systemLogin(devUser, devPass);
    
                this.setAuthData({
                    rootToken: loginData.access_token,
                    uid: devUid,
                    projectCode: devProject,
					sessionId: loginData.session_id,
                });

                // await this.fetchModuleTokens();
            } catch (error) {
                console.error('Store: Đăng nhập Dev thất bại', error);
				throw error; 
            }
        },

        async initialize(options: any) {
                    console.log('🚀 Store: Khởi tạo Auth...');
                    
                    // 1. Nếu đã đủ token thì thôi
                    if (this.todoToken && this.crmToken && this.sessionId) {
                        console.log('>> Đã có đủ Token cũ. Ready!');
                        return; 
                    }
        
                    // 2. Nếu thiếu token nhưng root còn hạn -> Refresh token con
                    // Hoặc root hết hạn -> Login lại từ đầu
                    // Gọi hàm exchangeForTodoToken đã có cơ chế khóa (locking)
                    await this.exchangeForTodoToken();
                },
async exchangeForTodoToken() {
            if (this.refreshPromise) {
                console.log('🔄 Đang có tiến trình refresh token, vui lòng chờ...');
                return this.refreshPromise;
            }

            this.refreshPromise = this.fetchModuleTokens().finally(() => {
                this.refreshPromise = null;
            });

            return this.refreshPromise;
        },
        logout() {
            console.log('Store: Đăng xuất...');
            this.rootToken = '';
            this.rootLoginTime = 0;
            this.todoToken = '';
            this.crmToken = '';
			this.refreshPromise = null;
            uni.removeStorageSync('crm_access_token');
            uni.removeStorageSync('todo_access_token');
            uni.removeStorageSync('vbot_root_token');
            uni.removeStorageSync('vbot_root_login_time');
			uni.removeStorageSync('vbot_session_id');
        }
    }
});