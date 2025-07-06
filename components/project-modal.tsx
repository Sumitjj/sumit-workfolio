"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Github, X, Tag, Code2, Layers, Zap, Calendar, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Project } from "@/types";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Modern, professional project modal with enhanced design and layout
 */
export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    if (!project) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="relative bg-gradient-to-br from-background via-background/98 to-background/95 backdrop-blur-xl">
                {/* Hero Section with Gradient Overlay */}
                <div className="relative h-80 overflow-hidden rounded-t-2xl">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Modern gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(0,112,210)]/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Close Button - Modern floating design */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20 shadow-2xl z-20"
                    >
                        <X className="h-6 w-6" />
                    </Button>

                    {/* Featured Badge - Modern design */}
                    {project.featured && (
                        <div className="absolute top-6 left-6">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[rgb(0,112,210)] to-[rgb(87,163,240)] text-white text-sm font-semibold shadow-xl backdrop-blur-sm border border-white/20">
                                <Star className="w-4 h-4 mr-2 fill-current" />
                                Featured Project
                            </div>
                        </div>
                    )}

                    {/* Project Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex items-end justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <Calendar className="w-4 h-4 text-white/80" />
                                    <span className="text-white/80 text-sm font-medium">{project.year}</span>
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                    {project.title}
                                </h1>

                                {/* Categories with modern styling */}
                                <div className="flex flex-wrap gap-2">
                                    {project.categories.map((category) => (
                                        <span
                                            key={category}
                                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/15 text-white border border-white/20 backdrop-blur-sm"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons - Modern design */}
                            <div className="flex gap-3 ml-8">
                                {project.githubUrl && (
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={() => window.open(project.githubUrl, "_blank")}
                                        className="bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/20 shadow-xl"
                                    >
                                        <Github className="h-5 w-5 mr-2" />
                                        View Code
                                    </Button>
                                )}
                                {project.liveUrl && (
                                    <Button
                                        size="lg"
                                        onClick={() => window.open(project.liveUrl, "_blank")}
                                        className="bg-gradient-to-r from-[rgb(0,112,210)] to-[rgb(87,163,240)] text-white hover:scale-105 transition-all duration-300 shadow-xl border border-white/20"
                                    >
                                        <ExternalLink className="h-5 w-5 mr-2" />
                                        Live Demo
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections - Modern card-based layout */}
                <div className="p-8 space-y-8">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[rgb(0,112,210)]/10 to-[rgb(87,163,240)]/5 border border-[rgb(0,112,210)]/20">
                            <TrendingUp className="w-8 h-8 text-[rgb(0,112,210)] mx-auto mb-3" />
                            <div className="text-2xl font-bold text-foreground mb-1">{project.technologies.length}</div>
                            <div className="text-sm text-muted-foreground">Technologies</div>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[rgb(75,202,129)]/10 to-[rgb(75,202,129)]/5 border border-[rgb(75,202,129)]/20">
                            <Users className="w-8 h-8 text-[rgb(75,202,129)] mx-auto mb-3" />
                            <div className="text-2xl font-bold text-foreground mb-1">{project.year}</div>
                            <div className="text-sm text-muted-foreground">Year Built</div>
                        </div>
                        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[rgb(254,147,57)]/10 to-[rgb(254,147,57)]/5 border border-[rgb(254,147,57)]/20">
                            <Star className="w-8 h-8 text-[rgb(254,147,57)] mx-auto mb-3" />
                            <div className="text-2xl font-bold text-foreground mb-1">{project.featured ? 'Featured' : 'Standard'}</div>
                            <div className="text-sm text-muted-foreground">Project Type</div>
                        </div>
                    </div>

                    {/* Project Overview - Enhanced design */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgb(0,112,210)] to-[rgb(87,163,240)] flex items-center justify-center shadow-lg">
                                <Tag className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Project Overview</h2>
                                <p className="text-muted-foreground">Detailed description and objectives</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm rounded-2xl p-8 border border-[rgb(0,112,210)]/20 shadow-xl">
                            <p className="text-foreground leading-relaxed text-lg">
                                {project.longDescription || project.description}
                            </p>
                        </div>
                    </section>

                    {/* Key Features - Modern grid layout */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgb(75,202,129)] to-[rgb(75,202,129)]/80 flex items-center justify-center shadow-lg">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
                                <p className="text-muted-foreground">Core functionality and capabilities</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {getProjectFeatures(project).map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-6 rounded-2xl bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border border-[rgb(75,202,129)]/20 hover:border-[rgb(75,202,129)]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[rgb(75,202,129)] to-[rgb(75,202,129)]/80 mt-2 flex-shrink-0 shadow-lg" />
                                        <p className="text-foreground leading-relaxed group-hover:text-[rgb(75,202,129)] transition-colors duration-300 font-medium">
                                            {feature}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Third Party Integrations - Enhanced cards */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgb(254,147,57)] to-[rgb(254,147,57)]/80 flex items-center justify-center shadow-lg">
                                <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Third Party Integrations</h2>
                                <p className="text-muted-foreground">External services and APIs</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getThirdPartyIntegrations(project).map((integration, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm border border-[rgb(254,147,57)]/20 hover:border-[rgb(254,147,57)]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgb(254,147,57)] to-[rgb(254,147,57)]/80 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <span className="text-white font-bold text-lg">
                                                {integration.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2 text-lg">{integration.name}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{integration.purpose}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Technologies - Modern tag layout */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgb(87,163,240)] to-[rgb(0,112,210)] flex items-center justify-center shadow-lg">
                                <Layers className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Technologies Used</h2>
                                <p className="text-muted-foreground">Technical stack and tools</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm rounded-2xl p-8 border border-[rgb(87,163,240)]/20 shadow-xl">
                            <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech, index) => (
                                    <span
                                        key={tech}
                                        className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-[rgb(0,112,210)]/10 to-[rgb(87,163,240)]/10 border border-[rgb(0,112,210)]/20 text-[rgb(0,112,210)] font-semibold text-sm hover:scale-105 hover:bg-gradient-to-r hover:from-[rgb(0,112,210)]/20 hover:to-[rgb(87,163,240)]/20 transition-all duration-200 shadow-md"
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                            animation: 'slideUp 0.5s ease-out forwards'
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
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
        "Full Beauty Brands": [
            "Advanced product catalog with smart filtering",
            "Personalized shopping experiences with AI recommendations",
            "Seamless checkout with multiple payment options",
            "Real-time inventory management and alerts",
            "Comprehensive customer account management",
            "Mobile-optimized responsive design"
        ],
        "Aquasana Water Filters": [
            "Advanced product configurators for custom solutions",
            "Subscription management with flexible scheduling",
            "Integrated customer support and live chat",
            "Water quality testing and reporting tools",
            "Installation service booking system",
            "Educational content and water health resources"
        ],
        "Lane Bryant": [
            "Size-inclusive shopping with advanced fitting guides",
            "Personalized style recommendations using AI",
            "Virtual try-on technology for better fit",
            "Inclusive sizing charts and fit calculators",
            "Style inspiration and outfit suggestions",
            "Community features for customer engagement"
        ],
        "Loreal": [
            "Virtual try-on for makeup and hair products",
            "Skin analysis tools with personalized recommendations",
            "Beauty consultation booking system",
            "Tutorial videos and beauty education content",
            "Loyalty program with exclusive rewards",
            "Professional product recommendations"
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
        "Full Beauty Brands": [
            { name: "Salesforce", purpose: "Customer Management" },
            { name: "Stripe", purpose: "Payment Processing" },
            { name: "Klaviyo", purpose: "Email Marketing" },
            { name: "Yotpo", purpose: "Reviews & Loyalty" },
            { name: "Bazaarvoice", purpose: "User Generated Content" },
            { name: "Google Analytics", purpose: "Performance Tracking" }
        ],
        "Aquasana Water Filters": [
            { name: "Salesforce", purpose: "CRM Integration" },
            { name: "PayPal", purpose: "Payment Gateway" },
            { name: "Recurly", purpose: "Subscription Management" },
            { name: "Zendesk", purpose: "Customer Support" },
            { name: "Mailchimp", purpose: "Email Campaigns" },
            { name: "Google Maps", purpose: "Store Locator" }
        ],
        "Lane Bryant": [
            { name: "Salesforce", purpose: "Customer Data Platform" },
            { name: "Adyen", purpose: "Payment Processing" },
            { name: "Segment", purpose: "Customer Analytics" },
            { name: "Contentful", purpose: "Content Management" },
            { name: "Algolia", purpose: "Search & Discovery" },
            { name: "Optimizely", purpose: "A/B Testing" }
        ],
        "Loreal": [
            { name: "Salesforce", purpose: "Marketing Cloud" },
            { name: "Cybersource", purpose: "Payment Security" },
            { name: "ModiFace", purpose: "Virtual Try-On" },
            { name: "Sephora API", purpose: "Product Integration" },
            { name: "Adobe", purpose: "Creative Assets" },
            { name: "Bazaarvoice", purpose: "Reviews Platform" }
        ]
    };

    return integrations[project.title as keyof typeof integrations] || [
        { name: "Salesforce", purpose: "Commerce Cloud" },
        { name: "Stripe", purpose: "Payment Processing" },
        { name: "SendGrid", purpose: "Email Services" },
        { name: "Redis", purpose: "Caching & Sessions" },
        { name: "AWS", purpose: "Cloud Infrastructure" },
        { name: "Google", purpose: "Analytics & Maps" }
    ];
}

