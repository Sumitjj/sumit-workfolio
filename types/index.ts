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