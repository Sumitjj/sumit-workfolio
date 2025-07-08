"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronRight,
  Code2,
  Server,
  Monitor,
  Users
} from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { skills } from "@/data/portfolio";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  count: number;
}

const skillCategories: Record<string, SkillCategory> = {
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
  // Professional gradient combinations
  const getGradient = (index: number) => {
    const gradients = [
      'from-[#4F46E5] to-[#7C3AED]', // Indigo to Purple
      'from-[#0EA5E9] to-[#2563EB]', // Sky to Blue
      'from-[#10B981] to-[#059669]', // Emerald to Green
      'from-[#F59E0B] to-[#D97706]', // Amber to Yellow
      'from-[#EC4899] to-[#BE185D]', // Pink to Rose
      'from-[#6366F1] to-[#4F46E5]'  // Violet to Indigo
    ];
    return gradients[index % gradients.length];
  };

  // Professional background gradients with lower opacity
  const getBgGradient = (index: number) => {
    const gradients = [
      'from-indigo-500/[0.08] to-purple-500/[0.08]',
      'from-sky-500/[0.08] to-blue-500/[0.08]',
      'from-emerald-500/[0.08] to-green-500/[0.08]',
      'from-amber-500/[0.08] to-yellow-500/[0.08]',
      'from-pink-500/[0.08] to-rose-500/[0.08]',
      'from-violet-500/[0.08] to-indigo-500/[0.08]'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div
      className={`group relative transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
        }`}
      style={{
        transitionDelay: isVisible ? `${index * 30}ms` : '0ms',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div
        className={`relative flex items-center h-10 sm:h-11 bg-gradient-to-br ${getBgGradient(index)} 
          backdrop-blur-sm border border-border/40 rounded-xl px-2.5 sm:px-3
          transition-all duration-300 hover:border-border/60 group-hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] 
          group-hover:-translate-y-0.5 overflow-hidden`}
        style={{
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Icon Container */}
        <div className="relative shrink-0">
          <div className={`w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br ${getGradient(index)} 
            rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm`}>
            <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
          </div>

          {/* Subtle glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} blur-lg opacity-20 
            scale-150 transition-opacity duration-300 group-hover:opacity-30`} />
        </div>

        {/* Skill Name - Now with truncation and better spacing */}
        <span className="text-[13px] sm:text-sm font-medium text-foreground/90 group-hover:text-foreground 
          transition-colors duration-200 px-2 sm:px-2.5 truncate">
          {skill.name}
        </span>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
            transition-opacity duration-700 bg-gradient-to-r from-transparent 
            via-white/[0.05] to-transparent -skew-x-12 translate-x-[-100%] 
            group-hover:translate-x-[100%] ease-out" />
        </div>
      </div>
    </div>
  );
}

/**
 * Elegant Category Section Component
 */
interface CategorySectionProps {
  categoryKey: string;
  isOpen: boolean;
  onToggle: () => void;
}

function CategorySection({ categoryKey, isOpen, onToggle }: CategorySectionProps) {
  const category = skillCategories[categoryKey];
  const categorySkills = skills.filter(skill => skill.category === categoryKey);
  const IconComponent = category.icon;
  const [maxHeight, setMaxHeight] = useState<number>(0);

  // Calculate rows based on viewport breakpoints with increased height
  const calculateMaxHeight = useCallback(() => {
    const skillHeight = 48; // Approximate height of each skill item
    const padding = 32; // Additional padding
    return categorySkills.length * skillHeight + padding;
  }, [categorySkills.length]);

  // Update height on mount and window resize
  useEffect(() => {
    const updateHeight = () => {
      setMaxHeight(calculateMaxHeight());
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [calculateMaxHeight]);

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

      {/* Skills Grid Layout */}
      <div
        className={`transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-hidden ${isOpen ? 'mb-12' : ''}`}
        style={{
          maxHeight: isOpen ? maxHeight : 0,
          opacity: isOpen ? 1 : 0,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div
          className={`py-6 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
          style={{
            transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.98)',
            transformOrigin: 'top center',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
 * Skill Category Section Component
 */
export function SkillCategorySection({ categoryKey }: { categoryKey: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <CategorySection
      categoryKey={categoryKey}
      isOpen={isOpen}
      onToggle={handleToggle}
    />
  );
}

/**
 * Main Skills Section Component
 */
export function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Technical Expertise</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Skills & Technologies
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized in Salesforce Commerce Cloud with expertise in modern web technologies
            </p>
          </div>
        </Fade>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {Object.keys(skillCategories).map((categoryKey) => (
            <SkillCategorySection key={categoryKey} categoryKey={categoryKey} />
          ))}
        </div>
      </div>
    </section>
  );
} 