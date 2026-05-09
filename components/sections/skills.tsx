"use client";

import React from "react";
import { skillGroups } from "@/data/skillsData";
import type { Skill, SkillGroup } from "@/types";
import { BrainCircuit } from "lucide-react";

// Reusable Glowing Line Effect Component
const GlowingLineEffect = () => {
  return (
    <div className="relative flex w-full flex-1 items-center justify-center isolate">
      {/* Combined Glowing Line with Effects */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 h-0.5 w-[32rem] max-w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-50" />

      {/* Combined Glow and Light Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
        {/* Line Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent blur-sm z-40" />

        {/* Natural Light Cone Spread */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 w-[108%] h-[84%] blur-md"
          style={{
            background: "radial-gradient(ellipse 84% 120% at 50% 0%, rgba(34, 211, 238, 0.15) 0%, rgba(147, 197, 253, 0.08) 40%, rgba(59, 130, 246, 0.04) 70%, transparent 100%)"
          }}
        />

        {/* Inner Light Cone */}
        <div
          className="absolute top-5 left-1/2 -translate-x-1/2 w-[84%] h-[72%] blur-sm"
          style={{
            background: "radial-gradient(ellipse 72% 96% at 50% 0%, rgba(103, 232, 249, 0.12) 0%, rgba(96, 165, 250, 0.06) 50%, transparent 80%)"
          }}
        />

        {/* Subtle Center Glow */}
        <div
          className="absolute top-7 left-1/2 -translate-x-1/2 w-[60%] h-[60%] blur-lg"
          style={{
            background: "radial-gradient(ellipse 48% 72% at 50% 0%, rgba(165, 243, 252, 0.08) 0%, rgba(219, 234, 254, 0.04) 60%, transparent 100%)"
          }}
        />
      </div>
    </div>
  );
};

function SkillIcon({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div
      className="flex flex-col items-center min-w-[80px] max-w-[110px] mx-auto relative group touch-manipulation"
    >
      <div className="motion-icon w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-md mb-0.5 transition-transform duration-200 ease-out">
        {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{ color: skill.color || '#FFFFFF' }} />}
      </div>
      <span className="skill-touch-label mt-2 max-w-[100px] text-center text-[11px] font-semibold leading-tight text-muted-foreground">
        {skill.name}
      </span>
      {/* Tooltip */}
      <div
        className="skill-hover-tooltip absolute left-1/2 -translate-x-1/2 top-12 mt-4 z-50 px-3 py-1 rounded-lg border border-border/40 bg-background/95 text-foreground text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-md"
        style={{ minWidth: "max-content" }}
      >
        {skill.name}
      </div>
    </div>
  );
}

function SkillCategoryCard({ group, singleRow }: { group: SkillGroup, align?: "left" | "center" | "right", singleRow?: boolean }) {
  const CategoryIcon = group.icon;
  return (
    <div className="relative">
      {/* Category Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="section-icon-mono motion-icon relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex items-center justify-center mb-3">
          <CategoryIcon className="relative w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center">{group.title}</h3>
      </div>

      {/* Glowing Line Animation Container */}
      <div className="relative flex flex-col items-center justify-start overflow-hidden bg-transparent w-full rounded-md">
        <GlowingLineEffect />

        {/* Skills Grid - Positioned below the glowing line */}
        <div className={`relative z-50 flex flex-col items-center w-full ${singleRow ? 'pt-6 px-0' : 'pt-6 px-4'}`}>
          <div className={`relative z-50 ${singleRow ? 'w-full' : 'w-full max-w-lg mx-auto'}`}>
            {singleRow ? (
              <div className="flex flex-nowrap justify-center items-center gap-3 sm:gap-4 md:gap-6 w-full overflow-x-auto scrollbar-hide pb-2 touch-pan-x">
                {group.skills.map((skill, index) => (
                  <div key={`${skill.name}-${index}`} className="flex-shrink-0 min-w-[80px] max-w-[110px]">
                    <SkillIcon skill={skill} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full place-items-center">
                {group.skills.map((skill, index) => (
                  <SkillIcon key={`${skill.name}-${index}`} skill={skill} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  // Reorder categories: Backend, Leadership, Frontend
  const backend = skillGroups.find(g => g.title.toLowerCase().includes("backend"));
  const frontend = skillGroups.find(g => g.title.toLowerCase().includes("frontend"));
  const leadership = skillGroups.find(g => g.title.toLowerCase().includes("leadership"));
  return (
    <section id="skills" className="relative w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-black to-background overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-6 md:px-10 space-y-10 sm:space-y-12">
        <div className="text-center space-y-3">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="section-icon-mono motion-icon relative p-3 sm:p-4 rounded-2xl border mb-4">
              <BrainCircuit className="relative w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Tech Stack & Expertise
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools & technologies I use to build fast, scalable, and modern digital experiences.
          </p>
        </div>
        {/* Row for Backend (left) and Frontend (right) */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 sm:gap-10 md:gap-16 w-full">
          {backend && <SkillCategoryCard group={backend} align="left" />}
          {frontend && <SkillCategoryCard group={frontend} align="right" />}
        </div>
        {/* Row for Leadership/Process (centered) */}
        {leadership && (
          <div className="w-full">
            {/* Desktop: Single row layout */}
            <div className="hidden lg:block">
              <SkillCategoryCard group={leadership} align="center" singleRow />
            </div>
            {/* Mobile & Tablet: Grid layout */}
            <div className="lg:hidden">
              <SkillCategoryCard group={leadership} align="center" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
