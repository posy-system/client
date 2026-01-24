import React from 'react';

export default function ThemeToggle({ theme, onToggle }) {
  const label = theme === 'dark' ? 'Dark' : 'Light';

  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      aria-label={`Switch theme (currently ${label})`}
      title={`Switch theme (currently ${label})`}
    >
      <span className="text-base" aria-hidden>
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      
    </button>
  );
}
