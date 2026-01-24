const THEME_STORAGE_KEY = 'theme';

export function getStoredTheme() {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

export function getPreferredTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function getInitialTheme() {
  return getStoredTheme() ?? getPreferredTheme();
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (!root) return;

  root.classList.toggle('dark', theme === 'dark');
}

export function persistTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}

export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
}
