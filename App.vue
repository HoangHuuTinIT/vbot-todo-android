<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useAuthStore } from '@/stores/auth';
import { useSocketStore } from '@/stores/socket';
import { changeLanguage } from '@/utils/language'; 

// --- KHU VỰC CONFIG TEST NHANH (Lấy từ .env) ---
const TEST_ENV = {
    URL: import.meta.env.VITE_SERVER_BASE_URL,
    USER: import.meta.env.VITE_TEST_USERNAME,
    PASS: import.meta.env.VITE_TEST_PASSWORD, // Pass này đã hash sẵn trong env
    UID: import.meta.env.VITE_UID,
    P_CODE: import.meta.env.VITE_PROJECT_CODE
};

const handleNativeData = async (eventName: string, options: any = null) => {
    console.log(`[${eventName}] Bắt đầu quy trình khởi tạo...`);
    const authStore = useAuthStore();
    const socketStore = useSocketStore();
    
    let nativeData = null;

    // =================================================================
    // 🔴 1. LOGIC LẤY TỪ APP CHÍNH (ĐÃ COMMENT ĐỂ CHẠY TEST)
    // =================================================================
    /*
    if (options && options.referrerInfo && options.referrerInfo.extraData) {
        nativeData = options.referrerInfo.extraData;
    } 
    else if (typeof plus !== 'undefined' && plus.runtime && plus.runtime.arguments) {
        const args = plus.runtime.arguments;
        try {
            nativeData = (typeof args === 'string' && args.startsWith('{')) ? JSON.parse(args) : args;
        } catch (e) {
            if (typeof args === 'object') nativeData = args;
        }
    }
    else {
        const launchOpts = uni.getLaunchOptionsSync();
        if (launchOpts && launchOpts.extraData) {
             nativeData = launchOpts.extraData;
        }
    }
    */

    // =================================================================
    // 🟢 2. LOGIC CHẠY TEST (TỰ LOGIN LẤY TOKEN TỪ ENV)
    // =================================================================
    if (!nativeData) {
        console.log("⚠️ KHÔNG CÓ NATIVE DATA -> CHẠY CHẾ ĐỘ DEV MODE (.ENV)");
        
        try {
            // Gọi API Login giả lập để lấy Access Token xịn
            const res: any = await new Promise((resolve) => {
                uni.request({
                    url: `${TEST_ENV.URL}/token`,
                    method: 'POST',
                    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: {
                        username: TEST_ENV.USER,
                        password: TEST_ENV.PASS, // Pass trong env của bạn đã hash rồi nên gửi luôn
                        grant_type: 'password',
                        source: 'Desktop-RTC' // Giả mạo nguồn
                    },
                    success: (r) => resolve(r.data),
                    fail: (e) => resolve(null)
                });
            });

            if (res && res.access_token) {
                console.log("✅ DEV LOGIN THÀNH CÔNG!");
                // Tạo gói tin giả lập y hệt Android gửi sang
                nativeData = {
                    uid: TEST_ENV.UID,           // Lấy từ env
                    projectCode: TEST_ENV.P_CODE,// Lấy từ env
                    access_token: res.access_token,
                    session_id: res.session_id,
                    language: 'en'               // <--- MUỐN TEST TIẾNG GÌ THÌ SỬA Ở ĐÂY (vi/en)
                };
            } else {
                console.error("❌ DEV LOGIN THẤT BẠI:", res);
            }
        } catch (e) {
            console.error("Lỗi login dev:", e);
        }
    }

    // =================================================================
    // 🔵 3. XỬ LÝ DỮ LIỆU (KHÔNG CẦN SỬA)
    // =================================================================
    if (nativeData) { 
        // Setup ngôn ngữ ngay lập tức
        if (nativeData.language) {
            console.log("🔥 App.vue: Set ngôn ngữ ->", nativeData.language);
            changeLanguage(nativeData.language);
        }

        if (nativeData.uid && nativeData.access_token) {
            console.log("✅ Dữ liệu Auth hợp lệ -> Đồng bộ Store");
            await authStore.initFromNative(nativeData);
            
            if (authStore.isLoggedIn) {
                socketStore.connect();
            }
        }
    } else {
        console.log("⚠️ Không có dữ liệu để chạy App.");
    }
};

onLaunch((options: UniApp.LaunchOptions) => {
    console.log(' App Launch');
    handleNativeData('Launch', options);
});

onShow((options: UniApp.ShowOptions) => {
    console.log('App Show');
    // handleNativeData('Show', options); // Tạm tắt cái này để đỡ spam login mỗi khi reload
});

onHide(() => {
    console.log(' App Hide');
});
</script>