"use client";

import * as React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Theme switcher component with light, dark, and system options
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  return (
    <div className={cn("flex rounded-lg bg-muted p-1", className)}>
      {themes.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          variant="ghost"
          size="sm"
          onClick={() => setTheme(value)}
          className={cn(
            "h-8 w-8 p-0 transition-all duration-200",
            theme === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={`Switch to ${label} theme`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}

/**
 * Simple theme toggle button (for minimal layouts)
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("h-9 w-9", className)}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
} 