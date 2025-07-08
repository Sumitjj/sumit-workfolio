"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Code, Award, Users } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { projects } from "@/data/portfolio";
import { Project } from "@/types";

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

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header with smooth animation */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            What I've Built
          </h2>
          <p className={`text-muted-foreground text-lg mt-4 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            Featuring my best work and recent development projects
          </p>
        </div>

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

        {/* Professional Highlights with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: Code,
              title: "Expert Development",
              description: "Specialized in Salesforce Commerce Cloud with 9+ years of enterprise experience",
              color: "primary"
            },
            {
              icon: Award,
              title: "Certified Professional",
              description: "Salesforce B2C Commerce Cloud certified with proven track record",
              color: "green-500"
            },
            {
              icon: Users,
              title: "Client Success",
              description: "Delivered successful solutions for enterprise clients worldwide",
              color: "blue-500"
            }
          ].map((item, index) => (
            <div
              key={item.title}
              className={`text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
                }`}
              style={{
                transitionDelay: `${1200 + index * 200}ms`
              }}
            >
              <div className={`w-12 h-12 bg-${item.color}/10 rounded-xl flex items-center justify-center mx-auto mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}`} />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
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