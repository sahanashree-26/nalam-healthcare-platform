"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "ta";
type Theme = "light" | "dark";

type AppContextType = {
  lang: Lang;
  theme: Theme;
  isDark: boolean;
  toggleLang: () => void;
  toggleTheme: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedLang = localStorage.getItem("nalamLang") as Lang | null;
    const savedTheme = localStorage.getItem("nalamTheme") as Theme | null;

    if (savedLang === "en" || savedLang === "ta") setLang(savedLang);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);

  function toggleLang() {
    const next = lang === "en" ? "ta" : "en";
    setLang(next);
    localStorage.setItem("nalamLang", next);
  }

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("nalamTheme", next);
  }

  return (
    <AppContext.Provider
      value={{
        lang,
        theme,
        isDark: theme === "dark",
        toggleLang,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}