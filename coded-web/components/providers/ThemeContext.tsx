"use client";

import { createContext, useContext, useCallback, useState } from "react";

type ThemeId = "bootcamp" | "kids" | "youth" | "enterprise";

interface ThemeContextValue {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "bootcamp",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("bootcamp");

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    document.documentElement.setAttribute("data-theme", id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
