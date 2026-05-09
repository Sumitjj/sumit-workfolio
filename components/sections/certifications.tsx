"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
    FiAward,
    FiCalendar,
    FiExternalLink,
    FiHome
} from "react-icons/fi";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { certifications } from "@/data/certificationData";
import Image from "next/image";
import { MetricCard } from "@/components/ui/metric-card";

const Fade = ({ children }: { children: React.ReactNode; [key: string]: unknown }) => <>{children}</>;

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
 * Optimized Certification Card Component - keeping original design
 */
interface CertificationCardProps {
    certification: typeof certifications[0];
    index: number;
}

function CertificationCard({ certification, index }: CertificationCardProps) {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Memoized handlers for better performance
    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    return (
        <Fade direction="up" delay={index * 100} triggerOnce>
            <div className="group section-reveal relative h-full" style={{ animationDelay: `${index * 70}ms` }}>
                <div className="relative h-full bg-gradient-to-br from-card via-card to-card/95 rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:border-primary/25 flex flex-col">
                    {/* Enhanced Badge Section */}
                    <div className="relative p-5 pb-5 sm:p-6 md:p-4 xl:p-8 xl:pb-6 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
                        {/* Centered Extra Large Badge */}
                        <div className="flex justify-center">
                            <div
                                className="relative transition-all duration-500 ease-out group-hover:scale-105"
                                style={{
                                    transformOrigin: 'center center',
                                    contain: 'layout style',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500 ease-out" />
                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-40 xl:h-40 rounded-3xl bg-white dark:bg-gray-900 border-2 border-primary/20 shadow-xl flex items-center justify-center overflow-hidden transition-all duration-500">
                                    {!imageError ? (
                                        <>
                                            {/* Loading placeholder */}
                                            {!imageLoaded && (
                                                <div className="absolute inset-0 bg-muted/20 animate-pulse rounded-3xl flex items-center justify-center">
                                                    <FiAward className="w-16 h-16 text-muted-foreground/50" />
                                                </div>
                                            )}
                                            <Image
                                                src={certification.badgeUrl}
                                                alt={certification.name}
                                                width={160}
                                                height={160}
                                                className={`w-full h-full object-contain p-3 transition-all duration-500 ease-out group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                onError={handleImageError}
                                                onLoad={handleImageLoad}
                                                {...(index < 3
                                                    ? { priority: true }
                                                    : { loading: 'lazy' as const }
                                                )}
                                                sizes="(max-width: 640px) 144px, (max-width: 1024px) 160px, 176px"
                                                quality={85}
                                            />
                                        </>
                                    ) : (
                                        <FiAward className="w-20 h-20 text-primary transition-transform duration-500 ease-out group-hover:scale-105" />
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
                    <div className="flex-1 p-4 sm:p-5 md:p-4 xl:p-6 pt-2 flex flex-col">
                        {/* Title - More Prominent */}
                        <h3 className="text-lg sm:text-xl md:text-[0.95rem] lg:text-base xl:text-2xl font-bold text-foreground mb-4 text-center leading-tight min-h-[3.5rem] md:min-h-[4.5rem] xl:min-h-[3.5rem] flex items-center justify-center">
                            {certification.name}
                        </h3>

                        {/* Issuer and Date Row - Left and Right Aligned */}
                        <div className="mb-6 mx-auto grid w-full max-w-sm gap-2 rounded-xl border border-border/35 bg-muted/20 px-4 py-3 sm:max-w-none">
                            <div className="grid grid-cols-[1.25rem_1fr] items-center gap-3">
                                <FiHome className="h-5 w-5 text-primary" />
                                <span className="min-w-0 text-sm font-medium text-muted-foreground">{certification.issuer}</span>
                            </div>
                            <div className="grid grid-cols-[1.25rem_1fr] items-center gap-3">
                                <FiCalendar className="h-5 w-5 text-primary/70" />
                                <span className="min-w-0 text-sm font-medium text-foreground/80">
                                    {formatDate(certification.dateEarned)}
                                </span>
                            </div>
                        </div>

                        {/* View Button - Enhanced */}
                        <div className="mt-auto dark:text-emerald-300">
                            {certification.verificationUrl && (
                                <a
                                    href={certification.verificationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 px-3 xl:px-4 py-2.5 xl:py-3 bg-gradient-to-r from-primary/10 to-primary/20 hover:from-primary hover:to-primary/90 hover:text-primary-foreground rounded-xl text-xs lg:text-sm font-semibold transition-all duration-300 group/link border border-primary/20 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                                >
                                    View Credential
                                    <FiExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
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
 * Professional Certifications Section - Original Design Restored
 */
export function CertificationsSection() {
    // Memoize stats data to prevent re-computation
    const statsData = useMemo(() => [
        {
            icon: FiAward,
            iconBg: "bg-gradient-to-br from-blue-500 to-purple-600",
            iconColor: "text-white",
            value: `${certifications.length}X`,
            accent: "#3b82f6",
            label: "Certified Expert",
            starColor: "text-blue-500",
            sparklesColor: "text-purple-500",
            bgGradient: "bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-purple-600/10",
            border: "border-blue-500/20",
            hoverBorder: "hover:border-blue-500/30",
            hoverShadow: "hover:shadow-blue-500/15",
        },
        {
            icon: FiHome,
            iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
            iconColor: "text-white",
            value: "B2C",
            accent: "#10b981",
            label: "Commerce Expert",
            starColor: "text-emerald-500",
            sparklesColor: "text-teal-500",
            bgGradient: "bg-gradient-to-br from-emerald-500/10 via-green-600/5 to-teal-600/10",
            border: "border-emerald-500/20",
            hoverBorder: "hover:border-emerald-500/30",
            hoverShadow: "hover:shadow-emerald-500/15",
        }
    ], []);

    return (
        <section id="certifications" className="pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 lg:pb-14">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <Fade direction="up" triggerOnce>
                    <div className="text-center mb-12">
                        <div className="flex flex-col items-center justify-center mb-6">
                            <div className="section-icon-mono motion-icon relative p-3 sm:p-4 rounded-2xl border mb-4">
                                <BadgeCheck className="relative w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                                Badges & Certifications
                            </h2>
                        </div>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Industry-recognized certifications validating expertise in Commerce Cloud architecture and development
                        </p>

                        {/* Achievement Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
                            {statsData.map((stat) => (
                                <MetricCard
                                    key={stat.label}
                                    icon={stat.icon}
                                    value={stat.value}
                                    label={stat.label}
                                    accent={stat.accent}
                                />
                            ))}
                        </div>
                    </div>
                </Fade>

                {/* Certifications Grid - Responsive with Same Heights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 xl:gap-8 max-w-7xl mx-auto">
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
