"use client";

import React, { memo, useMemo } from "react";
import { Fade } from "react-awesome-reveal";
import {
    FiCalendar,
    FiClock,
    FiTrendingUp,
    FiAward,
    FiZap,
    FiStar
} from "react-icons/fi";
import { HiBuildingOffice2 } from "react-icons/hi2";

import { FaRoute } from "react-icons/fa";
import { experiences } from "@/data/experienceData";

// Production-ready constants - Optimized for performance
const ANIMATION_CONFIG = {
    CARD_DELAY_BASE: 100, // Reduced from 200ms
    TECH_DELAY_BASE: 30,  // Reduced from 60ms
    TECH_DISPLAY_LIMIT: 12,
    CARD_SPACING: {
        mobile: 'mb-8',
        desktop: 'sm:mb-12'
    }
} as const;

const STYLING_CONFIG = {
    COMPANY_ICON_SIZE: {
        mobile: 'w-12 h-12',
        desktop: 'sm:w-14 sm:h-14'
    },
    BORDER_RADIUS: 'rounded-2xl',
    SHADOW_HOVER: 'hover:shadow-xl hover:shadow-primary/6' // Reduced shadow intensity
} as const;

// Enhanced TypeScript interfaces
interface ExperienceData {
    id: string;
    company: string;
    position: string;
    description: string;
    technologies: string[];
    startDate: Date;
    endDate?: Date;
    current: boolean;
}

interface TimelineNodeProps {
    isLast: boolean;
    isCurrent: boolean;
    index: number;
}

interface TechnologyTagProps {
    tech: string;
    delay: number;
    index: number;
}

/**
 * Format date to readable string
 */
function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });
}

/**
 * Calculate experience duration
 */
function calculateDuration(startDate: Date, endDate?: Date): string {
    const end = endDate || new Date();
    const years = end.getFullYear() - startDate.getFullYear();
    const months = end.getMonth() - startDate.getMonth();

    let totalMonths = years * 12 + months;
    if (totalMonths <= 0) totalMonths = 1;

    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;

    if (displayYears === 0) {
        return `${displayMonths} month${displayMonths !== 1 ? 's' : ''}`;
    } else if (displayMonths === 0) {
        return `${displayYears} year${displayYears !== 1 ? 's' : ''}`;
    } else {
        return `${displayYears}y ${displayMonths}m`;
    }
}

/**
 * Optimized Timeline Node Component
 */
const TimelineNode = memo<TimelineNodeProps>(({ isLast, isCurrent }) => (
    <>
        {/* Timeline Connection Line */}
        {!isLast && (
            <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-neutral-300 via-neutral-200 to-transparent dark:from-neutral-600 dark:via-neutral-700 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 via-neutral-100 to-transparent dark:from-neutral-500 dark:via-neutral-600 blur-[1px] opacity-50" />
            </div>
        )}

        {/* Optimized Timeline Node */}
        <div
            className="absolute left-6 top-8 w-4 h-4 rounded-full border-2 border-primary bg-white dark:bg-neutral-900 z-10 group-hover:scale-110 transition-transform duration-200 shadow-md"
            style={{ willChange: 'transform' }}
        >
            <div className="absolute inset-0 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200" />
            {isCurrent && (
                <div className="absolute -inset-1 rounded-full border-2 border-primary/30 animate-ping" />
            )}
        </div>
    </>
));
TimelineNode.displayName = 'TimelineNode';

/**
 * Optimized Technology Tag with Performance-First Hover Effects
 */
const TechnologyTag = memo<TechnologyTagProps>(({ tech, delay }) => {
    const hoverClasses = useMemo(() =>
        "group/tech relative inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 cursor-default opacity-0 animate-fade-in transition-all duration-200 hover:scale-105 hover:bg-primary/8 hover:border-primary/30 hover:text-primary hover:font-medium hover:shadow-md"
        , []);

    return (
        <span
            className={hoverClasses}
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards',
                willChange: 'transform, opacity' // Optimize for animations
            }}
        >
            {/* Single optimized hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 rounded-lg" />

            {/* Optimized text content */}
            <span className="relative z-10 transition-colors duration-200">
                {tech}
            </span>
        </span>
    );
});
TechnologyTag.displayName = 'TechnologyTag';

/**
 * Optimized Experience Card Component
 */
interface ExperienceCardProps {
    experience: ExperienceData;
    index: number;
    isLast: boolean;
}

const ExperienceCard = memo<ExperienceCardProps>(({ experience, index, isLast }) => {
    const duration = useMemo(() =>
        calculateDuration(experience.startDate, experience.endDate),
        [experience.startDate, experience.endDate]
    );

    const dateRange = `${formatDate(experience.startDate)} - ${experience.current ? 'Present' : formatDate(experience.endDate!)}`;

    const displayTechnologies = useMemo(() =>
        experience.technologies.slice(0, ANIMATION_CONFIG.TECH_DISPLAY_LIMIT),
        [experience.technologies]
    );

    const remainingTechCount = experience.technologies.length - ANIMATION_CONFIG.TECH_DISPLAY_LIMIT;

    const cardClasses = useMemo(() =>
        `group/card relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm ${STYLING_CONFIG.BORDER_RADIUS} border border-neutral-200/80 dark:border-neutral-700/80 hover:border-primary/40 transition-all duration-300 ${STYLING_CONFIG.SHADOW_HOVER} hover:-translate-y-0.5 overflow-hidden`,
        []
    );

    return (
        <Fade direction="up" delay={index * ANIMATION_CONFIG.CARD_DELAY_BASE} triggerOnce cascade={false}>
            <div className="relative group">
                <TimelineNode
                    isLast={isLast}
                    isCurrent={experience.current}
                    index={index}
                />

                {/* Professional Experience Card */}
                <div className={`ml-16 ${ANIMATION_CONFIG.CARD_SPACING.mobile} ${ANIMATION_CONFIG.CARD_SPACING.desktop}`}>
                    <div className={cardClasses} style={{ willChange: 'transform, box-shadow' }}>

                        {/* Simplified Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/1 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                        {/* Card Header - Company & Position */}
                        <div className="relative p-4 sm:p-6 pb-3 sm:pb-4 border-b border-neutral-100/80 dark:border-neutral-800/80">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                {/* Company Info */}
                                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                                    <div
                                        className={`${STYLING_CONFIG.COMPANY_ICON_SIZE.mobile} ${STYLING_CONFIG.COMPANY_ICON_SIZE.desktop} rounded-xl flex items-center justify-center shadow-md group-hover/card:shadow-lg transition-all duration-300`}
                                    >
                                        <HiBuildingOffice2 className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                    <div className="flex-1 min-w-0 ">
                                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1 group-hover/card:text-primary transition-colors duration-300 truncate dark:text-emerald-300">
                                            {experience.company}
                                        </h3>
                                        <h4 className="text-base sm:text-lg font-semibold text-neutral-600 leading-tight dark:text-emerald-300">
                                            {experience.position}
                                        </h4>
                                    </div>
                                </div>

                                {/* Status & Duration - Parallel Layout */}
                                <div className="flex flex-row sm:flex-row items-center gap-2 flex-shrink-0">
                                    {experience.current && (
                                        <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-50  dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Current</span>
                                        </div>
                                    )}
                                    <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                                        <FiClock className="w-3 h-3 dark:text-white" />
                                        <span className="whitespace-nowrap dark:text-white">{duration}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
                                <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="font-medium">{dateRange}</span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="relative p-4 sm:p-6">
                            {/* Description */}
                            <div className="mb-5 sm:mb-6">
                                <h5 className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-emerald-300 mb-2 uppercase tracking-wide">
                                    Role Overview
                                </h5>
                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm sm:text-base">
                                    {experience.description}
                                </p>
                            </div>

                            {/* Technologies */}
                            <div className="relative">
                                <h5 className="text-xs sm:text-sm font-semibold text-neutral-700 dark:text-emerald-300 mb-3 uppercase tracking-wide">
                                    Technologies & Tools
                                </h5>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {displayTechnologies.map((tech, techIndex) => (
                                        <TechnologyTag
                                            key={`${experience.id}-${tech}`}
                                            tech={tech}
                                            delay={(index * ANIMATION_CONFIG.CARD_DELAY_BASE) + (techIndex * ANIMATION_CONFIG.TECH_DELAY_BASE)}
                                            index={techIndex}
                                        />
                                    ))}
                                    {remainingTechCount > 0 && (
                                        <span className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium text-neutral-500 dark:text-neutral-500 bg-neutral-100/50 dark:bg-neutral-800/50">
                                            +{remainingTechCount} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Subtle Accent Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    </div>
                </div>
            </div>
        </Fade>
    );
});
ExperienceCard.displayName = 'ExperienceCard';

/**
 * Experience Stats Component
 */
function ExperienceStats() {
    const stats = [
        {
            icon: FiTrendingUp,
            label: "Years in Delivery",
            value: "9+",
            color: "#3b82f6",
            gradient: "from-blue-500/10 via-blue-600/5 to-purple-600/10",
            border: "border-blue-500/20",
            hoverBorder: "hover:border-blue-500/30",
            hoverShadow: "hover:shadow-blue-500/15",
            iconGradient: "from-blue-500 to-purple-600",
            textGradient: "linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6)"
        },
        {
            icon: HiBuildingOffice2,
            label: "Tech Workplaces",
            value: "3",
            color: "#10b981",
            gradient: "from-emerald-500/10 via-green-600/5 to-teal-600/10",
            border: "border-emerald-500/20",
            hoverBorder: "hover:border-emerald-500/30",
            hoverShadow: "hover:shadow-emerald-500/15",
            iconGradient: "from-emerald-500 to-green-600",
            textGradient: "linear-gradient(to right, #10b981, #059669, #10b981)"
        },
        {
            icon: FiAward,
            label: "Leadership Roles",
            value: "3",
            color: "#8b5cf6",
            gradient: "from-violet-500/10 via-purple-600/5 to-fuchsia-600/10",
            border: "border-violet-500/20",
            hoverBorder: "hover:border-violet-500/30",
            hoverShadow: "hover:shadow-violet-500/15",
            iconGradient: "from-violet-500 to-fuchsia-600",
            textGradient: "linear-gradient(to right, #8b5cf6, #d946ef, #8b5cf6)"
        },
        {
            icon: FiZap,
            label: "Solutions Delivered",
            value: "15+",
            color: "#f59e0b",
            gradient: "from-amber-500/10 via-orange-600/5 to-yellow-600/10",
            border: "border-amber-500/20",
            hoverBorder: "hover:border-amber-500/30",
            hoverShadow: "hover:shadow-amber-500/15",
            iconGradient: "from-amber-500 to-orange-600",
            textGradient: "linear-gradient(to right, #f59e0b, #d97706, #f59e0b)"
        }
    ];

    return (
        <Fade direction="up" delay={100} triggerOnce>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="group cursor-pointer"
                    >
                        <div
                            className={`relative bg-gradient-to-br ${stat.gradient} backdrop-blur-sm border ${stat.border} rounded-3xl p-6 transition-all duration-300 ease-out hover:shadow-xl ${stat.hoverShadow} hover:scale-[1.02] ${stat.hoverBorder}`}
                            style={{ transformOrigin: 'center center', contain: 'layout style' }}
                        >
                            {/* Animated background gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            <div className="relative text-center">
                                {/* Icon with glow effect */}
                                <div
                                    className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out"
                                    style={{
                                        background: stat.textGradient,
                                        boxShadow: `0 8px 24px -8px ${stat.color}40`
                                    }}
                                >
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Number with animated gradient */}
                                <div className="text-3xl sm:text-4xl font-black mb-2">
                                    <span
                                        className="bg-gradient-to-r bg-clip-text text-transparent bg-300% animate-gradient"
                                        style={{ backgroundImage: stat.textGradient }}
                                    >
                                        {stat.value}
                                    </span>
                                </div>

                                {/* Label */}
                                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
                                <FiStar className="w-4 h-4" style={{ color: stat.color }} />
                            </div>
                            <div className="absolute bottom-3 left-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                <FiStar className="w-3 h-3" style={{ color: stat.color }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fade>
    );
}

/**
 * Professional Experience Section - Performance Optimized
 */
export function ExperienceSection() {
    const experienceList = useMemo(() =>
        experiences.map((exp, index) => ({
            ...exp,
            isLast: index === experiences.length - 1
        })),
        []
    );

    return (
        <section id="experience" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
            {/* Optimized Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/30 via-transparent to-primary/3 dark:from-neutral-950/30 dark:to-primary/5" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <Fade direction="up" triggerOnce cascade={false} delay={0}>
                    <div className="text-center mb-12 lg:mb-16">
                        {/* Icon and Title Container */}
                        <div className="flex flex-col items-center justify-center mb-6">
                            {/* Icon Container */}
                            <div
                                className="p-3 sm:p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-lg mb-4"
                            >
                                <FaRoute className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-3 text-center leading-tight">
                                Experience Timeline
                            </h2>
                        </div>

                        {/* Description */}
                        <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed px-4">
                            A progressive journey through enterprise technology, specializing in Salesforce Commerce Cloud solutions and digital transformation initiatives
                        </p>
                    </div>
                </Fade>

                {/* Experience Stats */}
                <ExperienceStats />

                {/* Career Journey Timeline - Optimized Loading */}
                <div className="max-w-5xl mx-auto relative">
                    {/* Experience Timeline */}
                    <div className="space-y-0">
                        {experienceList.map((experience, index) => (
                            <ExperienceCard
                                key={experience.id}
                                experience={experience}
                                index={index}
                                isLast={experience.isLast}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
