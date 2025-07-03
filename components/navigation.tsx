"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-switcher";
import { navigationItems, personalInfo } from "@/data/portfolio";
import { cn, downloadResume } from "@/lib/utils";
import {
  useScrollPosition,
  createNavigationHandler
} from "@/lib/scroll";

/**
 * Main navigation component with responsive design and smooth scrolling
 */
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const originalOverflow = useRef<string>('');

  // Use optimized scroll hooks for better performance
  const { isScrolled } = useScrollPosition(20);

  // Debug: Alternative scroll detection as fallback
  const [debugScrolled, setDebugScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setDebugScrolled(scrollPosition > 20); // More sensitive scroll detection
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use either hook result or fallback
  const headerScrolled = isScrolled || debugScrolled;

  // Get sections from navigation items (memoized for performance)
  const sections = useMemo(
    () => navigationItems.map(item => item.href.substring(1)),
    []
  );

  // Create optimized navigation handler
  const handleNavClick = useMemo(
    () => createNavigationHandler(
      sections,
      80,
      () => setIsOpen(false) // Close mobile menu on navigate
    ),
    [sections]
  );

  // Track mount state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced mobile menu management with proper scroll handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Store original overflow value
      originalOverflow.current = document.body.style.overflow || 'unset';

      // Only block scroll on small screens
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      }

      document.addEventListener("keydown", handleEscape);
      window.addEventListener("resize", handleResize);
    } else {
      // Always restore scroll when menu closes
      document.body.style.overflow = originalOverflow.current || 'unset';
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
      // Ensure scroll is always restored on cleanup
      if (originalOverflow.current) {
        document.body.style.overflow = originalOverflow.current;
      } else {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  // Cleanup on unmount to prevent scroll lock
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      {/* Main Navigation Header */}
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          "backdrop-blur-md will-change-transform",
          headerScrolled
            ? "bg-background/95 shadow-lg supports-[backdrop-filter]:bg-background/80 transform translate-y-0"
            : "bg-background/5 supports-[backdrop-filter]:bg-background/5 transform translate-y-0"
        )}
        style={{
          backdropFilter: headerScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(120%)',
          WebkitBackdropFilter: headerScrolled ? 'blur(20px) saturate(180%)' : 'blur(10px) saturate(120%)',
        }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* Logo/Name */}
            <div className="flex-shrink-0">
              <a
                href="#"
                onClick={(e) => handleNavClick("#", e)}
                className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-all duration-300 hover:scale-105 transform-gpu origin-center"
                style={{ transformOrigin: 'center center', contain: 'layout style' }}
              >
                {personalInfo.name.split(" ").map((word, index) => (
                  <span key={index}>
                    {index === 0 ? word : (
                      <span className="text-primary">{word}</span>
                    )}
                    {index < personalInfo.name.split(" ").length - 1 && " "}
                  </span>
                ))}
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform-gpu hover:scale-105 hover:shadow-lg backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-background/80 hover:shadow-md"
                    style={{ transformOrigin: 'center center', contain: 'layout style' }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={downloadResume}
                className="relative overflow-hidden border-border/30 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-primary hover:to-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transform-gpu group"
                style={{ transformOrigin: 'center center', contain: 'layout style' }}
              >
                <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                <span className="font-medium">Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Button>
            </div>

            {/* Mobile menu button - FIXED VISIBILITY */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                className={cn(
                  "relative border border-border/50 transition-all duration-300 transform-gpu",
                  "bg-background/90 backdrop-blur-sm hover:bg-background hover:scale-105",
                  isOpen && "bg-background border-primary/50"
                )}
                style={{ transformOrigin: 'center center', contain: 'layout style' }}
              >
                <div className={cn(
                  "transition-transform duration-300",
                  isOpen && "rotate-90"
                )}>
                  {isOpen ? (
                    <X className="h-5 w-5 text-foreground" />
                  ) : (
                    <Menu className="h-5 w-5 text-foreground" />
                  )}
                </div>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Menu - FIXED POSITIONING AND VISIBILITY */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="mobile-menu-backdrop fixed inset-0 z-40 bg-black/50 md:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Menu Panel - FIXED POSITIONING AND VISIBILITY */}
          <div
            className={cn(
              "fixed inset-x-0 z-50 mx-4 md:hidden animate-slide-down",
              "top-16" // Consistent positioning regardless of scroll
            )}
          >
            <div className="mobile-menu-panel bg-background border border-border shadow-2xl rounded-xl p-6">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="relative block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform-gpu hover:scale-105 text-foreground hover:bg-accent hover:shadow-md"
                    style={{ transformOrigin: 'center center', contain: 'layout style' }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="relative w-full bg-gradient-to-r from-primary/10 to-secondary/10 border-border hover:bg-gradient-to-r hover:from-primary hover:to-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transform-gpu group overflow-hidden"
                  style={{ transformOrigin: 'center center', contain: 'layout style' }}
                  onClick={() => {
                    downloadResume();
                    setIsOpen(false);
                  }}
                >
                  <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                  <span className="font-medium">Download Resume</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
