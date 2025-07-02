"use client";

import React, { useState, useMemo } from "react";
import { Code, Award, Users } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { projects } from "@/data/portfolio";
import { Project } from "@/types";

/**
 * Clean and professional projects section showcasing featured work
 */
export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground animate-slide-up">
            Projects
          </h2>
          <p className="text-muted-foreground text-lg mt-4 animate-slide-up delay-200">
            Featuring my best work and recent development projects
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
              className={`animate-slide-up ${
                index === 0 ? 'delay-200' : 
                index === 1 ? 'delay-300' : 
                'delay-500'
              }`}
            />
          ))}
        </div>

        {/* Remaining Projects - 4 columns layout */}
        {remainingProjects.length > 0 && (
          <div className="mb-10 sm:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {remainingProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleProjectClick(project)}
                  className={`animate-slide-up ${
                    index === 0 ? 'delay-700' :
                    index === 1 ? 'delay-700' :
                    index === 2 ? 'delay-700' :
                    index === 3 ? 'delay-700' :
                    'delay-1000'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Professional CTA Section */}
        {/* <div className="text-center mb-16 sm:mb-20 animate-slide-up delay-1000">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Let&apos;s collaborate to bring your vision to life with cutting-edge technology and expert craftsmanship.
            </p>
            <Button
              size="lg"
              className="hover-lift group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let&apos;s Work Together
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div> */}

        {/* Professional Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 animate-slide-up delay-1200">
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Expert Development</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Specialized in Salesforce Commerce Cloud with 9+ years of enterprise experience
            </p>
          </div>
          
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Certified Professional</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Salesforce B2C Commerce Cloud certified with proven track record
            </p>
          </div>
          
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-background to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Client Success</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Delivered successful solutions for enterprise clients worldwide
            </p>
          </div>
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