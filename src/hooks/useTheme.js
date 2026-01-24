import { useEffect, useMemo, useState } from 'react';
import { applyTheme, getInitialTheme, persistTheme } from '../theme';

export default function useTheme() {
  const initial = useMemo(() => getInitialTheme(), []);
  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return { theme, setTheme, toggleTheme };
}
