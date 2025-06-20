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
  resolvedTheme?: 'dark' | 'light'; // Actual theme applied (system resolved)
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
  resolvedTheme: 'light', // Default to light before effect runs
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'quickdash-ui-theme', // App-specific storage key
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>(() => {
     if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem(storageKey) as Theme;
        const initialTheme = storedTheme || defaultTheme;
        if (initialTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return initialTheme;
     }
     return 'light'; // Fallback for non-browser environment (though unlikely for this app type)
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (currentTheme: Theme) => {
      let effectiveTheme: 'dark' | 'light';
      if (currentTheme === 'system') {
        effectiveTheme = systemPrefersDark.matches ? 'dark' : 'light';
      } else {
        effectiveTheme = currentTheme;
      }

      root.classList.remove('light', 'dark');
      root.classList.add(effectiveTheme);
      setResolvedTheme(effectiveTheme);
    };

    applyTheme(theme); // Apply on initial load and theme change

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // 'theme' here is the state variable, which reflects user's choice (light, dark, or system)
      if (theme === 'system') { 
        applyTheme('system'); // Re-evaluate and apply system theme
      }
    };

    systemPrefersDark.addEventListener('change', handleSystemThemeChange);
    return () => {
      systemPrefersDark.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]); // Rerun when 'theme' (user's preference) changes

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme); // This will trigger the useEffect above
    },
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};