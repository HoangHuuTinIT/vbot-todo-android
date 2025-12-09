// utils/language.ts
import i18n from '@/locale/index';

export const changeLanguage = (lang: 'vi' | 'en') => {
    // 1. Đổi ngôn ngữ cho vue-i18n (Text hiển thị trên UI)
    // Vue I18n v9 (Composition API) dùng .value
    if (i18n.global.mode === 'legacy') {
        i18n.global.locale = lang;
    } else {
        (i18n.global.locale as any).value = lang;
    }

    // 2. Đổi ngôn ngữ cho Uni Framework (Tabbar, NavigationBar, Picker, Calendar...)
    uni.setLocale(lang);

    // 3. Lưu lại để lần sau mở app vẫn giữ nguyên (nếu cần)
    uni.setStorageSync('CURRENT_LANG', lang);
    
    // 4. (Tùy chọn) Reload lại trang hiện tại nếu UI không cập nhật hết
    // const pages = getCurrentPages();
    // if (pages.length > 0) {
    //     const route = pages[pages.length - 1].route;
    //     uni.reLaunch({ url: '/' + route });
    // }
};