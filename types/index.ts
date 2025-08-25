/**
 * Theme types for the portfolio
 */
export type Theme = "light" | "dark" | "system";

/**
 * Navigation item structure
 */
export interface NavItem {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Project data structure
 */
export interface Project {
    id: string;
    title: string;
    description: string | string[];
    longDescription?: string | string[];
    image: string;
    technologies: string[];
    categories: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    organization?: string;
    /** Optional alternative banner image for modal hero. Falls back to `image` when not provided */
    bannerImage?: string;
    /** Key SFCC-centric customizations implemented for the project */
    customizations?: CustomizationItem[];
    /** Third-party integrations used within the solution */
    integrations?: IntegrationItem[];
}

/**
 * Salesforce Commerce Cloud architectural layer involved in a customization
 */
export type SfccLayer =
    | "SFRA"
    | "OCAPI"
    | "SCAPI"
    | "BM" // Business Manager
    | "Cartridge"
    | "Frontend"
    | "Backend";

/** Describes a major customization delivered in the project */
export interface CustomizationItem {
    title: string;
    description: string;
    layer: SfccLayer;
}

/** Describes a third-party integration used in the project */
export interface IntegrationItem {
    name: string;
    purpose: string;
    type?:
    | "Payment"
    | "Analytics"
    | "Email"
    | "Search"
    | "CDP"
    | "CMS"
    | "Reviews"
    | "Loyalty"
    | "Support"
    | "Maps"
    | "Security"
    | "Subscriptions"
    | "A/B Testing"
    | "Other";
}

/**
 * Skill Category types
 */
export type SkillCategoryKey = "frontend" | "backend" | "tools" | "other";

export interface SkillCategory {
    key: SkillCategoryKey;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
}

/**
 * Skill data structure
 */
export interface Skill {
    name: string;
    icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color?: string;
}

/**
 * Skill Group data structure
 */
export interface SkillGroup {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    skills: Skill[];
}

/**
 * Experience data structure
 */
export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    technologies: string[];
    current: boolean;
    projects: string[];
}

/**
 * Certification data structure
 */
export interface Certification {
    id: string;
    name: string;
    issuer: string;
    dateEarned: Date;
    credentialId?: string;
    verificationUrl?: string;
    badgeUrl: string;
    description: string;
}

/**
 * Social media link structure
 */
export interface SocialLink {
    platform: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
}
