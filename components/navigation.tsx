"use client";

import React, { useState, useEffect, useMemo } from "react";
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

  // Use optimized scroll hooks for better performance
  const { isScrolled } = useScrollPosition(50);

  // Debug: Alternative scroll detection as fallback
  const [debugScrolled, setDebugScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setDebugScrolled(window.scrollY > 50);
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

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Main Navigation Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          "backdrop-blur-md border-b",
          headerScrolled
            ? "bg-background/90 shadow-xl border-border/20 supports-[backdrop-filter]:bg-background/75"
            : "bg-background/10 border-transparent supports-[backdrop-filter]:bg-background/5"
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
                className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-all duration-300 hover:scale-105 transform-gpu"
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
              >
                <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                <span className="font-medium">Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                className="relative bg-background/20 backdrop-blur-sm border border-border/30 hover:bg-background/40 hover:scale-105 transition-all duration-300 transform-gpu"
              >
                <div className={cn(
                  "transition-transform duration-300",
                  isOpen && "rotate-90"
                )}>
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </div>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md md:hidden animate-fade-in"
            onClick={() => setIsOpen(false)}
            style={{ backdropFilter: 'blur(15px) saturate(150%)' }}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-16 inset-x-0 z-50 mx-4 md:hidden animate-slide-down">
            <div
              className="bg-background/95 backdrop-blur-xl rounded-xl shadow-2xl border border-border/30 p-6 ring-1 ring-white/10"
              style={{ backdropFilter: 'blur(25px) saturate(180%)' }}
            >
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="relative block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform-gpu hover:scale-105 text-foreground hover:bg-background/60 hover:shadow-md"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="mt-6 pt-4 border-t border-border/30">
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border-border/30 hover:bg-gradient-to-r hover:from-primary hover:to-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transform-gpu group"
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
