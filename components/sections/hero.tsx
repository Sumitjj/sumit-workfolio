"use client";

import React from "react";
import Image from "next/image";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, socialLinks, contactConfig } from "@/data/portfolio";
import { smoothScrollToElement } from "@/lib/helpers/scroll";
import { SocialFloatingDock } from "@/lib/aceternity/social-floating-dock";
import { handleEmailClick } from "@/lib/helpers/utils";

// Convert HorizontalSocialIconsMobile to arrow function
const HorizontalSocialIconsMobile = () => {
  return (
    <div className="flex flex-row gap-x-8 sm:gap-x-10 justify-center items-center md:hidden">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        if (social.platform === "Email") {
          return (
            <a
              key={social.platform}
              href="#"
              aria-label={social.platform}
              onClick={e => {
                e.preventDefault();
                handleEmailClick(
                  contactConfig.recipientEmail,
                  contactConfig.subjects.default,
                  contactConfig.defaultBody
                );
              }}
              className="text-neutral-500 dark:text-neutral-300 text-2xl hover:text-primary transition-colors duration-300"
            >
              <Icon />
            </a>
          );
        }
        return (
          <a
            key={social.platform}
            href={social.url}
            aria-label={social.platform}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 dark:text-neutral-300 text-2xl hover:text-primary transition-colors duration-300"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

/**
 * Hero section with CSS animations and modern responsive design
 */
export const HeroSection = () => {
  // Predefined values to avoid hydration mismatches
  const floatingElements = [
    { width: 120, height: 120, left: 15, top: 20, delay: 0.5, duration: 4 },
    { width: 80, height: 80, left: 75, top: 15, delay: 1.2, duration: 5 },
    { width: 150, height: 150, left: 85, top: 70, delay: 2.1, duration: 6 },
    { width: 100, height: 100, left: 10, top: 80, delay: 0.8, duration: 4.5 },
    { width: 60, height: 60, left: 45, top: 10, delay: 1.8, duration: 5.5 },
    { width: 90, height: 90, left: 55, top: 85, delay: 2.5, duration: 3.5 },
  ];

  return (
    <section className="relative hero-section overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/5 dark:bg-primary/10 animate-pulse"
            style={{
              width: element.width,
              height: element.height,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl flex-1 flex items-center justify-center py-8">
        <div className="text-center w-full">
          {/* Avatar */}
          <div className="mb-6 sm:mb-8 flex justify-center hero-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl hover-scale transition-transform duration-300">
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Sparkle Icon */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-1.5 sm:p-2 bg-primary text-primary-foreground rounded-full shadow-lg animate-spin-slow">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>

          {/* Name Animation */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 text-balance leading-tight hero-slide-up" style={{ animationDelay: "0.2s" }}>
            {personalInfo.name.split("").map((letter, index) => (
              <span
                key={index}
                className="inline-block hero-letter"
                style={{
                  animationDelay: `${0.3 + index * 0.02}s`,
                  opacity: 0,
                  animationFillMode: "forwards"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          {/* Animated Title - Salesforce Branded */}
          <div className="mb-4 sm:mb-6 hero-slide-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed">
              <span className="inline-block bg-gradient-to-r from-[#0176d3] via-[#00d924] to-[#0176d3] bg-clip-text text-transparent animate-gradient font-semibold">
                {personalInfo.title}
              </span>
            </h2>
          </div>

          {/* Bio */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-pretty leading-relaxed hero-fade-in" style={{ animationDelay: "0.5s" }}>
            {personalInfo.bio}
          </p>

          {/* CTA Buttons and Social Links */}
          <div className="flex flex-col items-center gap-6 sm:gap-8 mb-8 sm:mb-12 hero-slide-up" style={{ animationDelay: "0.6s" }}>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="group hover-lift w-full sm:w-auto text-sm sm:text-base dark:text-emerald-300"
                onClick={() => smoothScrollToElement("projects")}
              >
                What I&apos;ve Built
                <FiArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="hover-lift w-full sm:w-auto text-sm sm:text-base dark:text-emerald-300"
                onClick={() => smoothScrollToElement("contact")}
              >
                Let’s Talk
              </Button>
            </div>

            {/* Social Links - Horizontal on mobile, Floating Dock on desktop */}
            <div className="hero-fade-in" style={{ animationDelay: "0.7s" }}>
              {/* Mobile: Horizontal social icons */}
              <HorizontalSocialIconsMobile />

              {/* Desktop: Floating dock */}
              <div className="hidden md:flex justify-center">
                <SocialFloatingDock />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator - Positioned at bottom */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hero-fade-in" style={{ animationDelay: "0.9s" }}>
        <button
          onClick={() => smoothScrollToElement("projects")}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
          aria-label="Scroll to projects section"
        >
          <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
};
