"use client";

import React, { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { skillGroups } from "@/data/portfolio";
import { useInView } from "react-intersection-observer";
import type { Skill, SkillGroup } from "@/types";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";

function SkillIcon({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.12, boxShadow: "0 4px 24px 0 rgba(99,102,241,0.15)" }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center min-w-[80px] max-w-[110px] mx-auto"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center shadow-md mb-0.5 transition-all">
        {Icon && <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />}
      </div>
      <span className="text-xs sm:text-sm text-center text-muted-foreground font-medium truncate w-full mt-0">{skill.name}</span>
    </motion.div>
  );
}

function SkillCategoryCard({ group, align, singleRow }: { group: SkillGroup, align?: "left" | "center" | "right", singleRow?: boolean }) {
  const CategoryIcon = group.icon;
  let alignClass = "";
  if (align === "left") alignClass = "md:justify-start";
  if (align === "right") alignClass = "md:justify-end";
  if (align === "center") alignClass = "justify-center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-gradient-to-br from-background/80 to-muted/60 rounded-2xl shadow-lg p-5 sm:p-7 flex flex-col items-center w-full max-w-xl mx-auto ${alignClass}`}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 shadow">
        <CategoryIcon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 text-center">{group.title}</h3>
      {singleRow ? (
        <div className="flex flex-nowrap gap-x-10 gap-y-6 w-full justify-center">
          {group.skills.map((skill) => (
            <SkillIcon key={skill.name} skill={skill} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-10 gap-y-4 w-full">
          {group.skills.map((skill) => (
            <SkillIcon key={skill.name} skill={skill} />
          ))}
        </div>
      )}
    </motion.div>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground flex items-center justify-center gap-3">
            <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            Tech Stack & Expertise
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
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
