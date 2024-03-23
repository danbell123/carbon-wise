// ToggleThemeButton.js
import React from 'react';
import { useTheme } from '../contexts/themeContext';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="p-5 w-min text-lg text-text-colour-primary hover:text-text-colour-primary bg-bg-main hover:bg-bg-main rounded-lg flex items-center">
      <span className="material-symbols-outlined">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

export default ToggleThemeButton;
