"use client";

import React, { useMemo } from "react";
import Image from "next/image";

import { Quote, SquareArrowOutUpRight, Star, Sparkle } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/lib/aceternity/3d-card";
import { Project } from "@/types";
import { cn } from "@/lib/helpers/utils";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  className?: string;
  variant?: "featured" | "compact";
}

// Reusable utility functions within the file
const getResponsiveClasses = (variant: 'featured' | 'compact', type: 'height' | 'image'): string => {
  const isFeatured = variant === 'featured';

  switch (type) {
    case 'height':
      return isFeatured ? "h-[580px] sm:h-[600px]" : "h-[540px] sm:h-[560px]";
    case 'image':
      return isFeatured ? "h-48" : "h-40";
    default:
      return '';
  }
};


/**
 * 3D Project Card using Aceternity UI effect
 * Professional layout with consistent height across all cards
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className,
  variant = "featured",
}) => {
  const isFeatured = variant === "featured";

  // Memoized computed values
  const { displayTechnologies, processedDescription, heightClasses, imageClasses } = useMemo(() => ({
    displayTechnologies: project.technologies.slice(0, isFeatured ? 4 : 3),
    processedDescription: Array.isArray(project.description)
      ? project.description.slice(0, isFeatured ? 3 : 3)
      : [project.description],
    heightClasses: getResponsiveClasses(variant, 'height'),
    imageClasses: getResponsiveClasses(variant, 'image'),
  }), [project.technologies, project.description, isFeatured, variant]);

  // Memoized handlers
  const handleExternalClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <CardContainer className="inter-var w-full h-full">
      <CardBody className={cn(
        "bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-6 border flex flex-col cursor-pointer",
        heightClasses,
        className
      )}>
        {/* Project Title with Featured & Live Icons */}
        <CardItem
          translateZ="50"
          className={cn(
            "font-bold text-neutral-600 dark:text-white text-center w-full mb-4 flex-shrink-0 group-hover/card:text-primary transition-colors duration-300 relative",
            isFeatured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
          )}
        >
          {/* Featured Star or Project Icon - Left Side */}
          {project.featured ? (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 group/featured">
              <div className="relative">
                <div className="relative w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-105">
                  <Star className="w-6 h-6 fill-white text-white" />
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 group/project">
              <div className="relative">
                <div className="relative w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-105">
                  <Sparkle className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}

          {/* Live Link - Right Side */}
          {project.liveUrl && (
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 group/live cursor-pointer"
              onClick={(e) => handleExternalClick(e, project.liveUrl!)}
            >
              <div className="relative">
                <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-200 hover:scale-105">
                  <SquareArrowOutUpRight className="w-5 h-5 text-white-300 dark:text-white-300 group-hover/live:rotate-10 transition-transform duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* Title Text */}
          <h3 className={cn(
            "line-clamp-1 leading-tight tracking-tight px-12",
            "bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-white bg-clip-text text-transparent",
            "group-hover/card:from-primary group-hover/card:via-primary/80 group-hover/card:to-primary transition-colors duration-200"
          )}>
            {project.title}
          </h3>
        </CardItem>

        {/* Project Image - Fixed height */}
        <CardItem translateZ="100" className="w-full mt-2 flex-shrink-0">
          <div className={cn("relative w-full overflow-hidden rounded-xl", imageClasses)}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover/card:shadow-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardItem>

        {/* Project Description - More space for text */}
        <CardItem
          as="div"
          translateZ="60"
          className={cn(
            "text-neutral-600 dark:text-neutral-300 mt-4 mb-6 flex-1 min-h-0",
            isFeatured ? "text-sm leading-relaxed" : "text-[0.8rem] sm:text-[0.86rem] leading-relaxed"
          )}
        >
          <div className={cn(
            "relative h-full overflow-y-auto rounded-2xl border border-primary/10 bg-gradient-to-br from-white/85 via-sky-50/55 to-emerald-50/45 p-4 pr-5 shadow-inner scrollbar-hide dark:from-white/[0.055] dark:via-sky-500/[0.04] dark:to-emerald-500/[0.055]"
          )}>
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-sky-400 via-primary to-emerald-400" />
            <Quote className="absolute right-3 top-3 h-5 w-5 text-primary/15" />
            {processedDescription.map((point, index) => (
              <p key={index} className="relative pl-2 pr-5 font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed [&:not(:last-child)]:mb-2">
                {point}
              </p>
            ))}
          </div>
        </CardItem>

        {/* Separator Before Technologies - Moved down */}
        <CardItem translateZ="25" className="w-full flex-shrink-0 mb-4">
          <div className="relative w-full h-[2px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/60 dark:via-emerald-400/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300/30 dark:via-emerald-400/30 to-transparent"></div>
          </div>
        </CardItem>

        {/* Technologies */}
        <CardItem translateZ="40" className="w-full flex-shrink-0">
          <div className="w-full overflow-visible sm:overflow-hidden">
            <div className="flex min-h-[1rem] flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:justify-start sm:overflow-x-auto sm:scrollbar-hide">
              {displayTechnologies.map((tech, index) => (
                <span
                  key={tech}
                  className={cn(
                    "max-w-full flex-shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-semibold sm:px-3 sm:text-xs",
                    "bg-gradient-to-r from-emerald-100/60 to-emerald-50/80 dark:from-emerald-800/80 dark:to-emerald-700/60",
                    "text-emerald-300 dark:text-neutral-200",
                    "border border-emerald-200/60 dark:border-emerald-600/90",
                    "hover:shadow-md hover:scale-105 hover:from-primary/20 hover:to-primary/10",
                    "hover:border-primary/40 hover:text-primary dark:hover:text-primary-foreground",
                    "transition-[color,background-color,border-color,box-shadow,transform] duration-200 cursor-default"
                  )}
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default ProjectCard;
