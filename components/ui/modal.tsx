"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable modal component with clean design and animations
 */
export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  // Handle escape key and body scroll management
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      // Simple scroll prevention without position manipulation
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
      
      // Focus trap - ensure modal is accessible
      const modalElement = document.querySelector('[data-modal="true"]');
      if (modalElement) {
        (modalElement as HTMLElement).focus();
      }
      
      return () => {
        // Restore body scroll
        document.removeEventListener("keydown", handleEscape);
        document.body.classList.remove("modal-open");
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      data-modal="true"
      tabIndex={-1}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        height: '100vh',
        width: '100vw'
      }}
    >
      {/* Enhanced Backdrop with smooth animation */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-all duration-500 ease-out animate-fade-in"
        onClick={onClose}
        style={{ 
          backdropFilter: 'blur(8px)',
          animation: 'modalBackdropIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      />
      
      {/* Modal Content - Smooth Animation */}
      <div
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-hidden",
          "bg-background rounded-2xl shadow-2xl border border-border",
          "transform-gpu will-change-transform transition-all duration-500",
          "ring-1 ring-black/10 dark:ring-white/10",
          "mx-auto my-auto",
          className
        )}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          animation: 'modalContentIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        {/* Header */}
        {title && (
          <div 
            className="flex items-center justify-between p-6 border-b border-border bg-background"
            style={{
              animation: 'modalHeaderIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both'
            }}
          >
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-accent rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
        
        {/* Content - Smooth Scrolling with Animation */}
        <div 
          className="overflow-y-auto max-h-[calc(90vh-140px)] bg-background scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--muted-foreground)) hsl(var(--muted))',
            animation: 'modalContentFadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both'
          }}
        >
          {children}
        </div>
        
        {/* Close button if no title - Smooth Animation */}
        {!title && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-accent rounded-full bg-background shadow-lg border border-border z-20 transition-all duration-200 hover:scale-110"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              animation: 'modalHeaderIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both'
            }}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
} 