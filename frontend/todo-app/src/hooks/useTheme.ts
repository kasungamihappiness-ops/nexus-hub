import { useState, useEffect } from 'react';
import { getTheme, saveTheme } from '../utils/storage';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme());

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};
