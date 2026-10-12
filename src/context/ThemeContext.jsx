import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem("civic_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      document.body.style.backgroundColor = "#0b1120";
      document.body.style.color = "#f1f5f9";
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      document.body.style.backgroundColor = "#f9fafb";
      document.body.style.color = "#111827";
    }
    try {
      localStorage.setItem("civic_theme", theme);
    } catch (e) {
      console.error("Failed to save theme in localStorage", e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
