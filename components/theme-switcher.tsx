"use client";

import * as React from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";
import { useTheme } from "@/providers/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/helpers/utils";

/**
 * Theme switcher component with light, dark, and system options
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light", icon: FiSun, label: "Light" },
    { value: "dark", icon: FiMoon, label: "Dark" },
    { value: "system", icon: FiMonitor, label: "System" },
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
 * Enhanced theme toggle button with beautiful day/night animation
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const toggleTheme = () => {
    setIsAnimating(true);

    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 700);

    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const isDark = theme === "dark" || (theme === "system" && resolvedTheme === "dark");

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "h-9 w-9 relative overflow-hidden rounded-full transition-all duration-300",
        "hover:bg-accent/50 hover:scale-110 active:scale-95",
        "focus:outline-none focus-visible:outline-none",
        "border-0 outline-0 ring-0",
        isAnimating && "animate-pulse",
        className
      )}
      aria-label="Toggle theme"
      type="button"
    >
      {/* Sun Icon - Day Mode */}
      <FaSun
        className={cn(
          "h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-600 ease-in-out transform-gpu",
          isDark
            ? "rotate-180 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100",
          isAnimating && !isDark && "animate-spin"
        )}
        style={{
          filter: isDark ? 'blur(8px) brightness(0.5)' : 'blur(0px) brightness(1)',
          transformOrigin: 'center center',
        }}
      />

      {/* Moon Icon - Night Mode */}
      <FaMoon
        className={cn(
          "h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-600 ease-in-out transform-gpu",
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-180 scale-0 opacity-0",
          isAnimating && isDark && "animate-pulse"
        )}
        style={{
          filter: isDark ? 'blur(0px) brightness(1)' : 'blur(8px) brightness(0.5)',
          transformOrigin: 'center center',
        }}
      />

      {/* Ripple Effect on Click */}
      {isAnimating && (
        <div
          className={cn(
            "absolute inset-0 rounded-full animate-ping",
            isDark
              ? "bg-blue-400/30"
              : "bg-yellow-400/30"
          )}
          style={{
            animationDuration: '700ms',
            animationIterationCount: '1',
          }}
        />
      )}

      {/* Subtle Background Glow */}
      <div
        className={cn(
          "absolute inset-1 rounded-full transition-all duration-600 opacity-0",
          "hover:opacity-30",
          isDark
            ? "bg-blue-400/20"
            : "bg-yellow-400/20"
        )}
      />
    </button>
  );
} 