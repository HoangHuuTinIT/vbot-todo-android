// locale/index.ts
import { createI18n } from 'vue-i18n';
import vi from './vi.json';
import en from './en.json';

const getSavedLocale = () => {
    try {
        const saved = uni.getStorageSync('CURRENT_LANG');
        if (saved) return saved;

        const systemInfo = uni.getSystemInfoSync();
        
        let sysLang = systemInfo.language ? systemInfo.language.substring(0, 2) : 'vi';
        return ['vi', 'en'].includes(sysLang) ? sysLang : 'vi';
    } catch (e) {
        return 'vi';
    }
};

// const curLocale = getSavedLocale();
const curLocale = 'en';
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