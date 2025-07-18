/**
 * Production-ready project card component
 * Features dynamic color extraction, responsive design, and smooth animations
 */

"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ProjectBackgroundGradient } from "@/lib/aceternity/project-background-gradient";
import { Project } from "@/types";
import { cn } from "@/lib/helpers/utils";
import { getProjectColorsFromImage, type ExtractedColors } from "@/lib/aceternity/image-color-extractor";
import {
  generateCardStyles,
  generateTagStyles,
  getDisplayTitle,
  getTopTechnologies,
  getImageContainerClass,
  getContentClass,
  getHeaderClass,
  getTitleClass,
  getDescriptionClass,
  getDescriptionTextClass,
  getFooterClass,
  getCardClass,
  getButtonClass,
  getIconClass,
  getTagClass,
  getAccentTagClass,
} from "@/lib/aceternity/project-card-helpers";
import { Fade } from "react-awesome-reveal";

// Types
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  className?: string;
  variant?: "featured" | "compact";
  showAnimation?: boolean;
}

/**
 * Project card component with modern hover effects and variant support
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  className,
  variant = "featured",
  showAnimation = true,
}) => {
  // State management
  const [projectColors, setProjectColors] = useState<ExtractedColors | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized values
  const isFeatured = useMemo(() => variant === "featured", [variant]);

  // Helper functions
  const handleLinkClick = useCallback((e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, "_blank");
  }, []);

  // Color extraction effect
  useEffect(() => {
    const extractColors = async () => {
      try {
        setIsLoading(true);
        const colors = await getProjectColorsFromImage(project.title, project.image);
        setProjectColors(colors);
      } catch (error) {
        console.warn('Failed to extract colors for project:', project.title, error);
      } finally {
        setIsLoading(false);
      }
    };

    extractColors();
  }, [project.title, project.image]);

  // Memoized styles and classes
  const cardStyle = useMemo(() => generateCardStyles(projectColors), [projectColors]);
  const cardClass = useMemo(() => getCardClass(className), [className]);
  const imageContainerClass = useMemo(() => getImageContainerClass(isFeatured), [isFeatured]);
  const contentClass = useMemo(() => getContentClass(isFeatured), [isFeatured]);
  const headerClass = useMemo(() => getHeaderClass(isFeatured), [isFeatured]);
  const titleClass = useMemo(() => getTitleClass(isFeatured), [isFeatured]);
  const descriptionClass = useMemo(() => getDescriptionClass(isFeatured), [isFeatured]);
  const descriptionTextClass = useMemo(() => getDescriptionTextClass(isFeatured), [isFeatured]);
  const footerClass = useMemo(() => getFooterClass(isFeatured), [isFeatured]);

  // Memoized tag styles
  const secondaryTagStyles = useMemo(() => generateTagStyles(projectColors, 'secondary'), [projectColors]);
  const accentTagStyles = useMemo(() => generateTagStyles(projectColors, 'accent'), [projectColors]);

  // Render function
  const renderCard = () => (
    <div className="relative isolate contain-layout h-full">
      <ProjectBackgroundGradient
        containerClassName="h-full w-full"
        className="h-full w-full"
        projectTitle={project.title}
        imageSrc={project.image}
      >
        <div
          className={cardClass}
          style={cardStyle}
          onClick={onClick}
          tabIndex={0}
          role="button"
          aria-label={`View details for project ${project.title}`}
          data-project={project.title}
        >
          {/* Project Image */}
          <div className={imageContainerClass}>
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

          {/* Card Content */}
          <CardContent className={contentClass}>
            {/* Header Section */}
            <div className={headerClass}>
              <h3 className={titleClass}>
                {isFeatured ? project.title : getDisplayTitle(project.title)}
              </h3>
              <div className="flex space-x-1 ml-2 flex-shrink-0">
                {project.githubUrl && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => handleLinkClick(e, project.githubUrl!)}
                    className={getButtonClass(isFeatured, 'github')}
                    tabIndex={-1}
                    aria-label="View on GitHub"
                  >
                    <Github className={getIconClass(isFeatured)} />
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => handleLinkClick(e, project.liveUrl!)}
                    className={getButtonClass(isFeatured, 'live')}
                    tabIndex={-1}
                    aria-label="View Live Project"
                  >
                    <ExternalLink className={getIconClass(isFeatured)} />
                  </Button>
                )}
              </div>
            </div>

            {/* Description */}
            <div className={descriptionClass}>
              {Array.isArray(project.description) ? (
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs sm:text-sm pl-2">
                  {project.description.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className={descriptionTextClass}>
                  {project.description}
                </p>
              )}
            </div>

            {/* Footer Section - Technologies */}
            <div className={footerClass}>
              <div className={isFeatured ? "flex flex-nowrap items-center min-h-[1.5rem] justify-evenly w-full" : "flex gap-2.5 flex-wrap"}>
                {getTopTechnologies(project.technologies, project.featured).map((tech) => (
                  <span
                    key={tech}
                    className={getTagClass(isFeatured)}
                    style={secondaryTagStyles}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </div>
      </ProjectBackgroundGradient>
    </div>
  );

  // Return with or without animation
  if (showAnimation) {
    return (
      <Fade triggerOnce cascade damping={0.15}>
        {renderCard()}
      </Fade>
    );
  }

  return renderCard();
};

// Export for external use
export default ProjectCard;