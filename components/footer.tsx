"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { contactConfig, footerContent, personalInfo, socialLinks } from "@/data/portfolio";
import { SocialFloatingDock } from "@/lib/aceternity/social-floating-dock";
import { FooterSparkles } from "@/lib/aceternity/footer-sparkles";

/**
 * Fully Responsive Footer Component with Modern Design
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  function HorizontalSocialDockMobile() {
    return (
      <div className="flex flex-row gap-x-4 justify-center items-center md:hidden mt-4">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.platform}
              href={social.url}
              aria-label={social.platform}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 dark:text-neutral-300 text-2xl"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Footer Sparkles Effect with Lightning Border */}
      <FooterSparkles className="z-0" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-8 z-20">
        {/* Responsive Footer Layout */}
        {/* Mobile layout: crafted with, copyright, gap, social icons, gap, always learning message */}
        <div className="flex flex-col items-center md:hidden w-full">
          <div className="text-center text-sm text-muted-foreground mt-8">
            Crafted with <span className="font-bold text-red-500">❤️</span> <span className="font-medium text-orange-500">Next.js</span> <span className="text-muted-foreground/60">•</span> <span className="font-medium text-primary">TypeScript</span> <span className="text-muted-foreground/60">•</span> <span className="font-medium text-green-500">Tailwind</span>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            © {currentYear} <span className="font-bold">Sumit Jangid</span>
          </div>
          <div className="mt-4" />
          <div className="flex flex-row gap-x-8 sm:gap-x-10 items-center justify-center">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  aria-label={social.platform}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 dark:text-neutral-300 text-2xl"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
          <div className="mt-6" />
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Always learning, always building.</span>
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
        </div>
        {/* Desktop layout: 3 columns, message centered below */}
        <div className="hidden md:flex flex-col w-full">
          <div className="flex flex-row items-center justify-between w-full gap-x-8">
            {/* Left: Copyright */}
            <div className="text-left text-sm text-muted-foreground flex-1">
              © {currentYear} <span className="font-bold">Sumit Jangid</span>
            </div>
            {/* Center: Crafted with */}
            <div className="flex justify-center flex-1">
              <div className="text-center text-sm text-muted-foreground mt-4">
                Crafted with <span className="font-bold text-red-500">❤️</span> <span className="font-medium text-orange-500">Next.js</span> <span className="text-muted-foreground/60">•</span> <span className="font-medium text-primary">TypeScript</span> <span className="text-muted-foreground/60">•</span> <span className="font-medium text-green-500">Tailwind</span>
              </div>
            </div>
            {/* Right: Social Icons */}
            <div className="flex justify-end flex-1">
              <div className="flex flex-row gap-x-4 items-center justify-end">
                <SocialFloatingDock />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-8 mb-2">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary" />
              <span>Always learning, always building.</span>
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
