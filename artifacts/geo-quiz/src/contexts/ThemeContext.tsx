import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'cosmic' | 'neon' | 'aurora';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'cosmic',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('quiz-theme') as Theme | null;
    return saved ?? 'cosmic';
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('quiz-theme', t);
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    html.classList.add('dark');
    return () => {};
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
