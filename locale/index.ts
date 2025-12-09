//locale/index.ts
import { createI18n } from 'vue-i18n';
import vi from './vi.json';
import en from './en.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    vi,
    en
  },
  legacy: false, 
  globalInjection: true 
});

export default i18n;