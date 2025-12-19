// main.ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import * as Pinia from 'pinia'
import i18n from './locale/index'
import { unref } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(i18n)

  const currentLocale = unref(i18n.global.locale);
  uni.setLocale(currentLocale);

  return {
    app,
    Pinia,
  }
}