"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Sparkles, ExternalLink, Zap } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/lib/aceternity/3d-card";
import { Project } from "@/types";
import { cn } from "@/lib/helpers/utils";
import { getProjectColorsFromImage, type ExtractedColors } from "@/lib/aceternity/image-color-extractor";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
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

// Custom hook logic as arrow function
const useProjectColors = (projectTitle: string, projectImage: string) => {
  const [projectColors, setProjectColors] = useState<ExtractedColors | null>(null);

  useEffect(() => {
    const extractColors = async () => {
      try {
        const colors = await getProjectColorsFromImage(projectTitle, projectImage);
        setProjectColors(colors);
      } catch (error) {
        console.warn(`Color extraction failed for ${projectTitle}:`, error);
      }
    };
    extractColors();
  }, [projectTitle, projectImage]);

  return { projectColors };
};

/**
 * 3D Project Card using Aceternity UI effect
 * Professional layout with consistent height across all cards
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  className,
  variant = "featured",
}) => {
  const isFeatured = variant === "featured";

  // Memoized computed values
  const { displayTechnologies, processedDescription, heightClasses, imageClasses } = useMemo(() => ({
    displayTechnologies: project.technologies.slice(0, isFeatured ? 4 : 3),
    processedDescription: Array.isArray(project.description)
      ? project.description.slice(0, isFeatured ? 2 : 1)
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
        "bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-6 border flex flex-col",
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
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/8 to-orange-400/8 rounded-full blur-[1px] group-hover/featured:blur-[2px] transition-all duration-300"></div>
                <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/40 border border-amber-200/60 dark:border-amber-700/60 hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 group/project">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/8 to-teal-400/8 rounded-full blur-[1px] group-hover/project:blur-[2px] transition-all duration-300"></div>
                <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 border border-emerald-200/60 dark:border-emerald-700/60 hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                  <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-[1px] group-hover/live:blur-[2px] transition-all duration-300"></div>
                <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/40 dark:to-cyan-900/40 border border-blue-200/60 dark:border-blue-700/60 hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                  <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover/live:rotate-12 transition-transform duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* Title Text */}
          <h3 className={cn(
            "line-clamp-1 leading-tight tracking-tight px-12",
            "bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-100 dark:to-white bg-clip-text text-transparent",
            "group-hover/card:from-primary group-hover/card:via-primary/80 group-hover/card:to-primary transition-all duration-500"
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
            "text-neutral-600 dark:text-neutral-300 mt-4 mb-8 flex-grow overflow-hidden text-center",
            isFeatured ? "text-sm leading-relaxed" : "text-xs sm:text-sm leading-relaxed"
          )}
        >
          <div className={cn(
            "space-y-2",
            isFeatured ? "line-clamp-4 sm:line-clamp-5" : "line-clamp-3 sm:line-clamp-4"
          )}>
            {processedDescription.map((point, index) => (
              <p key={index} className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {point}
              </p>
            ))}
          </div>
        </CardItem>

        {/* Separator Before Technologies - Moved down */}
        <CardItem translateZ="25" className="w-full flex-shrink-0 mb-4">
          <div className="relative w-full h-[2px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-neutral-400/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/40 dark:via-neutral-400/40 to-transparent blur-sm"></div>
          </div>
        </CardItem>

        {/* Technologies - Single Row */}
        <CardItem translateZ="40" className="w-full flex-shrink-0">
          <div className="w-full overflow-hidden">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide min-h-[1rem] items-center justify-center sm:justify-start">
              {displayTechnologies.map((tech, index) => (
                <span
                  key={tech}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0",
                    "bg-gradient-to-r from-neutral-100/80 to-neutral-50/80 dark:from-neutral-800/80 dark:to-neutral-700/80",
                    "text-neutral-700 dark:text-neutral-200",
                    "border border-neutral-200/60 dark:border-neutral-600/60",
                    "hover:shadow-lg hover:scale-110 hover:from-primary/20 hover:to-primary/10",
                    "hover:border-primary/40 hover:text-primary dark:hover:text-primary-foreground",
                    "transition-all duration-300 cursor-default backdrop-blur-sm",
                    "transform-gpu"
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