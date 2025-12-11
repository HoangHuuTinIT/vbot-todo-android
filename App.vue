<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useSocketStore } from '@/stores/socket';
onLaunch(async (options: UniApp.LaunchOptions) => {
    console.log('App Launch');
    
    const authStore = useAuthStore();
    try {
        await authStore.initialize(options);
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
    if (authStore.isLoggedIn && !socketStore.isConnected) {
        socketStore.connect();
    }
});

onHide(() => {
    console.log('App Hide');
});
</script>