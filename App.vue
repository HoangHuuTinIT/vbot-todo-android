<script>
import { systemLogin, getTodoToken } from '@/api/auth.js';

export default {
    onLaunch: async function(options) {
        console.log('--- App Launching ---');

        // 1. ƯU TIÊN: Kiểm tra URL (Môi trường thật)
        // Nếu App mẹ truyền token sang, ta MẶC ĐỊNH lấy cái mới nhất này để đảm bảo đúng User
        if (options && options.query && options.query.token) {
            console.log('>> Mode: Production (Cập nhật Token từ URL)');
            const rootToken = options.query.token || options.query.access_token;
            const uid = options.query.uid;
            const projectCode = options.query.projectCode;

            await this.handleGetTodoToken(rootToken, projectCode, uid);
            return; // Xong, không làm gì thêm
        }

        // 2. FALLBACK: Môi trường Dev (Tự đăng nhập)
        console.log('>> Mode: Development');
        
        // Kiểm tra xem Token cũ còn hạn không? (Giả sử token sống 1 tiếng = 3600s)
        // Ta trừ hao đi 5 phút cho chắc ăn
        const storedTodoToken = uni.getStorageSync('todo_access_token');
        const tokenExpiryTime = uni.getStorageSync('token_expiry_time'); // Timestamp lúc hết hạn
        const now = Date.now();

        if (storedTodoToken && tokenExpiryTime && now < tokenExpiryTime) {
            console.log('>> Token cũ vẫn còn hạn, không cần Login lại.');
            return; // Dùng token cũ, không gọi API nữa
        }

        // Nếu không có token hoặc đã hết hạn -> Login lại
        console.log('>> Token hết hạn hoặc không có, đang Login lại...');
        const devUser = import.meta.env.VITE_TEST_USERNAME;
        const devPass = import.meta.env.VITE_TEST_PASSWORD;
        const uid = import.meta.env.VITE_UID;
        const projectCode = import.meta.env.VITE_PROJECT_CODE;

        try {
            const loginData = await systemLogin(devUser, devPass);
            // Sau khi login, gọi hàm đổi token todo
            await this.handleGetTodoToken(loginData.access_token, projectCode, uid);
        } catch (e) {
            console.error('Dev Login thất bại', e);
        }
    },

    methods: {
        // Tách hàm này ra để tái sử dụng
        async handleGetTodoToken(rootToken, projectCode, uid) {
            try {
                // Lưu thông tin cơ bản
                uni.setStorageSync('vbot_root_token', rootToken);
                uni.setStorageSync('vbot_uid', uid);
                uni.setStorageSync('vbot_project_code', projectCode);

                // Gọi API lấy token Todo
                const todoToken = await getTodoToken(rootToken, projectCode, uid);
                
                uni.setStorageSync('todo_access_token', todoToken);
                
                // Lưu thời gian hết hạn (Ví dụ set cứng 1 tiếng tính từ bây giờ)
                // Hoặc lấy từ biến expires_in của API trả về nếu có
                const expiresIn = 3600 * 1000; // 1 giờ đổi ra miliseconds
                uni.setStorageSync('token_expiry_time', Date.now() + expiresIn);

                console.log('>>> Đã cập nhật Todo Token mới.');
            } catch (err) {
                console.error('Lỗi lấy Todo Token:', err);
            }
        }
    }
}
</script>