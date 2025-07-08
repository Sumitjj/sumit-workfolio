"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { contactConfig, footerContent, personalInfo } from "@/data/portfolio";
import { SocialFloatingDock } from "@/lib/aceternity/social-floating-dock";

/**
 * Fully Responsive Footer Component with Modern Design
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-8">
        {/* Responsive Footer Layout */}
        <div className="space-y-6 sm:space-y-0">

          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between pt-6 border-t border-border/30 gap-6 lg:gap-8">

            {/* Copyright Section - Mobile First */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start text-center lg:text-left space-y-2 sm:space-y-0 sm:space-x-2 text-sm text-muted-foreground order-2 lg:order-1">

              {/* Copyright Line */}
              <div className="flex items-center space-x-2">
                <span>© {currentYear} {footerContent.copyright} <span className="font-bold">{personalInfo.name}</span></span>
                <span className="hidden sm:inline">{footerContent.craftedWith}</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse hidden sm:inline" />
              </div>

              {/* Tech Stack - Responsive */}
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                <span className="sm:hidden">{footerContent.craftedWith}</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse sm:hidden" />
                <span className="font-medium text-orange-500">Next.js</span>
                <span className="text-muted-foreground/60">•</span>
                <span className="font-medium text-primary">TypeScript</span>
                <span className="text-muted-foreground/60">•</span>
                <span className="font-medium text-green-500">Tailwind</span>
              </div>
            </div>

            {/* Social Links - Floating Dock */}
            <div className="order-1 lg:order-2 flex items-center">
              <SocialFloatingDock
                className="flex justify-center"
                mobileClassName="translate-y-0"
              />

              {/* Social Label for Mobile */}
              <div className="text-center mt-3 sm:hidden">
                <p className="text-xs text-muted-foreground">{footerContent.connectWith}</p>
              </div>
            </div>
          </div>

          {/* Additional Mobile Info */}
          <div className="sm:hidden text-center pt-4 border-t border-border/20">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>{footerContent.alwaysLearning}</span>
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-24 h-24 sm:w-32 sm:h-32 bg-primary/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-secondary/5 rounded-full blur-2xl opacity-60" />
    </footer>
  );
}
