import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a Context for the theme
const ThemeContext = createContext();

// Create a Provider component
export const ThemeProvider = ({ children }) => {
  // Check if the theme is stored in localStorage or default to 'light'
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'light');

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save the new theme to localStorage
  };

  // Apply the theme to the body
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
