"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Github, X, Tag, Code2, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Clean and professional project modal component with theme-based design
 */
export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    if (!project) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="relative bg-background">
                {/* Banner Image */}
                <div className="relative h-72 overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="absolute top-6 right-6 h-10 w-10 rounded-full bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-200 border border-border/50 shadow-lg"
                    >
                        <X className="h-5 w-5" />
                    </Button>

                    {/* Featured Badge - Top Center */}
                    {project.featured && (
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-medium shadow-lg">
                                <span className="mr-2">⭐</span>
                                Featured Project
                            </div>
                        </div>
                    )}

                    {/* Project Title & Actions */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-end justify-between">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                                    {project.title}
                                </h1>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {project.categories.map((category) => (
                                        <span
                                            key={category}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 ml-6">
                                {project.githubUrl && (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => window.open(project.githubUrl, "_blank")}
                                        className="bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-200 border border-border/50 shadow-lg"
                                    >
                                        <Github className="h-4 w-4 mr-2" />
                                        Code
                                    </Button>
                                )}
                                {project.liveUrl && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => window.open(project.liveUrl, "_blank")}
                                        className="h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg"
                                        title="Live Demo"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="p-8 space-y-10">
                    {/* Project Overview */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <Tag className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground">Project Overview</h2>
                        </div>
                        <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm">
                            <p className="text-foreground leading-relaxed text-lg">
                                {project.longDescription || project.description}
                            </p>
                        </div>
                    </section>

                    {/* Key Features */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground">Key Features</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getProjectFeatures(project).map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary mt-2.5 flex-shrink-0" />
                                        <p className="text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300">
                                            {feature}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Third Party Implementations */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                <Code2 className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground">Third Party Integrations</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {getThirdPartyIntegrations(project).map((integration, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-xl bg-card border border-border/50 hover:border-accent transition-all duration-300 hover:shadow-md"
                                >
                                    <div className="text-center">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mx-auto mb-3">
                                            <span className="text-accent-foreground font-semibold text-sm">
                                                {integration.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-foreground mb-1">{integration.name}</h3>
                                        <p className="text-sm text-muted-foreground">{integration.purpose}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Technologies */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                <Layers className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground">Technologies Used</h2>
                        </div>
                        <div className="space-y-6">
                            {/* Frontend Technologies */}
                            {getFrontendTechnologies(project).length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                        Frontend
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {getFrontendTechnologies(project).map((tech) => (
                                            <div
                                                key={tech}
                                                className="flex items-center justify-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-300 font-medium text-sm hover:scale-105 transition-transform duration-200"
                                            >
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Backend Technologies */}
                            {getBackendTechnologies(project).length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                        Backend
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {getBackendTechnologies(project).map((tech) => (
                                            <div
                                                key={tech}
                                                className="flex items-center justify-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 text-blue-700 dark:text-blue-300 font-medium text-sm hover:scale-105 transition-transform duration-200"
                                            >
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Other Technologies */}
                            {getOtherTechnologies(project).length > 0 && (
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                                        Tools & Services
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {getOtherTechnologies(project).map((tech) => (
                                            <div
                                                key={tech}
                                                className="flex items-center justify-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 text-purple-700 dark:text-purple-300 font-medium text-sm hover:scale-105 transition-transform duration-200"
                                            >
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </Modal>
    );
}

// Helper functions for enhanced project information
function getProjectFeatures(project: Project): string[] {
    const features = {
        "E-Commerce Platform": [
            "Secure user authentication with multi-factor verification",
            "Advanced product search with real-time filtering",
            "Streamlined checkout process with guest options",
            "Integrated payment gateway with multiple providers",
            "Real-time inventory tracking and alerts",
            "Comprehensive admin dashboard with analytics"
        ],
        "AI-Powered Dashboard": [
            "Machine learning data processing engine",
            "Interactive real-time visualizations",
            "Predictive analytics with forecasting",
            "Custom report generation and scheduling",
            "Multi-tenant architecture support",
            "Advanced data export capabilities"
        ],
        "Mobile Banking App": [
            "Biometric authentication (Face ID/Fingerprint)",
            "End-to-end transaction encryption",
            "Real-time balance and transaction updates",
            "Integrated bill payment system",
            "Push notifications for account activity",
            "Offline mode for basic operations"
        ],
        "Social Media Platform": [
            "Real-time messaging with media support",
            "Video streaming and live broadcasting",
            "Advanced content moderation system",
            "Customizable user profiles and feeds",
            "Scalable media storage and CDN",
            "Community features and group management"
        ]
    };

    return features[project.title as keyof typeof features] || [
        "Modern responsive user interface design",
        "Performance optimized architecture",
        "Comprehensive security implementation",
        "RESTful API integration",
        "Real-time data synchronization",
        "Cross-platform compatibility"
    ];
}

function getThirdPartyIntegrations(project: Project): Array<{ name: string, purpose: string }> {
    const integrations = {
        "E-Commerce Platform": [
            { name: "Stripe", purpose: "Payment Processing" },
            { name: "SendGrid", purpose: "Email Services" },
            { name: "Cloudinary", purpose: "Image Management" },
            { name: "Google Analytics", purpose: "User Analytics" }
        ],
        "AI-Powered Dashboard": [
            { name: "OpenAI", purpose: "AI/ML Processing" },
            { name: "Chart.js", purpose: "Data Visualization" },
            { name: "Redis", purpose: "Caching Layer" },
            { name: "WebSocket", purpose: "Real-time Updates" }
        ],
        "Mobile Banking App": [
            { name: "Plaid", purpose: "Bank Integration" },
            { name: "Twilio", purpose: "SMS Verification" },
            { name: "AWS KMS", purpose: "Encryption Keys" },
            { name: "Firebase", purpose: "Push Notifications" }
        ],
        "Social Media Platform": [
            { name: "AWS S3", purpose: "Media Storage" },
            { name: "Socket.io", purpose: "Real-time Chat" },
            { name: "FFmpeg", purpose: "Video Processing" },
            { name: "Moderator", purpose: "Content Filter" }
        ]
    };

    return integrations[project.title as keyof typeof integrations] || [
        { name: "AWS", purpose: "Cloud Infrastructure" },
        { name: "Redis", purpose: "Caching & Sessions" },
        { name: "Stripe", purpose: "Payment Processing" }
    ];
}

function getFrontendTechnologies(project: Project): string[] {
    const frontendTechs = ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "SCSS", "Styled Components"];
    return project.technologies.filter(tech => frontendTechs.includes(tech));
}

function getBackendTechnologies(project: Project): string[] {
    const backendTechs = ["Node.js", "Express.js", "PHP", "Laravel", "Python", "Django", "Ruby", "Rails", "Java", "Spring", "C#", ".NET"];
    return project.technologies.filter(tech => backendTechs.includes(tech));
}

function getOtherTechnologies(project: Project): string[] {
    const frontendTechs = ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "SCSS", "Styled Components"];
    const backendTechs = ["Node.js", "Express.js", "PHP", "Laravel", "Python", "Django", "Ruby", "Rails", "Java", "Spring", "C#", ".NET"];
    const excludedTechs = [...frontendTechs, ...backendTechs];
    return project.technologies.filter(tech => !excludedTechs.includes(tech));
}