"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { FiCode, FiAward, FiUsers, FiZap, FiHome } from "react-icons/fi";
import { Sparkles } from "lucide-react";
import { FiMonitor } from "react-icons/fi";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { projects } from "@/data/portfolio";
import { Project } from "@/types";
import { Fade } from "react-awesome-reveal";

// Animation configuration constants
const ANIMATION_CONFIGS = {
  featured: { baseDelay: 400, increment: 150, duration: 700 },
  compact: { baseDelay: 850, increment: 80, duration: 700 },
  highlights: { baseDelay: 1200, increment: 200, duration: 300 }
} as const;

// Project statistics data
const PROJECT_STATS = [
  {
    icon: FiZap,
    label: "Scalable Projects Architected",
    color: "#0070d2",
    gradient: "from-blue-500/10 via-blue-600/5 to-purple-600/10",
    textGradient: "linear-gradient(to right, #0070d2, #6f42c1, #0070d2)",
    shadowColor: "#0070d2",
  },
  {
    icon: FiUsers,
    label: "Global Clients Empowered",
    color: "#059669",
    gradient: "from-emerald-500/10 via-green-600/5 to-teal-600/10",
    textGradient: "linear-gradient(to right, #059669, #14b8a6, #059669)",
    shadowColor: "#059669",
  },
  {
    icon: FiHome,
    label: "Brands Digitally Transformed",
    color: "#8b5cf6",
    gradient: "from-violet-500/10 via-purple-600/5 to-fuchsia-600/10",
    textGradient: "linear-gradient(to right, #8b5cf6, #d946ef, #8b5cf6)",
    shadowColor: "#8b5cf6",
  },
];

// Professional highlights data
const PROFESSIONAL_HIGHLIGHTS = [
  {
    icon: FiCode,
    title: "Expert Development",
    description: "Specialized in Salesforce Commerce Cloud with 9+ years of enterprise experience",
  },
  {
    icon: FiAward,
    title: "Certified Professional",
    description: "Salesforce B2C Commerce Cloud certified with proven track record",
  },
  {
    icon: FiUsers,
    title: "Client Success",
    description: "Delivered successful solutions for enterprise clients worldwide",
  }
];

/**
 * Clean and professional projects section with optimized reusable components
 */
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Reusable utility functions as arrow functions
  const getAnimationDelay = (index: number, variant: keyof typeof ANIMATION_CONFIGS): string => {
    const config = ANIMATION_CONFIGS[variant];
    return `${config.baseDelay + index * config.increment}ms`;
  };

  const getAnimationClasses = (isVisible: boolean): string => {
    return `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`;
  };

  // Reusable Project Statistics Card component
  const ProjectStatCard: React.FC<{
    icon: React.ElementType;
    value: number | string;
    label: string;
    gradient: string;
    textGradient: string;
    shadowColor: string;
  }> = ({ icon: Icon, value, label, gradient, textGradient, shadowColor }) => (
    <div className="group cursor-pointer">
      <div
        className={`relative bg-gradient-to-br ${gradient} backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300 ease-out hover:shadow-xl hover:scale-102`}
        style={{
          transformOrigin: 'center center',
          contain: 'layout style',
          boxShadow: `0 8px 24px -8px ${shadowColor}40`
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <div className="relative text-center">
          <div
            className="mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out"
            style={{
              background: textGradient,
              boxShadow: `0 8px 24px -8px ${shadowColor}40`
            }}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="text-4xl sm:text-5xl font-black mb-2 min-h-[3rem] flex items-center justify-center">
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent bg-300% animate-gradient"
              style={{ backgroundImage: textGradient }}
            >
              {value}+
            </span>
          </div>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-3 right-3 opacity-50 group-hover:opacity-60 transition-opacity animate-spin-slow">
          <Sparkles className="w-5 h-5" style={{ color: shadowColor }} />
        </div>
        <div className="absolute bottom-3 left-3 opacity-40 group-hover:opacity-40 transition-opacity animate-spin-slow">
          <Sparkles className="w-4 h-4" style={{ color: shadowColor }} />
        </div>
      </div>
    </div>
  );

  // Reusable Animated Project Grid component
  const AnimatedProjectGrid: React.FC<{
    projects: Project[];
    variant: "featured" | "compact";
    className?: string;
  }> = ({ projects, variant, className = "" }) => {
    const gridLayout = variant === "featured"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr";

    if (projects.length === 0) return null;

    return (
      <div className={`mb-12 sm:mb-16 lg:mb-20 ${className}`}>
        <div className={gridLayout}>
          {projects.map((project, index) => {
            // For non-featured projects with 10 items, center the last 2 items in 4-column layout
            const isLastRowItem = variant === "compact" && projects.length === 10 && index >= 8;
            const gridColumnClass = isLastRowItem
              ? (index === 8 ? 'xl:col-start-2' : 'xl:col-start-3')
              : '';

            return (
              <div
                key={project.id}
                className={`${variant}-project-card ${getAnimationClasses(true)} ${gridColumnClass}`}
                style={{
                  transitionDelay: getAnimationDelay(index, variant),
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(12px)'
                }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project)}
                  variant={variant}
                  className="h-full w-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Reusable Professional Highlights component
  const ProfessionalHighlights: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 auto-rows-fr">
      {PROFESSIONAL_HIGHLIGHTS.map((item, index) => (
        <div
          key={item.title}
          className="group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-border/30 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:scale-[1.03] hover:rotate-[-1deg]"
          style={{
            transitionDelay: getAnimationDelay(index, 'highlights')
          }}
        >
          <div className="flex items-center justify-center w-14 h-14 mb-4 transition-all duration-300 group-hover:scale-110">
            <item.icon className={`w-10 h-10 stroke-2 ${index === 0 ? 'text-green-500' :
              index === PROFESSIONAL_HIGHLIGHTS.length - 1 ? 'text-orange-500' :
                'text-blue-500'
              }`} />
          </div>
          <h4 className="text-xl font-extrabold mb-2 text-white-600 dark:text-white-400 tracking-tight">
            {item.title}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );

  // Memoized project filtering
  const { featuredProjects, remainingProjects, statsWithValues } = useMemo(() => {
    const featured = projects.filter(project => project.featured).slice(0, 3);
    const remaining = projects.filter(project => !project.featured);

    // Add dynamic values to stats
    const statsData = PROJECT_STATS.map((stat, index) => ({
      ...stat,
      value: index === 0 ? projects.length + 1 : index === 1 ? "10" : "30"
    }));

    return {
      featuredProjects: featured,
      remainingProjects: remaining,
      statsWithValues: statsData
    };
  }, []);

  // Event handlers
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Intersection Observer for smooth animations - Mobile optimized
  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.05, // More sensitive threshold for mobile
        rootMargin: '100px 0px -50px 0px' // Larger root margin for mobile
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Fallback: Set visible after a short delay if observer doesn't trigger
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Force visibility on mount for mobile reliability
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="p-3 sm:p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-lg mb-4">
                <FiMonitor className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                What I&apos;ve Built
              </h2>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of innovations, certifications, and commerce-driven solutions.
            </p>
          </div>
        </Fade>

        {/* Project Stats */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {statsWithValues.map((stat) => (
                <ProjectStatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </Fade>

        {/* Featured Projects Grid */}
        <AnimatedProjectGrid
          projects={featuredProjects}
          variant="featured"
        />

        {/* Remaining Projects Grid */}
        <AnimatedProjectGrid
          projects={remainingProjects}
          variant="compact"
        />

        {/* Professional Highlights */}
        <ProfessionalHighlights />
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
