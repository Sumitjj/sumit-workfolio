"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationItems, personalInfo } from "@/data/portfolio";
import { cn, openResume, getResumeButtonText } from "@/lib/utils";
import {
  useScrollPosition,
  createNavigationHandler
} from "@/lib/scroll";

/**
 * Main navigation component with responsive design and smooth scrolling
 */
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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
      originalOverflow.current = document.body.style.overflow || 'auto';

      // Only block scroll on small screens
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
      }

      document.addEventListener("keydown", handleEscape);
      window.addEventListener("resize", handleResize);
    } else {
      // Always restore scroll when menu closes
      document.body.style.overflow = originalOverflow.current || 'auto';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
      // Ensure scroll is always restored on cleanup
      document.body.style.overflow = originalOverflow.current || 'auto';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    };
  }, [isOpen]);

  // Cleanup on unmount to prevent scroll lock
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.body.style.height = 'unset';
    };
  }, []);



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
              <Button
                variant="outline"
                size="sm"
                onClick={openResume}
                className="relative overflow-hidden border-border/30 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-primary hover:to-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transform-gpu group"
                style={{ transformOrigin: 'center center', contain: 'layout style' }}
              >
                <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                <span className="font-medium">{getResumeButtonText()}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Button>
            </div>

            {/* Mobile menu button - Enhanced visibility */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                className={cn(
                  "relative p-2 rounded-lg transition-all duration-300 transform-gpu",
                  "bg-background/90 backdrop-blur-sm border border-border/50",
                  "hover:bg-background hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50",
                  isOpen && "bg-background border-primary/50 scale-105"
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
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Menu - Completely redesigned for responsive only */}
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel - Black filled design */}
          <div
            className="fixed inset-x-4 top-20 z-50 rounded-xl shadow-2xl"
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            }}
          >
            <div className="p-6">
              {/* Navigation Links */}
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform-gpu hover:scale-105"
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      backgroundColor: 'transparent',
                      transformOrigin: 'center center',
                      contain: 'layout style'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Divider */}
              <div
                className="my-6 h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                }}
              />

              {/* Resume Download Button */}
              <button
                onClick={() => {
                  openResume();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform-gpu hover:scale-105 flex items-center justify-center space-x-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  transformOrigin: 'center center',
                  contain: 'layout style'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                }}
              >
                <Download className="h-4 w-4" />
                <span>{getResumeButtonText()}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
