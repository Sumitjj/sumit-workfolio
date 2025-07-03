"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";
import { Fade } from "react-awesome-reveal";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
}

/**
 * Project card component with hover effects and animations
 */
export function ProjectCard({ project, onClick, className }: ProjectCardProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const techScrollRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  // Check if technologies section needs scroll indicator
  useEffect(() => {
    const checkScrollable = () => {
      const container = techScrollRef.current;
      if (container) {
        const isScrollable = container.scrollWidth > container.clientWidth;
        const isAtEnd = container.scrollLeft >= (container.scrollWidth - container.clientWidth - 5);
        setShowScrollIndicator(isScrollable && !isAtEnd);
      }
    };

    const container = techScrollRef.current;
    if (container) {
      checkScrollable();
      container.addEventListener('scroll', checkScrollable);
      window.addEventListener('resize', checkScrollable);

      return () => {
        container.removeEventListener('scroll', checkScrollable);
        window.removeEventListener('resize', checkScrollable);
      };
    }
  }, [project.technologies]);

  return (
    <Fade triggerOnce cascade damping={0.15}>
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.25}
        glareColor="#ffffff"
        glarePosition="all"
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        transitionSpeed={800}
        perspective={1000}
        scale={1.02}
        className={cn(
          "group cursor-pointer h-full flex flex-col min-h-[420px]",
          className
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-xl h-full flex flex-col",
            "transition-all duration-500 shadow-2xl hover:shadow-primary/20 hover:shadow-[0_0_50px_-12px]",
            "hover:border-primary/40 hover:bg-card/90"
          )}
          onClick={onClick}
          tabIndex={0}
          role="button"
          aria-label={`View details for project ${project.title}`}
        >
          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden z-10 p-4">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority={false}
              />
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="relative z-10 p-0 flex-1 flex flex-col h-full">
            {/* Header Section - Title and Links */}
            <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight tracking-tight line-clamp-2 flex-1">
                  {project.title}
                </h3>
                <div className="flex space-x-1 ml-2">
                  {project.githubUrl && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => handleLinkClick(e, project.githubUrl!)}
                      className="h-8 w-8 p-0 bg-background/60 backdrop-blur-md hover:bg-primary/80 hover:text-white shadow-sm border border-primary/20 hover:scale-110 transition-all"
                      tabIndex={-1}
                      aria-label="View on GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => handleLinkClick(e, project.liveUrl!)}
                      className="h-8 w-8 p-0 bg-background/60 backdrop-blur-md hover:bg-secondary/80 hover:text-white shadow-sm border border-secondary/20 hover:scale-110 transition-all"
                      tabIndex={-1}
                      aria-label="View Live Project"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm sm:text-base line-clamp-3 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Footer Section - Technologies */}
            <div className="mt-auto px-5 sm:px-6 pt-4 pb-5 sm:pb-6 border-t border-border/30">
              <div className="relative">
                <div
                  ref={techScrollRef}
                  className="flex gap-1.5 overflow-x-auto scrollbar-hide scroll-smooth -mx-0"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted/60 text-muted-foreground hover:bg-muted transition-colors duration-200 whitespace-nowrap flex-shrink-0"
                    >
                      {tech}
                    </span>
                  ))}

                  {/* Spacer when scroll indicator is shown */}
                  {showScrollIndicator && (
                    <div className="w-6 flex-shrink-0" />
                  )}
                </div>

                {/* Scroll Indicator - Fade Gradient */}
                {showScrollIndicator && (
                  <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none">
                    <div className="h-full w-full bg-gradient-to-l from-card/90 via-card/50 to-transparent flex items-center justify-end pr-1">
                      <div className="w-1 h-1 bg-primary/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Tilt>
    </Fade>
  );
}

// Add float and bounceIn keyframes to your global CSS if not present:
// @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
// .animate-float { animation: float 3s ease-in-out infinite; }
// @keyframes bounceIn { 0%{transform:scale(0.7);opacity:0} 60%{transform:scale(1.1);opacity:1} 100%{transform:scale(1);opacity:1} }
// .animate-bounceIn { animation: bounceIn 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; } 