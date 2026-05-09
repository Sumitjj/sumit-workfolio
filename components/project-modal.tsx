"use client";

import React from "react";
import Image from "next/image";
import { FiX, FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Project } from "@/types";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-flex items-center px-3 py-1 rounded-full border border-border/60 text-foreground/90 text-xs sm:text-sm bg-background/70">
        {children}
    </span>
);

export const ProjectModal: React.FC<ProjectModalProps> = React.memo(({ project, isOpen, onClose }) => {
    if (!project) return null;

    const longText = !project.longDescription
        ? (Array.isArray(project.description) ? project.description : [project.description])
        : (Array.isArray(project.longDescription) ? project.longDescription : [project.longDescription]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} contentStyle={{ transformOrigin: "center" }}>
            <div className="relative bg-background">
                {/* Banner: show full image with padding/margin and no overlays */}
                <div className="p-4 sm:p-6">
                    <div className="relative rounded-xl overflow-hidden bg-card">
                        <div className="p-2 sm:p-3">
                            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                                <Image
                                    src={project.bannerImage || project.image}
                                    alt={`${project.title} banner`}
                                    fill
                                    className="object-contain"
                                    priority
                                    sizes="100vw"
                                    quality={90}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Meta moved below image */}
                <div className="px-6 sm:px-8">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        {project.featured && (
                            <Pill>
                                <span className="h-2 w-2 rounded-full bg-foreground/80 mr-2" /> Featured
                            </Pill>
                        )}
                        {project.organization && <Pill>Org: {project.organization}</Pill>}
                        {project.categories?.map((c) => (
                            <Pill key={c}>{c}</Pill>
                        ))}
                    </div>
                    <div className="flex items-start justify-between gap-4">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground text-balance">
                            {project.title}
                        </h2>
                        <div className="flex items-center gap-2">
                            {project.liveUrl && (
                                <Button
                                    aria-label="Open live site"
                                    size="icon"
                                    onClick={() => window.open(project.liveUrl!, "_blank", "noopener,noreferrer")}
                                    className="rounded-full bg-accent/60 hover:bg-accent text-foreground"
                                >
                                    <FiExternalLink className="h-5 w-5" />
                                </Button>
                            )}
                            <Button
                                aria-label="Close"
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="rounded-full hover:bg-accent"
                            >
                                <FiX className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-8" style={{ contentVisibility: "auto" }}>
                    {/* Overview */}
                    <section>
                        <SectionHeader title="Overview" subtitle="Project objective and high-level details" />
                        <div className="rounded-xl bg-gradient-to-br from-accent/40 via-background/40 to-transparent p-5 sm:p-6">
                            <div className="space-y-3 text-sm sm:text-base text-foreground/90">
                                {longText.map((para, idx) => (
                                    <p key={idx} className="leading-relaxed text-foreground/90">
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                        <section>
                            <SectionHeader title="Technologies" subtitle="Stack and tools used" />
                            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-background/40 to-transparent p-5 sm:p-6">
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-background/80 text-foreground/90 shadow-sm hover:shadow transition-shadow"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Major Customizations */}
                    {project.customizations && project.customizations.length > 0 && (
                        <section>
                            <SectionHeader title="Major Customizations" subtitle="Key SFCC implementations" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {project.customizations.map((item, idx) => (
                                    <div
                                        key={`${item.title}-${idx}`}
                                        className="rounded-xl p-4 sm:p-5 transition-transform hover:-translate-y-0.5 bg-gradient-to-br from-muted/40 via-background/40 to-transparent shadow-sm"
                                    >
                                        <div className="mb-3 flex items-center gap-2">
                                            <span className="text-[10px] sm:text-xs uppercase tracking-wider px-2 py-1 rounded-full bg-background/80 text-foreground/80 shadow-sm">
                                                {item.layer}
                                            </span>
                                        </div>
                                        <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Third-Party Integrations */}
                    {project.integrations && project.integrations.length > 0 && (
                        <section>
                            <SectionHeader title="Third-Party Integrations" subtitle="External systems and services" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {project.integrations.map((it, idx) => (
                                    <div
                                        key={`${it.name}-${idx}`}
                                        className="rounded-xl p-4 sm:p-5 bg-gradient-to-br from-primary/5 via-background/40 to-transparent shadow-sm"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="h-10 w-10 rounded-lg bg-background/80 shadow-sm flex items-center justify-center text-sm font-semibold">
                                                {it.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-foreground font-medium truncate">{it.name}</div>
                                                {it.type && (
                                                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide">{it.type}</div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {it.purpose}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </Modal>
    );
});

ProjectModal.displayName = "ProjectModal";

