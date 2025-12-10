// utils/themeManager.ts
import { reactive } from 'vue';

export const themeState = reactive({
  currentTheme: 'system' // 'light' | 'dark' | 'system'
});

export const ThemeManager = {
  init() {
    // Lắng nghe system
    try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // Set lần đầu
        this.applyTheme(themeState.currentTheme);
        
        // Lắng nghe thay đổi
        mediaQuery.addEventListener('change', (e) => {
            if (themeState.currentTheme === 'system') {
                this.updateDOM(e.matches ? 'dark' : 'light');
            }
        });
    } catch (e) {
        // Môi trường không hỗ trợ matchMedia (ví dụ app cũ)
        console.log('Environment does not support matchMedia');
    }
  },

  setTheme(mode: 'light' | 'dark' | 'system') {
    themeState.currentTheme = mode;
    this.applyTheme(mode);
  },

  applyTheme(mode: string) {
    let targetTheme = mode;
    if (mode === 'system') {
       const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
       targetTheme = isSystemDark ? 'dark' : 'light';
    }
    this.updateDOM(targetTheme);
  },

  updateDOM(theme: string) {
    // Gán attribute vào thẻ HTML (hoặc body)
    document.documentElement.setAttribute('data-theme', theme);
  }
};