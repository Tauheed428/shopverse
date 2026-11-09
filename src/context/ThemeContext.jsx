import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// Pehli baar: saved theme ya phir device ki setting dekho
function getInitialTheme() {
  try {
    const saved = localStorage.getItem("shopverse-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* localStorage na mile to ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Jab bhi theme badle: <html> par "dark" class lagao/hatao + save karo
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("shopverse-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}