"use client";

import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import {
    Award,
    Calendar,
    ArrowUpRight,
    Trophy,
    Building2,
    ShieldCheck,
    Sparkles,
    Star
} from "lucide-react";
import { certifications } from "@/data/portfolio";

import Image from "next/image";

/**
 * Format date to readable string with month and year
 */
function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
}

/**
 * Certification Card Component
 */
interface CertificationCardProps {
    certification: typeof certifications[0];
    index: number;
}

function CertificationCard({ certification, index }: CertificationCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <Fade direction="up" delay={index * 100} triggerOnce>
            <div className="group relative h-full">
                <div className="relative h-full bg-gradient-to-br from-card via-card to-card/95 rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:border-primary/25 flex flex-col">
                    {/* Enhanced Badge Section */}
                    <div className="relative p-8 pb-6 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
                        {/* Centered Extra Large Badge */}
                        <div className="flex justify-center">
                            <div
                                className="relative transition-transform duration-300 ease-out group-hover:scale-105"
                                style={{ transformOrigin: 'center center', contain: 'layout style' }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
                                <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-3xl bg-white dark:bg-gray-900 border-2 border-primary/20 shadow-xl flex items-center justify-center overflow-hidden transition-shadow duration-300 group-hover:shadow-2xl">
                                    {!imageError ? (
                                        <Image
                                            src={certification.badgeUrl}
                                            alt={certification.name}
                                            width={160}
                                            height={160}
                                            className="w-full h-full object-contain p-3"
                                            onError={() => setImageError(true)}
                                        />
                                    ) : (
                                        <Award className="w-20 h-20 text-primary" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Active Badge - Subtle position below image */}
                        <div className="flex justify-center mt-4">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-full shadow-md text-xs">
                                <ShieldCheck className="w-3 h-3" />
                                <span className="font-medium">Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section - Improved Layout */}
                    <div className="flex-1 p-6 pt-2 flex flex-col">
                        {/* Title - More Prominent */}
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 text-center leading-tight min-h-[3.5rem] flex items-center justify-center">
                            {certification.name}
                        </h3>

                        {/* Issuer and Date Row - Left and Right Aligned */}
                        <div className="flex items-center justify-between mb-6 px-3 py-2 bg-muted/20 rounded-lg border border-border/30">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-muted-foreground">{certification.issuer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary/70" />
                                <span className="text-sm font-medium text-foreground/80">
                                    {formatDate(certification.dateEarned)}
                                </span>
                            </div>
                        </div>

                        {/* View Button - Enhanced */}
                        <div className="mt-auto">
                            {certification.verificationUrl && (
                                <a
                                    href={certification.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary hover:to-primary/90 hover:text-primary-foreground rounded-xl text-sm font-semibold transition-all duration-300 group/link border border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                                >
                                    View Credential
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Subtle Pattern Overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    />
                </div>
            </div>
        </Fade>
    );
}

/**
 * Professional Certifications Section
 */
export function CertificationsSection() {
    return (
        <section id="certifications" className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                            <Trophy className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-primary">Professional Achievements</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            Salesforce Certifications
                        </h2>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Industry-recognized certifications validating expertise in Commerce Cloud architecture and development
                        </p>

                        {/* Catchy Achievement Stats */}
                        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
                            {/* Salesforce Certified Stat */}
                            <div className="group cursor-pointer">
                                <div
                                    className="relative bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-8 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-blue-500/15 hover:scale-102 hover:border-blue-500/30"
                                    style={{ transformOrigin: 'center center', contain: 'layout style' }}
                                >
                                    {/* Animated background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-blue-500/3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="relative text-center">
                                        {/* Icon with glow effect */}
                                        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300 ease-out">
                                            <Award className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Number with animated gradient */}
                                        <div className="text-4xl sm:text-5xl font-black mb-2">
                                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-300% animate-gradient">
                                                {certifications.length}X
                                            </span>
                                        </div>

                                        {/* Label */}
                                        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                            Salesforce Certified
                                        </div>
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
                                        <Star className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div className="absolute bottom-3 left-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <Sparkles className="w-4 h-4 text-purple-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Years Experience Stat */}
                            <div className="group cursor-pointer">
                                <div
                                    className="relative bg-gradient-to-br from-emerald-500/10 via-green-600/5 to-teal-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-emerald-500/15 hover:scale-102 hover:border-emerald-500/30"
                                    style={{ transformOrigin: 'center center', contain: 'layout style' }}
                                >
                                    {/* Animated background gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-teal-500/3 to-emerald-500/3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="relative text-center">
                                        {/* Icon with glow effect */}
                                        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/40 transition-all duration-300 ease-out">
                                            <Calendar className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Number with animated gradient */}
                                        <div className="text-4xl sm:text-5xl font-black mb-2">
                                            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent bg-300% animate-gradient">
                                                {new Date().getFullYear() - 2016}+
                                            </span>
                                        </div>

                                        {/* Label */}
                                        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                            Years Experience
                                        </div>
                                    </div>

                                    {/* Decorative elements */}
                                    <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
                                        <Trophy className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div className="absolute bottom-3 left-3 opacity-20 group-hover:opacity-40 transition-opacity">
                                        <Sparkles className="w-4 h-4 text-teal-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>

                {/* Certifications Grid - Responsive with Same Heights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {certifications.map((certification, index) => (
                        <CertificationCard
                            key={certification.id}
                            certification={certification}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
} 