"use client";

import React from "react";
import { skillGroups } from "@/data/portfolio";
import type { Skill, SkillGroup } from "@/types";
import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi";

// Reusable Glowing Line Effect Component
const GlowingLineEffect = () => {
  return (
    <div className="relative flex w-full flex-1 items-center justify-center isolate">
      {/* Combined Glowing Line with Effects */}
      <motion.div
        initial={{ width: "2rem", opacity: 0 }}
        whileInView={{ width: "32rem", opacity: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute top-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent z-50"
      />

      {/* Combined Glow and Light Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.4,
          duration: 1.2,
          ease: "easeOut",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
      >
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
      </motion.div>
    </div>
  );
};

function SkillIcon({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      }}
      className="flex flex-col items-center min-w-[80px] max-w-[110px] mx-auto relative group touch-manipulation"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-md mb-0.5 transition-all duration-300 ease-out">
        {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" style={{ color: skill.color || '#FFFFFF' }} />}
      </div>
      {/* Tooltip */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-12 mt-4 z-50 px-3 py-1 rounded bg-background text-foreground text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
        style={{ minWidth: "max-content" }}
      >
        {skill.name}
      </div>
    </motion.div>
  );
}

function SkillCategoryCard({ group, singleRow }: { group: SkillGroup, align?: "left" | "center" | "right", singleRow?: boolean }) {
  const CategoryIcon = group.icon;
  return (
    <div className="relative">
      {/* Category Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 shadow-lg">
          <CategoryIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
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
                    <SkillIcon skill={skill} index={index} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full place-items-center">
                {group.skills.map((skill, index) => (
                  <SkillIcon key={`${skill.name}-${index}`} skill={skill} index={index} />
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
    <section id="skills" className="relative w-full py-20 bg-gradient-to-b from-background via-black to-background overflow-hidden">
      <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-6 md:px-10 space-y-14">
        <div className="text-center space-y-3">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="p-3 sm:p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-lg mb-4">
              <FiTool className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
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
