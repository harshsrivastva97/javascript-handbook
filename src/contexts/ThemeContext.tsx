import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Get saved theme from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        // Remove previous theme class
        document.documentElement.classList.remove('light-theme', 'dark-theme');
        // Add new theme class
        document.documentElement.classList.add(`${theme}-theme`);
        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;