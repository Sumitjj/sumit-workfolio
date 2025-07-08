"use client";

import React, { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { skillGroups } from "@/data/portfolio";
import { useInView } from "react-intersection-observer";
import type { Skill, SkillGroup } from "@/types";

function SkillCard({ skill }: { skill: Skill }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const Icon = skill.icon;

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-in-out transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
    >
      <div className="flex items-center space-x-4 p-4 h-14 bg-card rounded-xl border border-border/20 group hover:border-primary/50 hover:shadow-lg transition-all">
        {Icon && (
          <div className="flex-shrink-0">
            <Icon className="w-5 h-5 text-primary group-hover:scale-70 transition-transform" />
          </div>
        )}
        <h4 className="flex-1 font-semibold text-foreground text-sm">{skill.name}</h4>
      </div>
    </div>
  );
}

function CategorySection({ group, isInitiallyOpen }: { group: SkillGroup, isInitiallyOpen: boolean }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const CategoryIcon = group.icon;

  return (
    <div ref={ref} className={`transition-opacity duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className="flex justify-between items-center cursor-pointer mb-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          <CategoryIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg sm:text-xl">{group.title}</h3>
        </div>
        <HiChevronRight
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-90" : ""
            }`}
        />
      </div>
      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {group.skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-background">
      <div className="container mx-auto px-8 space-y-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">What’s in My Dev Kit</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical capabilities and tools I use to build modern web solutions.
          </p>
        </div>
        {skillGroups.map((group, index) => (
          <CategorySection
            key={group.title}
            group={group}
            isInitiallyOpen={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
