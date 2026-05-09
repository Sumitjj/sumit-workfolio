"use client";

import React, { useState, useMemo } from "react";
import { FiUsers, FiZap, FiHome } from "react-icons/fi";
import { Handshake, PanelsTopLeft, Rocket, ShieldCheck } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { MetricCard } from "@/components/ui/metric-card";
import { projects } from "@/data/projectsData";
import { Project } from "@/types";

const Fade = ({ children }: { children: React.ReactNode; [key: string]: unknown }) => <>{children}</>;

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
    icon: Rocket,
    title: "Expert Development",
    description: "Specialized in Salesforce Commerce Cloud with 10+ years of enterprise experience",
    accent: "#22d3ee",
  },
  {
    icon: ShieldCheck,
    title: "Certified Professional",
    description: "Salesforce B2C Commerce Cloud certified with proven track record",
    accent: "#10b981",
  },
  {
    icon: Handshake,
    title: "Client Success",
    description: "Delivered successful solutions for enterprise clients worldwide",
    accent: "#8b5cf6",
  }
];

/**
 * Clean and professional projects section with optimized reusable components
 */
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reusable utility functions as arrow functions
  const getAnimationDelay = (index: number, variant: keyof typeof ANIMATION_CONFIGS): string => {
    const config = ANIMATION_CONFIGS[variant];
    return `${config.baseDelay + index * config.increment}ms`;
  };

  const getAnimationClasses = (isVisible: boolean): string => {
    return `transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-100'}`;
  };

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
      <div className={`mb-10 sm:mb-12 lg:mb-14 ${className}`}>
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
                className={`${variant}-project-card section-reveal ${getAnimationClasses(true)} ${gridColumnClass}`}
                style={{
                  transitionDelay: getAnimationDelay(index, variant),
                  opacity: 1,
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12 auto-rows-fr">
      {PROFESSIONAL_HIGHLIGHTS.map((item, index) => (
        <div
          key={item.title}
          className="group motion-card relative overflow-hidden rounded-2xl border border-border/30 bg-card/70 p-6 text-left shadow-lg shadow-black/5 transition-[border-color,box-shadow,transform,background-color] duration-200 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
          style={{
            transitionDelay: getAnimationDelay(index, 'highlights'),
            boxShadow: `0 18px 42px -34px ${item.accent}`
          }}
        >
          <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: item.accent }} />
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-background/70" style={{ color: item.accent }}>
              <item.icon className="h-6 w-6 stroke-2" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">0{index + 1}</span>
          </div>
          <h4 className="text-xl font-extrabold mb-2 text-foreground tracking-tight">
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

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-8">
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="section-icon-mono motion-icon relative p-3 sm:p-4 rounded-2xl border mb-4">
                <PanelsTopLeft className="relative w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {statsWithValues.map((stat) => (
                <MetricCard
                  key={stat.label}
                  icon={stat.icon}
                  value={`${stat.value}+`}
                  label={stat.label}
                  accent={stat.color}
                />
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
