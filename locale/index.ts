// locale/index.ts
import { createI18n } from 'vue-i18n';
import vi from './vi.json';
import en from './en.json';

const getSavedLocale = () => {
    try {
        if (typeof plus !== 'undefined' && plus.runtime && plus.runtime.arguments) {
            try {
                let rawArgs: any = plus.runtime.arguments;
                let args: any = null;

                if (typeof rawArgs === 'string') {
                    if (rawArgs.trim().startsWith('{')) {
                        args = JSON.parse(rawArgs);
                    }
                } else if (typeof rawArgs === 'object') {
                    args = rawArgs;
                }

                if (args && args.language && (args.language === 'en' || args.language === 'vi')) {
                    console.log("🚀 [locale] Ưu tiên lấy ngôn ngữ từ Android:", args.language);
                    uni.setStorageSync('CURRENT_LANG', args.language); 
                    return args.language; 
                }
            } catch (e) {
                console.error("Lỗi đọc language từ Android arguments:", e);
            }
        }
        const saved = uni.getStorageSync('CURRENT_LANG');
        if (saved) {
            console.log("💾 [locale] Lấy ngôn ngữ từ Storage:", saved);
            return saved;
        }
        const systemInfo = uni.getSystemInfoSync();
        let sysLang = systemInfo.language ? systemInfo.language.substring(0, 2) : 'vi';
        return ['vi', 'en'].includes(sysLang) ? sysLang : 'vi';

    } catch (e) {
        return 'vi';
    }
};

const curLocale = getSavedLocale();
console.log("🌐 Ngôn ngữ khởi tạo i18n:", curLocale);

const i18n = createI18n({
    locale: curLocale,
    fallbackLocale: 'vi',
    messages: {
        vi,
        en
    },
    legacy: false,
    globalInjection: true
});

export default i18n;