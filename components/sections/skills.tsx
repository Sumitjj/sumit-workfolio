"use client";

import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Code2, Server, Monitor, Users } from "lucide-react";

// Salesforce Official Brand Colors - More Vibrant
const SALESFORCE_BLUE = "#0070d2";

// Technology categories with minimal structure
const techCategories = {
  "E-Commerce & Backend": {
    icon: Server,
    technologies: ["Demandware", "SFRA", "Node JS", "Express Js", "REST APIs", "MongoDB"]
  },
  "Frontend & UI": {
    icon: Monitor,
    technologies: ["JavaScript", "React", "Next.js", "TypeScript", "HTML/CSS", "Tailwind CSS"]
  },
  "Leadership & Process": {
    icon: Users,
    technologies: ["Team Leadership", "Agile/Scrum", "System Design", "Project Management", "Git", "AWS"]
  }
};



/**
 * Technology Badge Component - Ultra Minimal
 */
interface TechBadgeProps {
  technology: string;
  index: number;
}

function TechBadge({ technology, index }: TechBadgeProps) {
  return (
    <Fade direction="up" delay={index * 30} triggerOnce>
      <div
        className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
        style={{
          backgroundColor: SALESFORCE_BLUE,
          color: "white",
          transformOrigin: 'center center',
          contain: 'layout style'
        }}
      >
        {technology}
      </div>
    </Fade>
  );
}

/**
 * Minimal Skills Section Component with Tabs
 */
export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("E-Commerce & Backend");

  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: SALESFORCE_BLUE }}
              >
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Skill Sets
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to deliver scalable solutions
            </p>
          </div>
        </Fade>

        {/* Category Tabs */}
        <Fade direction="up" delay={100} triggerOnce>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(techCategories).map(([categoryName, categoryInfo]) => {
              const IconComponent = categoryInfo.icon;
              const isActive = activeCategory === categoryName;

              return (
                <button
                  key={categoryName}
                  onClick={() => setActiveCategory(categoryName)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  style={{
                    backgroundColor: isActive ? SALESFORCE_BLUE : 'transparent',
                    border: `1px solid ${isActive ? SALESFORCE_BLUE : '#e5e7eb'}`
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                  {categoryName}
                </button>
              );
            })}
          </div>
        </Fade>

        {/* Active Category Technologies */}
        <Fade direction="up" delay={200} triggerOnce key={activeCategory}>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto min-h-[120px] items-center">
            {techCategories[activeCategory as keyof typeof techCategories].technologies.map((tech, index) => (
              <TechBadge
                key={tech}
                technology={tech}
                index={index}
              />
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
} 