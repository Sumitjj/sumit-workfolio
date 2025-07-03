"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { cn, handleEmailClick } from "@/lib/utils";

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

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Responsive Footer Layout */}
        <div className="space-y-6 sm:space-y-0">

          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between pt-6 border-t border-border/30 gap-6 lg:gap-8">

            {/* Copyright Section - Mobile First */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start text-center lg:text-left space-y-2 sm:space-y-0 sm:space-x-2 text-sm text-muted-foreground order-2 lg:order-1">

              {/* Copyright Line */}
              <div className="flex items-center space-x-2">
                <span>© {currentYear} {personalInfo.name}.</span>
                <span className="hidden sm:inline">Crafted with</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse hidden sm:inline" />
              </div>

              {/* Tech Stack - Responsive */}
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                <span className="sm:hidden">Made with</span>
                <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse sm:hidden" />
                <span className="font-medium text-primary">Next.js</span>
                <span className="text-muted-foreground/60">•</span>
                <span className="font-medium text-blue-500">TypeScript</span>
                <span className="text-muted-foreground/60">•</span>
                <span className="font-medium text-cyan-500">Tailwind</span>
              </div>
            </div>

            {/* Social Links - Enhanced for Mobile */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  const isEmail = social.platform === "Email";

                  if (isEmail) {
                    return (
                      <button
                        key={social.platform}
                        onClick={() => handleEmailClick(
                          "s.jangir129@gmail.com",
                          "Portfolio Inquiry - Let's Connect",
                          "Hi Sumit,\n\nI came across your portfolio and would like to discuss a potential opportunity.\n\nBest regards"
                        )}
                        className={cn(
                          "w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group",
                          "bg-gradient-to-br from-background/80 to-background/40 border border-border/30",
                          "hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25",
                          "active:scale-95 touch-manipulation"
                        )}
                        aria-label={`Send email to ${social.platform}`}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                      </button>
                    );
                  }

                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group",
                        "bg-gradient-to-br from-background/80 to-background/40 border border-border/30",
                        "hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25",
                        "active:scale-95 touch-manipulation"
                      )}
                      aria-label={`Visit ${social.platform}`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>

              {/* Social Label for Mobile */}
              <div className="text-center mt-3 sm:hidden">
                <p className="text-xs text-muted-foreground">Connect with me</p>
              </div>
            </div>
          </div>

          {/* Additional Mobile Info */}
          <div className="sm:hidden text-center pt-4 border-t border-border/20">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>Always learning, always building</span>
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
