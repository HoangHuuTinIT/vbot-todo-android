// src/stores/auth.ts
import { defineStore } from 'pinia';
import { systemLogin, getTodoToken } from '@/api/auth';
import { getCrmToken } from '@/api/crm';
import { PROJECT_CODE, UID } from '@/utils/config';

// Hằng số: 7 ngày tính bằng mili giây
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const useAuthStore = defineStore('auth', {
    // 1. STATE
    state: () => ({
        rootToken: uni.getStorageSync('vbot_root_token') || '',
        // [MỚI] Lưu thời điểm lấy Root Token để tính hạn 7 ngày
        rootLoginTime: uni.getStorageSync('vbot_root_login_time') || 0, 
        
        todoToken: uni.getStorageSync('todo_access_token') || '',
        crmToken: uni.getStorageSync('crm_access_token') || '',
        uid: uni.getStorageSync('vbot_uid') || '',
        projectCode: uni.getStorageSync('vbot_project_code') || '',
    }),

    // 2. GETTERS
    getters: {
        isLoggedIn: (state) => !!state.todoToken && !!state.crmToken,
        
        // [MỚI] Kiểm tra Root Token còn hạn 7 ngày không
        isRootTokenValid: (state) => {
            if (!state.rootToken || !state.rootLoginTime) return false;
            const now = Date.now();
            // Nếu thời gian hiện tại trừ thời gian đăng nhập nhỏ hơn 7 ngày -> Còn hạn
            return (now - state.rootLoginTime) < SEVEN_DAYS_MS;
        }
    },

    // 3. ACTIONS
    actions: {
        setAuthData(data: any) {
            // Lưu Root Token + Thời gian đăng nhập
            if (data.rootToken) {
                this.rootToken = data.rootToken;
                uni.setStorageSync('vbot_root_token', data.rootToken);
                
                // Lưu mốc thời gian hiện tại
                this.rootLoginTime = Date.now();
                uni.setStorageSync('vbot_root_login_time', this.rootLoginTime);
            }

            if (data.uid) {
                this.uid = data.uid;
                uni.setStorageSync('vbot_uid', data.uid);
            }
            if (data.projectCode) {
                this.projectCode = data.projectCode;
                uni.setStorageSync('vbot_project_code', data.projectCode);
            }

            // Lưu Todo Token (Token riêng module)
            if (data.todoToken) {
                this.todoToken = data.todoToken;
                uni.setStorageSync('todo_access_token', data.todoToken);
                // Không cần set expiry cho todoToken nữa vì nó "bất tử"
            }
			if (data.crmToken) {
			                this.crmToken = data.crmToken;
			                uni.setStorageSync('crm_access_token', data.crmToken);
			            }
        },

        // Đổi Root Token lấy Todo Token
        async fetchModuleTokens() {
                    try {
                        if (!this.isRootTokenValid) {
                            console.log('⚠️ Root Token hết hạn, login lại...');
                            await this.loginDevMode();
                            return;
                        }
        
                        console.log('🔄 Store: Đang lấy Token cho Todo và CRM...');
                        
                        // Gọi song song 2 API để tiết kiệm thời gian
                        const [newTodoToken, newCrmToken] = await Promise.all([
                            getTodoToken(this.rootToken, this.projectCode, this.uid),
                            getCrmToken(this.projectCode, this.uid)
                        ]);
        
                        // Lưu cả 2 vào store
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
        // Đăng nhập hệ thống (Lấy Root Token)
        async loginDevMode() {
            const devUser = import.meta.env.VITE_TEST_USERNAME;
            const devPass = import.meta.env.VITE_TEST_PASSWORD;
            const devUid = import.meta.env.VITE_UID;
            const devProject = import.meta.env.VITE_PROJECT_CODE;

            if (!devUser || !devPass) {
                console.warn('⚠️ Chưa cấu hình tài khoản Dev trong .env');
                return;
            }

            try {
                console.log('🛠 Store: Đang gọi API đăng nhập hệ thống...');
                const loginData = await systemLogin(devUser, devPass);
                
                // Lưu thông tin Root (setAuthData sẽ tự lưu rootLoginTime)
                this.setAuthData({
                    rootToken: loginData.access_token,
                    uid: devUid,
                    projectCode: devProject
                });

                // Sau khi có Root mới -> Lấy Todo Token
                await this.fetchModuleTokens();
            } catch (error) {
                console.error('❌ Store: Đăng nhập Dev thất bại', error);
            }
        },

        // --- HÀM CHÍNH: Logic thông minh ---
        async initialize(options: any) {
                    console.log('🚀 Store: Khởi tạo Auth...');
        
                    // CASE 1: Đã có đủ cả 2 token -> Dùng luôn
                    if (this.todoToken && this.crmToken) {
                        console.log('>> ✅ Đã có đủ Token cũ. Ready!');
                        return; 
                    }
        
                    // CASE 2: Thiếu token nào đó nhưng Root còn hạn -> Lấy lại cả 2
                    if (this.isRootTokenValid) {
                        console.log('>> ⚠️ Thiếu token module, đang lấy lại...');
                        await this.fetchModuleTokens();
                        return;
                    }
        
                    // CASE 3: Login lại từ đầu
                    console.log('>> ❌ Root Token hết hạn. Login lại...');
                    await this.loginDevMode();
                },
async exchangeForTodoToken() {
            // Thực chất là gọi lại hàm lấy cả 2 token
            await this.fetchModuleTokens();
        },
        logout() {
            console.log('👋 Store: Đăng xuất...');
            this.rootToken = '';
            this.rootLoginTime = 0;
            this.todoToken = '';
            this.crmToken = '';
                        uni.removeStorageSync('crm_access_token');
            uni.removeStorageSync('todo_access_token');
            uni.removeStorageSync('vbot_root_token');
            uni.removeStorageSync('vbot_root_login_time');
            // Có thể giữ lại UID/ProjectCode tùy ý
        }
    }
});