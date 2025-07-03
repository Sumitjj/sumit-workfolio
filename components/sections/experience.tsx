"use client";

import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import {
    Calendar,
    MapPin,
    Briefcase,
    CheckCircle,
    Clock,
    Building2,
    Code2,
    ArrowRight,
    TrendingUp,
    Award,
    Users,
    Zap
} from "lucide-react";
import { experiences } from "@/data/portfolio";
import { cn } from "@/lib/utils";

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
        return `${displayYears} year${displayYears !== 1 ? 's' : ''} ${displayMonths} month${displayMonths !== 1 ? 's' : ''}`;
    }
}

/**
 * Animated Counter Component
 */
interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationId: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
}

/**
 * Technology Skill Meter Component
 */
interface SkillMeterProps {
    technologies: string[];
    isVisible: boolean;
}

function SkillMeter({ technologies, isVisible }: SkillMeterProps) {
    const topTechnologies = technologies.slice(0, 5); // Show top 5 technologies

    // Predefined skill levels for consistent SSR/hydration
    const skillLevels: Record<string, number> = {
        // Backend Technologies
        'Node.js': 95,
        'Express.js': 90,
        'PHP': 88,
        'Laravel': 85,
        'Python': 80,
        'Django': 78,
        'MongoDB': 85,
        'MySQL': 90,
        'PostgreSQL': 82,
        'Redis': 75,

        // Frontend Technologies
        'React': 92,
        'Next.js': 88,
        'Vue.js': 85,
        'JavaScript': 95,
        'TypeScript': 88,
        'HTML': 95,
        'CSS': 92,
        'Tailwind CSS': 90,
        'SCSS': 85,

        // Mobile & Other
        'React Native': 80,
        'Flutter': 75,
        'Docker': 82,
        'AWS': 78,
        'Git': 90,
        'GraphQL': 75,
        'REST API': 92,
        'Microservices': 80,
        'CI/CD': 75,
        'Testing': 82,

        // Default for unknown technologies
        'default': 80
    };

    return (
        <div className="space-y-3">
            {topTechnologies.map((tech, index) => {
                const skillLevel = skillLevels[tech] || skillLevels['default'];

                return (
                    <div key={tech} className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{tech}</span>
                            <span className="text-primary font-medium">{skillLevel}%</span>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                                style={{
                                    width: isVisible ? `${skillLevel}%` : '0%',
                                    transitionDelay: `${index * 100}ms`
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/**
 * Enhanced Experience Card Component
 */
interface ExperienceCardProps {
    experience: typeof experiences[0];
    index: number;
    isLast: boolean;
}

function ExperienceCard({ experience, index, isLast }: ExperienceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [skillsVisible, setSkillsVisible] = useState(false);
    const duration = calculateDuration(experience.startDate, experience.endDate);
    const dateRange = `${formatDate(experience.startDate)} - ${experience.current ? 'Present' : formatDate(experience.endDate!)}`;
    const isEven = index % 2 === 0;

    useEffect(() => {
        const timer = setTimeout(() => setSkillsVisible(true), 800 + index * 200);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <Fade direction="up" delay={index * 200} triggerOnce>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Timeline Center Column */}
                <div className="absolute left-4 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-0 bottom-0 w-0.5 z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/20 rounded-full" />
                    {!isLast && (
                        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-primary/40 to-transparent animate-pulse rounded-full" />
                    )}
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-2 lg:left-1/2 lg:transform lg:-translate-x-1/2 top-8 w-6 h-6 z-20">
                    <div className="relative w-full h-full">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/80 to-secondary border-4 border-background shadow-xl">
                            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                        <div className="absolute inset-2 rounded-full bg-white/40 animate-pulse" />
                    </div>
                </div>

                {/* Card Content */}
                <div className={cn(
                    "ml-12 lg:ml-0",
                    isEven ? "lg:order-1 lg:text-right lg:pr-8" : "lg:order-2 lg:pl-8"
                )}>
                    <div
                        className={cn(
                            "relative overflow-hidden rounded-3xl transition-all duration-700 hover:shadow-2xl hover:shadow-primary/20",
                            "bg-gradient-to-br from-background/90 via-background/80 to-background/70 backdrop-blur-xl",
                            "border border-border/30 hover:border-primary/40",
                            "p-6 sm:p-8 hover:-translate-y-2 hover:scale-[1.02] group",
                            isHovered ? "shadow-2xl shadow-primary/20" : ""
                        )}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Animated Background Particles */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full animate-pulse" />
                            <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                            <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                            <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-secondary/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                        </div>

                        {/* Enhanced Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03]">
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `
                                        radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), 
                                        radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                                        radial-gradient(circle at 40% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)
                                    `,
                                    backgroundSize: '200px 200px, 150px 150px, 180px 180px'
                                }}
                            />
                        </div>

                        {/* Enhanced Status Badges */}
                        <div className={cn(
                            "absolute top-4 flex flex-col gap-2",
                            isEven ? "lg:left-4" : "right-4"
                        )}>
                            {experience.current && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 border border-green-500/20 animate-pulse">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Current
                                </div>
                            )}
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {duration}
                            </div>
                        </div>

                        {/* Enhanced Header Section */}
                        <div className="relative z-10 mb-8">
                            <div className="mb-4">
                                <h3 className={cn(
                                    "text-xl sm:text-2xl lg:text-3xl font-bold mb-2 transition-all duration-300",
                                    "bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent",
                                    "group-hover:from-primary group-hover:via-secondary group-hover:to-primary"
                                )}>
                                    {experience.position}
                                </h3>

                                <div className={cn(
                                    "flex flex-wrap items-center gap-4 text-muted-foreground",
                                    isEven ? "lg:justify-end" : "lg:justify-start"
                                )}>
                                    <div className="flex items-center">
                                        <Building2 className="w-4 h-4 mr-2 text-primary" />
                                        <span className="font-semibold text-foreground text-lg">{experience.company}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                                        <span className="text-sm">{dateRange}</span>
                                    </div>
                                </div>
                            </div>

                            <p className={cn(
                                "text-muted-foreground leading-relaxed text-base",
                                isEven ? "lg:text-right" : "lg:text-left"
                            )}>
                                {experience.description}
                            </p>
                        </div>

                        {/* Enhanced Technologies Section */}
                        <div className="relative z-10 space-y-6">
                            {/* Technology Tags */}
                            <div>
                                <div className={cn(
                                    "flex items-center mb-4",
                                    isEven ? "lg:justify-end" : "lg:justify-start"
                                )}>
                                    <Code2 className="w-5 h-5 mr-2 text-primary" />
                                    <span className="text-base font-semibold text-foreground">Core Technologies</span>
                                </div>
                                <div className={cn(
                                    "flex flex-wrap gap-2",
                                    isEven ? "lg:justify-end" : "lg:justify-start"
                                )}>
                                    {experience.technologies.map((tech, techIndex) => (
                                        <span
                                            key={tech}
                                            className={cn(
                                                "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-500",
                                                "bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground border border-primary/20",
                                                "hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-primary-foreground",
                                                "hover:scale-110 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
                                            )}
                                            style={{
                                                animationDelay: `${techIndex * 100}ms`,
                                                transitionDelay: `${techIndex * 50}ms`
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Skill Progress Meters */}
                            <div className={cn(
                                "transition-all duration-500 overflow-hidden",
                                isHovered ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className={cn(
                                    "flex items-center mb-3",
                                    isEven ? "lg:justify-end" : "lg:justify-start"
                                )}>
                                    <Zap className="w-4 h-4 mr-2 text-secondary" />
                                    <span className="text-sm font-medium text-foreground">Proficiency Overview</span>
                                </div>
                                <SkillMeter technologies={experience.technologies} isVisible={skillsVisible && isHovered} />
                            </div>
                        </div>

                        {/* Enhanced Hover Effects */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                        {/* Multi-layered Shine Effect */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]" />
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1200 bg-gradient-to-r from-transparent via-primary/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]" style={{ transitionDelay: '200ms' }} />
                    </div>
                </div>

                {/* Empty Column for Alternating Layout - Desktop Only */}
                <div className={cn(
                    "hidden lg:block",
                    isEven ? "lg:order-2" : "lg:order-1"
                )}>
                    {/* Connection Line */}
                    <div className={cn(
                        "w-8 h-0.5 bg-gradient-to-r from-primary/50 to-primary/30 mt-8",
                        isEven ? "ml-auto" : "mr-auto"
                    )}>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/60 animate-pulse" />
                    </div>
                </div>
            </div>
        </Fade>
    );
}

/**
 * Enhanced Professional Experience Section
 */
export function ExperienceSection() {
    const totalExperience = calculateDuration(new Date(2016, 0, 1));
    const totalYears = parseInt(totalExperience.split(' ')[0]);

    return (
        <section id="experience" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
            {/* Enhanced Premium Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background/5 to-secondary/8" />

                {/* Multiple Animated Gradient Orbs */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />

                {/* Floating Background Elements */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{ animationDuration: '4s' }} />
                <div className="absolute top-40 right-20 w-1 h-1 bg-secondary/30 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-primary/25 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Enhanced Section Header */}
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-16 sm:mb-20">
                        <div className="flex items-center justify-center mb-8">
                            <div className="relative">
                                <Briefcase className="w-12 h-12 text-primary animate-pulse" />
                                <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-lg animate-pulse" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-bounce" />
                            </div>
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold ml-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                                Experience
                            </h2>
                        </div>

                        {/* Animated Statistics */}
                        <div className="flex justify-center items-center gap-8 mb-6">
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-primary">
                                    <AnimatedCounter end={totalYears} suffix="+" />
                                </div>
                                <p className="text-sm text-muted-foreground">Years</p>
                            </div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-secondary">
                                    <AnimatedCounter end={experiences.length} />
                                </div>
                                <p className="text-sm text-muted-foreground">Companies</p>
                            </div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
                            <div className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-green-500">
                                    <AnimatedCounter end={50} suffix="+" />
                                </div>
                                <p className="text-sm text-muted-foreground">Projects</p>
                            </div>
                        </div>

                        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                            Journey through my professional evolution, building scalable solutions and leading innovative development teams
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto rounded-full animate-pulse" />
                    </div>
                </Fade>

                {/* Enhanced Experience Timeline */}
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
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
