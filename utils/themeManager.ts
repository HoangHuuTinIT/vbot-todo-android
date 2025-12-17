// utils/themeManager.ts
import { reactive } from 'vue';

export const themeState = reactive({
  currentTheme: 'system'
});

export const ThemeManager = {
  init() {
    try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.applyTheme(themeState.currentTheme);
        mediaQuery.addEventListener('change', (e) => {
            if (themeState.currentTheme === 'system') {
                this.updateDOM(e.matches ? 'dark' : 'light');
            }
        });
    } catch (e) {
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
    document.documentElement.setAttribute('data-theme', theme);
  }
};