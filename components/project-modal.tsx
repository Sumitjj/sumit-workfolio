"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Github, Code, Lightbulb, Target, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Project modal component displaying detailed project information
 */
export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative scroll-optimized">
        {/* Hero Image */}
        <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Project badges */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex flex-wrap gap-2">
            {project.featured && (
              <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-yellow-500 text-white shadow-lg">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Featured Project
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
            {project.githubUrl && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.open(project.githubUrl, "_blank")}
                className="bg-background/90 backdrop-blur-sm hover:bg-background text-xs sm:text-sm"
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                View Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="sm"
                onClick={() => window.open(project.liveUrl, "_blank")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Title and Categories */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-muted text-muted-foreground border"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 rounded-lg bg-primary/10 mr-3">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">About This Project</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {project.longDescription || project.description}
            </p>
          </div>
          
          {/* Key Features */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 rounded-lg bg-green-500/10 mr-3">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {getProjectFeatures(project).map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Technologies */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10 mr-3">
                <Code className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Technologies Used</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center justify-center p-2 sm:p-3 rounded-lg bg-primary/10 text-primary font-medium text-xs sm:text-sm hover-scale transition-transform duration-200 border border-primary/20"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
          
          {/* Implementation Highlights */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-foreground">Implementation Highlights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-medium text-primary text-sm sm:text-base">Frontend Architecture</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {getFrontendHighlights(project).map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-medium text-primary text-sm sm:text-base">Backend & Infrastructure</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {getBackendHighlights(project).map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// Helper functions to generate realistic project details
function getProjectFeatures(project: Project): string[] {
  const features = {
    "E-Commerce Platform": [
      "User authentication & authorization",
      "Product catalog with search & filters",
      "Shopping cart & checkout flow",
      "Stripe payment integration",
      "Admin dashboard for inventory",
      "Order tracking & management",
      "Real-time inventory updates",
      "Mobile-responsive design"
    ],
    "AI-Powered Dashboard": [
      "Machine learning algorithms",
      "Real-time data visualization",
      "Predictive analytics",
      "Interactive charts & graphs",
      "Data export capabilities",
      "Custom reporting tools",
      "Multi-tenant architecture",
      "API integration"
    ],
    "Mobile Banking App": [
      "Biometric authentication",
      "End-to-end encryption",
      "Real-time transactions",
      "Account management",
      "Bill payment integration",
      "Transaction history",
      "Push notifications",
      "Offline capability"
    ],
    "Social Media Platform": [
      "Real-time messaging",
      "Video sharing & streaming",
      "Live streaming capabilities",
      "Content moderation",
      "User profiles & following",
      "Real-time notifications",
      "Media compression",
      "Scalable architecture"
    ]
  };
  
  return features[project.title as keyof typeof features] || [
    "Modern user interface",
    "Responsive design",
    "Performance optimization",
    "Security implementation",
    "API integration",
    "Real-time updates"
  ];
}

function getFrontendHighlights(project: Project): string[] {
  const highlights = [
    "Component-based architecture",
    "State management with hooks",
    "Responsive design implementation",
    "Performance optimization",
    "Accessibility compliance",
    "Modern CSS techniques"
  ];
  
  if (project.technologies.includes("Next.js")) {
    highlights.push("Server-side rendering", "Static site generation");
  }
  
  if (project.technologies.includes("TypeScript")) {
    highlights.push("Type-safe development");
  }
  
  return highlights.slice(0, 4);
}

function getBackendHighlights(project: Project): string[] {
  const highlights = [
    "RESTful API design",
    "Database optimization",
    "Authentication & security",
    "Error handling & logging",
    "Performance monitoring",
    "Scalable architecture"
  ];
  
  if (project.technologies.includes("PostgreSQL")) {
    highlights.push("Complex query optimization");
  }
  
  if (project.technologies.includes("MongoDB")) {
    highlights.push("NoSQL data modeling");
  }
  
  if (project.technologies.includes("AWS")) {
    highlights.push("Cloud infrastructure", "Auto-scaling");
  }
  
  return highlights.slice(0, 4);
} 