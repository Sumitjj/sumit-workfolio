"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Project } from "@/types";
import { cn } from "@/lib/helpers/utils";
import { Fade } from "react-awesome-reveal";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
  variant?: "featured" | "compact";
}

/**
 * Project card component with modern hover effects and variant support
 */
export function ProjectCard({ project, onClick, className, variant = "featured" }: ProjectCardProps) {
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  // Get first word of project title for card display
  const getDisplayTitle = (title: string) => {
    const words = title.split(" ");
    return words.length > 1 ? words[0] : title;
  };

  // Get top 3 technologies for card display
  const getTopTechnologies = (technologies: string[]) => {
    return technologies.slice(0, 3);
  };

  const isFeatured = variant === "featured";

  return (
    <Fade triggerOnce cascade damping={0.15}>
      <div className="relative isolate contain-layout h-full">
        <div
          className={cn(
            "group cursor-pointer h-full w-full",
            "relative overflow-hidden rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm",
            "transition-all duration-300 ease-out",
            "hover:border-primary/30 hover:bg-card/90",
            "hover:shadow-lg hover:shadow-primary/10",
            "hover:-translate-y-1 hover:scale-[1.02]",
            "transform-gpu will-change-transform",
            className
          )}
          onClick={onClick}
          tabIndex={0}
          role="button"
          aria-label={`View details for project ${project.title}`}
          data-project={project.title}
        >
          {/* Project Image - Different sizes for variants */}
          <div className={cn(
            "relative w-full overflow-hidden flex-shrink-0",
            isFeatured ? "h-32 sm:h-36 lg:h-40" : "h-24 sm:h-28 lg:h-32"
          )}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={false}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              quality={85}
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Card Content - Responsive to variant */}
          <CardContent className={cn(
            "relative flex flex-col h-full min-h-0",
            isFeatured ? "p-4" : "p-3"
          )}>
            {/* Header Section - Title and Links */}
            <div className={cn(
              "flex items-start justify-between flex-shrink-0",
              isFeatured ? "mb-3" : "mb-2"
            )}>
              <h3 className={cn(
                "font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight tracking-tight flex-1",
                isFeatured ? "text-base sm:text-lg min-h-[1.5rem]" : "text-sm sm:text-base min-h-[1.25rem]"
              )}>
                {isFeatured ? project.title : getDisplayTitle(project.title)}
              </h3>
              <div className="flex space-x-1 ml-2 flex-shrink-0">
                {project.githubUrl && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => handleLinkClick(e, project.githubUrl!)}
                    className={cn(
                      "p-0 bg-background/60 backdrop-blur-md hover:bg-primary/80 hover:text-white shadow-sm border border-primary/20 hover:scale-110 transition-all",
                      isFeatured ? "h-7 w-7" : "h-6 w-6"
                    )}
                    tabIndex={-1}
                    aria-label="View on GitHub"
                  >
                    <Github className={cn(isFeatured ? "h-3 w-3" : "h-2.5 w-2.5")} />
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => handleLinkClick(e, project.liveUrl!)}
                    className={cn(
                      "p-0 bg-background/60 backdrop-blur-md hover:bg-secondary/80 hover:text-white shadow-sm border border-secondary/20 hover:scale-110 transition-all",
                      isFeatured ? "h-7 w-7" : "h-6 w-6"
                    )}
                    tabIndex={-1}
                    aria-label="View Live Project"
                  >
                    <ExternalLink className={cn(isFeatured ? "h-3 w-3" : "h-2.5 w-2.5")} />
                  </Button>
                )}
              </div>
            </div>

            {/* Description - Different heights for variants */}
            <div className={cn(
              "flex items-start flex-shrink-0",
              isFeatured ? "h-12 sm:h-14 mb-3" : "h-10 sm:h-12 mb-2"
            )}>
              <p className={cn(
                "text-muted-foreground line-clamp-2 leading-relaxed",
                isFeatured ? "text-xs sm:text-sm" : "text-xs"
              )}>
                {project.description}
              </p>
            </div>

            {/* Footer Section - Technologies (show on all cards) */}
            <div className={cn(
              "mt-auto border-t border-border/30 flex-shrink-0",
              isFeatured ? "pt-3" : "pt-2"
            )}>
              <div className="flex gap-1.5 flex-wrap">
                {getTopTechnologies(project.technologies).map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      "inline-flex items-center rounded-md font-medium bg-muted/60 text-muted-foreground hover:bg-muted transition-colors duration-200 whitespace-nowrap",
                      isFeatured ? "px-2 py-1 text-xs" : "px-1.5 py-0.5 text-xs"
                    )}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className={cn(
                    "inline-flex items-center rounded-md font-medium bg-primary/10 text-primary whitespace-nowrap",
                    isFeatured ? "px-2 py-1 text-xs" : "px-1.5 py-0.5 text-xs"
                  )}>
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Fade>
  );
}

// Add float and bounceIn keyframes to your global CSS if not present:
// @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
// .animate-float { animation: float 3s ease-in-out infinite; }
// @keyframes bounceIn { 0%{transform:scale(0.7);opacity:0} 60%{transform:scale(1.1);opacity:1} 100%{transform:scale(1);opacity:1} }
// .animate-bounceIn { animation: bounceIn 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; } 