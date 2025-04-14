
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem("admin-theme");
    // Check if system prefers dark mode
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    return (savedTheme as Theme) || (systemPrefersDark ? "dark" : "light");
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the previous theme class and add the new one
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Save theme to localStorage
    localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
