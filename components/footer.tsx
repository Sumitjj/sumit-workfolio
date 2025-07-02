"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Minimalist Footer Component with Stylish Design
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

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Clean Footer with Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-border/30 gap-4 sm:gap-6">

          {/* Copyright Message - Left */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} {personalInfo.name}.</span>
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>using Next.js, TypeScript & Tailwind CSS</span>
          </div>

          {/* Social Links - Right */}
          <div className="flex items-center space-x-3">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group",
                    "bg-gradient-to-br from-background/80 to-background/40 border border-border/30",
                    "hover:bg-primary hover:border-primary hover:text-primary-foreground hover:shadow-lg"
                  )}
                  aria-label={`Visit ${social.platform}`}
                >
                  <IconComponent className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl opacity-60" />
    </footer>
  );
}
