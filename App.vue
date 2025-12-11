<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useSocketStore } from '@/stores/socket';
onLaunch(async (options: UniApp.LaunchOptions) => {
    console.log('App Launch');
    
    const authStore = useAuthStore();
    try {
        // QUAN TRỌNG: Thêm await để đợi login xong mới chạy tiếp
        await authStore.initialize(options);
        
        // Sau khi await xong, chắc chắn đã có sessionId (hoặc đã logout nếu lỗi)
        if (authStore.isLoggedIn) {
            const socketStore = useSocketStore();
            console.log('Auth OK -> Connecting Socket...');
            socketStore.connect();
        }
    } catch (e) {
        console.error('Lỗi khởi tạo App:', e);
    }
});

onShow(() => {
    console.log('App Show');
    const authStore = useAuthStore();
    const socketStore = useSocketStore();
    
    // Chỉ connect lại nếu đã login và chưa kết nối socket
    if (authStore.isLoggedIn && !socketStore.isConnected) {
        socketStore.connect();
    }
});

onHide(() => {
    console.log('App Hide');
});
</script>