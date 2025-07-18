"use client";

import React from "react";
const SALESFORCE_BLUE = "#0070d2";
import { Fade } from "react-awesome-reveal";
import {
    Calendar,
    Briefcase,
    Building2,
    Clock,
    TrendingUp,
    Award,
    Zap,
    Star,
    Sparkles
} from "lucide-react";
import { experiences } from "@/data/portfolio";

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
 * Modern Experience Card Component
 */
interface ExperienceCardProps {
    experience: typeof experiences[0];
    index: number;
    isLast: boolean;
}

function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
    const duration = calculateDuration(experience.startDate, experience.endDate);
    const dateRange = `${formatDate(experience.startDate)} - ${experience.current ? 'Present' : formatDate(experience.endDate!)}`;

    return (
        <Fade direction="up" delay={index * 100} triggerOnce>
            <div className="relative group">
                {/* Timeline Line */}
                {!isLast && (
                    <div
                        className="absolute left-4 top-12 w-0.5 h-full -mb-8"
                        style={{
                            background: `linear-gradient(to bottom, ${SALESFORCE_BLUE}, ${SALESFORCE_BLUE}40)`
                        }}
                    />
                )}

                {/* Timeline Node */}
                <div className="flex items-start gap-4">
                    {/* Compact Node */}
                    <div className="relative flex-shrink-0 mt-3">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md relative z-10"
                            style={{ backgroundColor: SALESFORCE_BLUE }}
                        >
                            <Building2 className="w-4 h-4 text-white" />
                        </div>
                        {experience.current && (
                            <div
                                className="absolute inset-0 w-8 h-8 rounded-lg animate-pulse"
                                style={{ backgroundColor: `${SALESFORCE_BLUE}30` }}
                            />
                        )}
                    </div>

                    {/* Compact Experience Card */}
                    <div className="flex-1 pb-6">
                        <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/30">

                            {/* Compact Card Content */}
                            <div className="p-4 sm:p-5">
                                {/* Status & Duration - Inline */}
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <div
                                        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
                                        style={{ backgroundColor: SALESFORCE_BLUE }}
                                    >
                                        <Clock className="w-3 h-3" />
                                        {duration}
                                    </div>
                                    {experience.current && (
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Current
                                        </div>
                                    )}
                                </div>

                                {/* Position & Company - Compact */}
                                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
                                    {experience.position}
                                </h3>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="w-4 h-4" style={{ color: SALESFORCE_BLUE }} />
                                        <span className="font-semibold text-foreground">{experience.company}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                        <Calendar className="w-3 h-3" />
                                        <span>{dateRange}</span>
                                    </div>
                                </div>

                                {/* Compact Description */}
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                    {experience.description}
                                </p>

                                {/* Compact Technologies */}
                                <div className="flex flex-wrap gap-1.5">
                                    {experience.technologies.slice(0, 6).map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 rounded-md text-xs font-medium bg-muted/60 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {experience.technologies.length > 6 && (
                                        <span className="px-2 py-1 rounded-md text-xs font-medium text-muted-foreground">
                                            +{experience.technologies.length - 6} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted/30">
                                <div
                                    className="h-full transition-all duration-1000 ease-out"
                                    style={{
                                        backgroundColor: SALESFORCE_BLUE,
                                        width: '100%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
}

/**
 * Experience Stats Component
 */
function ExperienceStats() {
    const stats = [
        {
            icon: TrendingUp,
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
            icon: Building2,
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
            icon: Award,
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
            icon: Zap,
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
                                <Star className="w-4 h-4" style={{ color: stat.color }} />
                            </div>
                            <div className="absolute bottom-3 left-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Sparkles className="w-3 h-3" style={{ color: stat.color }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Fade>
    );
}

/**
 * Professional Experience Section - Redesigned
 */
export function ExperienceSection() {
    return (
        <section id="experience" className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Compact Section Header */}
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center justify-center gap-2 mb-4 sm:flex-row sm:gap-3">
                            <div
                                className="p-2 rounded-xl border"
                                style={{
                                    backgroundColor: `${SALESFORCE_BLUE}10`,
                                    borderColor: `${SALESFORCE_BLUE}30`
                                }}
                            >
                                <Briefcase className="w-6 h-6" style={{ color: SALESFORCE_BLUE }} />
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                                Professional Milestones
                            </h2>
                        </div>

                        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                            Transforming e-commerce experiences through innovative Salesforce Commerce Cloud solutions
                        </p>
                    </div>
                </Fade>

                {/* Experience Stats */}
                <ExperienceStats />

                {/* Experience Timeline */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {experiences.map((experience, index) => (
                            <ExperienceCard
                                key={experience.id}
                                experience={experience}
                                index={index}
                                isLast={index === experiences.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
