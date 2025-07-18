"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Code, Award, Users, Briefcase, Zap } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { projects } from "@/data/portfolio";
import { Project } from "@/types";
import { Fade } from "react-awesome-reveal";
import { Building2, Star, Sparkles } from "lucide-react";
const SALESFORCE_BLUE = "#0070d2";

/**
 * Clean and professional projects section with smooth scroll animations
 */
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Get top 3 featured projects
  const featuredProjects = useMemo(() => {
    return projects.filter(project => project.featured).slice(0, 3);
  }, []);

  // Get remaining non-featured projects
  const remainingProjects = useMemo(() => {
    return projects.filter(project => !project.featured);
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Intersection Observer for smooth animations
  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Reusable stat card for project highlights
  interface ProjectStatCardProps {
    icon: React.ElementType;
    value: number | string;
    label: string;
    color: string;
    gradient: string;
    textGradient: string;
    shadowColor: string;
  }
  const ProjectStatCard: React.FC<ProjectStatCardProps> = ({
    icon: Icon,
    value,
    label,
    color,
    gradient,
    textGradient,
    shadowColor
  }) => (
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
        <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
          <Star className="w-5 h-5" style={{ color: shadowColor }} />
        </div>
        <div className="absolute bottom-3 left-3 opacity-20 group-hover:opacity-40 transition-opacity">
          <Sparkles className="w-4 h-4" style={{ color: shadowColor }} />
        </div>
      </div>
    </div>
  );

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
            <div className="flex flex-col items-center justify-center gap-2 mb-4 sm:flex-row sm:gap-3">
              <div
                className="p-2 rounded-xl border"
                style={{
                  backgroundColor: `${SALESFORCE_BLUE}10`,
                  borderColor: `${SALESFORCE_BLUE}30`
                }}
              >
                <Briefcase className="w-6 h-6" style={{ color: SALESFORCE_BLUE }} />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                What I've Built
              </h2>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              A showcase of innovations, certifications, and commerce-driven solutions.
            </p>
          </div>
        </Fade>

        {/* projects Stats */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {[
                {
                  icon: Zap,
                  value: projects.length + 1,
                  label: "Scalable Projects Architected",
                  color: "#0070d2",
                  gradient: "from-blue-500/10 via-blue-600/5 to-purple-600/10",
                  textGradient: "linear-gradient(to right, #0070d2, #6f42c1, #0070d2)",
                  shadowColor: "#0070d2",
                },
                {
                  icon: Users,
                  value: "10",
                  label: "Global Clients Empowered",
                  color: "#059669",
                  gradient: "from-emerald-500/10 via-green-600/5 to-teal-600/10",
                  textGradient: "linear-gradient(to right, #059669, #14b8a6, #059669)",
                  shadowColor: "#059669",
                },
                {
                  icon: Building2,
                  value: "30",
                  label: "Brands Digitally Transformed",
                  color: "#8b5cf6",
                  gradient: "from-violet-500/10 via-purple-600/5 to-fuchsia-600/10",
                  textGradient: "linear-gradient(to right, #8b5cf6, #d946ef, #8b5cf6)",
                  shadowColor: "#8b5cf6",
                },
              ].map((stat, idx) => (
                <ProjectStatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </Fade>

        {/* Featured Projects Grid - Keep Original Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 grid-equal-height">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`featured-project-card transition-all duration-700 ease-out ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
                }`}
              style={{
                transitionDelay: `${400 + index * 150}ms`
              }}
            >
              <ProjectCard
                project={project}
                onClick={() => handleProjectClick(project)}
                className="h-full project-card-wrapper"
                variant="featured"
              />
            </div>
          ))}
        </div>

        {/* Remaining Projects - Smaller Height with Technologies */}
        {remainingProjects.length > 0 && (
          <div className="mb-10 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 grid-equal-height">
              {remainingProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`remaining-project-card transition-all duration-700 ease-out ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                    }`}
                  style={{
                    transitionDelay: `${850 + index * 80}ms`
                  }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => handleProjectClick(project)}
                    className="h-full project-card-wrapper"
                    variant="compact"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Highlights - Clean Minimal Redesign */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8">
          {[
            {
              icon: Code,
              title: "Expert Development",
              description: "Specialized in Salesforce Commerce Cloud with 9+ years of enterprise experience",
            },
            {
              icon: Award,
              title: "Certified Professional",
              description: "Salesforce B2C Commerce Cloud certified with proven track record",
            },
            {
              icon: Users,
              title: "Client Success",
              description: "Delivered successful solutions for enterprise clients worldwide",
            }
          ].map((item, index) => (
            <div
              key={item.title}
              className={
                `group flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-border/30 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:scale-[1.03] hover:rotate-[-1deg]`
              }
              style={{ transitionDelay: `${1200 + index * 200}ms` }}
            >
              {/* Icon - no background, no glow */}
              <div className={`flex items-center justify-center w-14 h-14 mb-4 text-emerald-600 dark:text-emerald-400 transition-all duration-300 group-hover:scale-110`}>
                <item.icon className={`w-10 h-10 stroke-2`} />
              </div>
              <h4 className={`text-xl font-extrabold mb-2 text-emerald-600 dark:text-emerald-400 tracking-tight`}> {/* Larger, bolder title */}
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
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
