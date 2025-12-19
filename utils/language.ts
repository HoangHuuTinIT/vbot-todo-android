// utils/language.ts
import i18n from '@/locale/index';
import { isRef } from 'vue';
export const changeLanguage = (lang: 'vi' | 'en') => {
   if (isRef(i18n.global.locale)) {
           i18n.global.locale.value = lang;
       } else {
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