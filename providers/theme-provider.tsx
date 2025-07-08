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
        document.documentElement.style.setProperty("--background", "0 0% 0%");
        document.documentElement.style.setProperty("--foreground", "215 25% 95%");
        document.documentElement.style.setProperty("--card", "0 0% 3%");
        document.documentElement.style.setProperty("--card-foreground", "215 25% 95%");
        document.documentElement.style.setProperty("--popover", "0 0% 0%");
        document.documentElement.style.setProperty("--popover-foreground", "215 25% 95%");
        document.documentElement.style.setProperty("--primary", "217 91% 60%");
        document.documentElement.style.setProperty("--primary-foreground", "210 40% 98%");
        document.documentElement.style.setProperty("--secondary", "0 0% 6%");
        document.documentElement.style.setProperty("--secondary-foreground", "215 25% 95%");
        document.documentElement.style.setProperty("--muted", "0 0% 6%");
        document.documentElement.style.setProperty("--muted-foreground", "215 25% 65%");
        document.documentElement.style.setProperty("--accent", "0 0% 6%");
        document.documentElement.style.setProperty("--accent-foreground", "215 25% 95%");
        document.documentElement.style.setProperty("--destructive", "0 62.8% 30.6%");
        document.documentElement.style.setProperty("--destructive-foreground", "0 0% 98%");
        document.documentElement.style.setProperty("--border", "240 3.7% 15.9%");
        document.documentElement.style.setProperty("--input", "240 3.7% 15.9%");
        document.documentElement.style.setProperty("--ring", "240 4.9% 83.9%");
        document.documentElement.style.setProperty("--gradient-from", "240 40% 8%");
        document.documentElement.style.setProperty("--gradient-via", "260 40% 10%");
        document.documentElement.style.setProperty("--gradient-to", "280 40% 12%");
      } else {
        document.documentElement.style.setProperty("--background", "0 0% 100%");
        document.documentElement.style.setProperty("--foreground", "0 0% 3.9%");
        document.documentElement.style.setProperty("--card", "0 0% 100%");
        document.documentElement.style.setProperty("--card-foreground", "0 0% 3.9%");
        document.documentElement.style.setProperty("--popover", "0 0% 100%");
        document.documentElement.style.setProperty("--popover-foreground", "0 0% 3.9%");
        document.documentElement.style.setProperty("--primary", "0 0% 9%");
        document.documentElement.style.setProperty("--primary-foreground", "0 0% 98%");
        document.documentElement.style.setProperty("--secondary", "0 0% 96.1%");
        document.documentElement.style.setProperty("--secondary-foreground", "0 0% 9%");
        document.documentElement.style.setProperty("--muted", "0 0% 96.1%");
        document.documentElement.style.setProperty("--muted-foreground", "0 0% 45.1%");
        document.documentElement.style.setProperty("--accent", "0 0% 96.1%");
        document.documentElement.style.setProperty("--accent-foreground", "0 0% 9%");
        document.documentElement.style.setProperty("--destructive", "0 84.2% 60.2%");
        document.documentElement.style.setProperty("--destructive-foreground", "0 0% 98%");
        document.documentElement.style.setProperty("--border", "240 5.9% 90%");
        document.documentElement.style.setProperty("--input", "240 5.9% 90%");
        document.documentElement.style.setProperty("--ring", "240 5.9% 10%");
        document.documentElement.style.setProperty("--gradient-from", "240 100% 95%");
        document.documentElement.style.setProperty("--gradient-via", "260 100% 97%");
        document.documentElement.style.setProperty("--gradient-to", "280 100% 99%");
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