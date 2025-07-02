"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme Provider component that manages light/dark/system theme switching
 * with localStorage persistence and system preference detection
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("portfolio-theme") as Theme;
    if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  // Update resolved theme based on current theme and system preference
  useEffect(() => {
    const updateResolvedTheme = () => {
      let resolved: "light" | "dark" = "light";
      
      if (theme === "system") {
        resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      } else {
        resolved = theme as "light" | "dark";
      }
      
      setResolvedTheme(resolved);
      
      // Update document class and CSS variables
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(resolved);
      
      // Update CSS custom properties for the theme
      if (resolved === "dark") {
        document.documentElement.style.setProperty("--background", "0 0% 3.9%");
        document.documentElement.style.setProperty("--foreground", "0 0% 98%");
        document.documentElement.style.setProperty("--primary", "0 0% 98%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 9%");
        document.documentElement.style.setProperty("--muted", "0 0% 14.9%");
        document.documentElement.style.setProperty("--muted-foreground", "0 0% 63.9%");
        document.documentElement.style.setProperty("--border", "0 0% 14.9%");
      } else {
        document.documentElement.style.setProperty("--background", "0 0% 100%");
        document.documentElement.style.setProperty("--foreground", "0 0% 3.9%");
        document.documentElement.style.setProperty("--primary", "0 0% 9%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 98%");
        document.documentElement.style.setProperty("--muted", "0 0% 96.1%");
        document.documentElement.style.setProperty("--muted-foreground", "0 0% 45.1%");
        document.documentElement.style.setProperty("--border", "0 0% 89.8%");
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        updateResolvedTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: updateTheme,
        resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to use theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
} 