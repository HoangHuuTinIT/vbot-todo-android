// utils/language.ts
import i18n from '@/locale/index';
import { isRef } from 'vue';
export const changeLanguage = (lang: 'vi' | 'en') => {
    // 1. Đổi ngôn ngữ cho vue-i18n (Text hiển thị trên UI)
    // Vue I18n v9 (Composition API) dùng .value
   if (isRef(i18n.global.locale)) {
           // Trường hợp dùng Composition API (thường gặp ở Vue 3)
           i18n.global.locale.value = lang;
       } else {
           // Trường hợp Legacy mode
           (i18n.global.locale as any) = lang;
       }
    uni.setLocale(lang);

    uni.setStorageSync('CURRENT_LANG', lang);
    console.log("🔀 Đã đổi ngôn ngữ sang:", lang);
    // 4. (Tùy chọn) Reload lại trang hiện tại nếu UI không cập nhật hết
    // const pages = getCurrentPages();
    // if (pages.length > 0) {
    //     const route = pages[pages.length - 1].route;
    //     uni.reLaunch({ url: '/' + route });
    // }
};