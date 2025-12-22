<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useAuthStore } from '@/stores/auth';
import { useSocketStore } from '@/stores/socket';
import { changeLanguage } from '@/utils/language'; 

const handleNativeData = async (eventName: string, options: any = null) => {
    console.log(`[${eventName}] Bắt đầu kiểm tra dữ liệu từ Native...`);
    const authStore = useAuthStore();
    const socketStore = useSocketStore();
    
    let nativeData = null;

    if (options && options.referrerInfo && options.referrerInfo.extraData) {
        console.log("-> Tìm thấy dữ liệu trong options.referrerInfo");
        nativeData = options.referrerInfo.extraData;
    } 
    else if (typeof plus !== 'undefined' && plus.runtime && plus.runtime.arguments) {
        console.log("-> Tìm thấy dữ liệu trong plus.runtime.arguments");
        const args = plus.runtime.arguments;
        try {
            nativeData = (typeof args === 'string' && args.startsWith('{')) ? JSON.parse(args) : args;
        } catch (e) {
            console.error("Lỗi parse arguments:", e);
            if (typeof args === 'object') nativeData = args;
        }
    }
    else {
        const launchOpts = uni.getLaunchOptionsSync();
        if (launchOpts && launchOpts.extraData) {
             nativeData = launchOpts.extraData;
        }
    }
    if (nativeData) { 
        
        if (nativeData.language === 'en' || nativeData.language === 'vi') {
            console.log("🔥 App.vue: Native yêu cầu ngôn ngữ ->", nativeData.language);
            changeLanguage(nativeData.language);
        }

        if (nativeData.uid && nativeData.access_token) {
            console.log("✅ Dữ liệu Auth hợp lệ -> Tiến hành đồng bộ Store");
            await authStore.initFromNative(nativeData);
            
            if (authStore.isLoggedIn) {
                socketStore.connect();
            }
        }
    } else {
        console.log("⚠️ Không tìm thấy dữ liệu auth hợp lệ từ Native ở pha này.");
        if (eventName === 'Launch') {
             console.warn("App Launch thiếu data");
        }
    }
};

onLaunch((options: UniApp.LaunchOptions) => {
    console.log(' App Launch');
    handleNativeData('Launch', options);
});

onShow((options: UniApp.ShowOptions) => {
    console.log('App Show');
    handleNativeData('Show', options);
});

onHide(() => {
    console.log(' App Hide');
});
</script>