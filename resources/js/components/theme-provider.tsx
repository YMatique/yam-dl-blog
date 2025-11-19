import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
    theme: 'system',
    setTheme: () => {},
});

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    storageKey = 'admin-theme',
}: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);

    // Inicializa o tema no client
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem(storageKey) as Theme;
        if (stored) {
            setThemeState(stored);
        }
    }, [storageKey]);

    // Aplica classe ao <html>
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const root = document.documentElement;
        root.classList.remove('light', 'dark');

        let appliedTheme = theme;
        if (theme === 'system') {
            appliedTheme = window.matchMedia('(prefers-color-scheme: dark)')
                .matches
                ? 'dark'
                : 'light';
        }

        root.classList.add(appliedTheme);
        document.documentElement.style.colorScheme = appliedTheme;
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, newTheme);
        }
        setThemeState(newTheme);
    };

    return (
        <ThemeProviderContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};
