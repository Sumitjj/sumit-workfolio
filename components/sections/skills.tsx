"use client";

import React from "react";
import { skillGroups } from "@/data/portfolio";
import type { Skill, SkillGroup } from "@/types";
import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi";
import { LampContainer } from "@/components/ui/lamp";

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
      className="flex flex-col items-center min-w-[80px] max-w-[110px] mx-auto relative group"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-md mb-0.5 transition-all">
        {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
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
    <div>
      {/* Category Header - Outside the lamp container */}
      <div className="flex flex-col items-center mb-3">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 shadow-lg">
          <CategoryIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground text-center">{group.title}</h3>
      </div>

      {/* Lamp Container - Only for skills */}
      <div className="relative">
        <LampContainer>
          {/* Skills Grid - Positioned right below lamp bar */}
          <div className="relative z-50 w-full max-w-lg mx-auto">
            {singleRow ? (
              <div className="flex flex-wrap justify-center gap-6 w-full">
                {group.skills.map((skill, index) => (
                  <SkillIcon key={`${skill.name}-${index}`} skill={skill} index={index} />
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
        </LampContainer>
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
          <div className="flex justify-center w-full">
            <SkillCategoryCard group={leadership} align="center" singleRow />
          </div>
        )}
      </div>
    </section>
  );
}
