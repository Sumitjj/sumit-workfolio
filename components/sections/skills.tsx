"use client";

import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import {
  Code2,
  Server,
  Monitor,
  Users,
  ChevronRight
} from "lucide-react";
import { skills } from "@/data/portfolio";

/**
 * Skill categories with elegant styling
 */
const skillCategories = {
  backend: {
    title: "Backend & Commerce",
    icon: Server,
    description: "Server-side development and e-commerce platforms",
    count: skills.filter(skill => skill.category === "backend").length
  },
  frontend: {
    title: "Frontend & UI",
    icon: Monitor,
    description: "User interfaces and modern web experiences",
    count: skills.filter(skill => skill.category === "frontend").length
  },
  other: {
    title: "Leadership & Process",
    icon: Users,
    description: "Team management and development practices",
    count: skills.filter(skill => skill.category === "other").length
  }
};

/**
 * Individual Skill Tag Component
 */
interface SkillTagProps {
  skill: typeof skills[0];
  index: number;
  isVisible: boolean;
}

function SkillTag({ skill, index, isVisible }: SkillTagProps) {
  return (
    <div
      className={`group relative transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-3 scale-95'
        }`}
      style={{
        transitionDelay: isVisible ? `${index * 30}ms` : '0ms',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div
        className="relative bg-background/60 backdrop-blur-sm border border-border/40 rounded-lg px-4 py-2.5 transition-all duration-300 hover:bg-background/80 hover:border-border/60 hover:shadow-sm hover:-translate-y-0.5"
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-200">
          {skill.name}
        </span>
      </div>
    </div>
  );
}

/**
 * Elegant Category Section Component
 */
interface CategorySectionProps {
  categoryKey: keyof typeof skillCategories;
  isOpen: boolean;
  onToggle: () => void;
}

function CategorySection({ categoryKey, isOpen, onToggle }: CategorySectionProps) {
  const category = skillCategories[categoryKey];
  const categorySkills = skills.filter(skill => skill.category === categoryKey);
  const IconComponent = category.icon;

  return (
    <div className="w-full">
      {/* Elegant Category Header */}
      <button
        onClick={onToggle}
        className="w-full text-left group cursor-pointer transition-all duration-300 mb-6"
      >
        <div className={`flex items-center justify-between py-4 border-b transition-all duration-300 ${isOpen
          ? 'border-primary/30'
          : 'border-border/30 hover:border-border/50'
          }`}>
          <div className="flex items-center gap-4">
            <div className={`relative transition-all duration-300 ${isOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              }`}>
              <IconComponent className="w-5 h-5" />
            </div>

            <div>
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary'
                }`}>
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {category.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ChevronRight className={`w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isOpen
              ? 'rotate-90 text-primary'
              : 'text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5'
              }`} />
          </div>
        </div>
      </button>

      {/* Ultra Smooth Skills Display */}
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-hidden ${isOpen ? 'mb-8' : ''
          }`}
        style={{
          maxHeight: isOpen ? `${Math.ceil(categorySkills.length / 4) * 60 + 100}px` : '0px',
          opacity: isOpen ? 1 : 0,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div
          className={`pt-2 pb-6 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
          style={{
            transform: isOpen ? 'translateY(0px) scale(1)' : 'translateY(-20px) scale(0.98)',
            transformOrigin: 'top center',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="flex flex-wrap gap-2.5">
            {categorySkills.map((skill, index) => (
              <SkillTag
                key={skill.name}
                skill={skill}
                index={index}
                isVisible={isOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Classy Skills Section
 */
export function SkillsSection() {
  // State for tracking which categories are open
  const [openCategories, setOpenCategories] = useState<Set<keyof typeof skillCategories>>(
    new Set(['backend']) // Backend open by default
  );

  // Toggle function for individual categories
  const toggleCategory = (categoryKey: keyof typeof skillCategories) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey);
      } else {
        newSet.add(categoryKey);
      }
      return newSet;
    });
  };

  // Calculate stats
  const totalSkills = skills.length;
  const categories = Object.keys(skillCategories).length;

  return (
    <section id="skills" className="pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        {/* Elegant Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Technical Expertise</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground mb-6 tracking-tight">
              Skills & <span className="font-normal">Technologies</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive overview of my technical capabilities across full-stack development,
              with specialized expertise in modern e-commerce platforms.
            </p>
          </div>
        </Fade>

        {/* Skills Categories */}
        <div className="space-y-0">
          {(Object.keys(skillCategories) as Array<keyof typeof skillCategories>).map((categoryKey, index) => (
            <Fade key={categoryKey} direction="up" delay={index * 100} triggerOnce>
              <CategorySection
                categoryKey={categoryKey}
                isOpen={openCategories.has(categoryKey)}
                onToggle={() => toggleCategory(categoryKey)}
              />
            </Fade>
          ))}
        </div>

        {/* Elegant Footer */}
        <Fade direction="up" delay={300} triggerOnce>
          <div className="mt-16 pt-8 border-t border-border/30 text-center">
            <p className="text-sm text-muted-foreground">
              Continuously learning and adapting to emerging technologies in the rapidly evolving digital landscape.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
} 