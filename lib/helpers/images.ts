/**
 * Highly optimized image utilities for portfolio
 * Direct serving from public folder with performance optimizations
 */

// Image categories for organization
export const IMAGE_CATEGORIES = {
    PROJECTS: 'projects',
    AVATARS: 'avatars',
    THUMBNAILS: 'thumbnails',
    BANNERS: 'banners',
    ICONS: 'icons'
} as const;

type ImageCategory = typeof IMAGE_CATEGORIES[keyof typeof IMAGE_CATEGORIES];

/**
 * Convert name to optimized filename format
 */
function sanitizeImageName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
}

/**
 * Get direct image path from public folder
 */
export function getImagePath(
    category: ImageCategory,
    name: string,
    extension: string = 'jpg'
): string {
    const fileName = sanitizeImageName(name);
    return `/images/${category}/${fileName}.${extension}`;
}

/**
 * Get project image with optimized path
 */
export function getProjectImage(projectTitle: string, extension: string = 'jpg'): string {
    return getImagePath('projects', projectTitle, extension);
}

/**
 * Get avatar image with optimized path
 */
export function getAvatarImage(name: string, extension: string = 'jpg'): string {
    return getImagePath('avatars', name, extension);
}

/**
 * Get banner image with optimized path
 */
export function getBannerImage(name: string, extension: string = 'jpg'): string {
    return getImagePath('banners', name, extension);
}

/**
 * Get thumbnail image with optimized path
 */
export function getThumbnailImage(name: string, extension: string = 'jpg'): string {
    return getImagePath('thumbnails', name, extension);
}

/**
 * Get icon image with optimized path
 */
export function getIconImage(name: string, extension: string = 'svg'): string {
    return getImagePath('icons', name, extension);
}

/**
 * Pre-built image paths for current portfolio projects
 * These correspond to actual files in public/images/projects/
 */
export const PROJECT_IMAGES = {
    'Full Beauty FBB': '/images/projects/fullbeauty.jpg',
    'Aquasana': '/images/projects/aquasana.jpeg',
    'AOSmith': '/images/projects/aosmith.jpg',
    'LaneBryant': '/images/projects/lanebryant.jpg',
    'AOSmith Hotwater': '/images/projects/aosmith-hotwater.jpg',
    'Ascena LaneBryant': '/images/projects/ascena-lanebryant.jpg',
    'Loreal': '/images/projects/loreal.webp',
    'Camping World': '/images/projects/campingworld.webp',
    'Saje': '/images/projects/saje.jpg',
    'Hotwater': '/images/projects/hotwater.jpg',
    'State': '/images/projects/state.webp',
    'Reliance': '/images/projects/reliance.jpg',
    'American': '/images/projects/american.png',
    'Lochinvar': '/images/projects/lochinvar.jpeg',
    'LondonDrugs': '/images/projects/londondrugs.jpg',
    'Uniqlo': '/images/projects/uniqlo.jpeg',
} as const;

/**
 * Pre-built image paths for avatars
 * These correspond to actual files in public/images/avatars/
 */
export const AVATAR_IMAGES = {
    'Sumit Jangid': '/images/avatars/sumit-jangid.jpg',
} as const;

/**
 * Get optimized project image with fallback
 */
export function getOptimizedProjectImage(projectTitle: string): string {
    // Use pre-built paths for better performance
    const prebuiltPath = PROJECT_IMAGES[projectTitle as keyof typeof PROJECT_IMAGES];
    if (prebuiltPath) {
        return prebuiltPath;
    }

    // Fallback to dynamic generation
    return getProjectImage(projectTitle);
}

/**
 * Get optimized avatar image with fallback
 */
export function getOptimizedAvatarImage(name: string): string {
    // Use pre-built paths for better performance
    const prebuiltPath = AVATAR_IMAGES[name as keyof typeof AVATAR_IMAGES];
    if (prebuiltPath) {
        return prebuiltPath;
    }

    // Fallback to dynamic generation
    return getAvatarImage(name);
}

/**
 * Image optimization for Next.js Image component
 */
export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    className?: string;
}

/**
 * Generate optimized image props for Next.js Image component
 */
export function createImageProps(
    src: string,
    alt: string,
    options: Partial<ImageProps> = {}
): ImageProps {
    return {
        src,
        alt,
        width: 800,
        height: 600,
        quality: 85,
        placeholder: 'empty',
        ...options
    };
}

/**
 * Create project image props with defaults
 */
export function createProjectImageProps(
    projectTitle: string,
    options: Partial<ImageProps> = {}
): ImageProps {
    const src = getOptimizedProjectImage(projectTitle);
    return createImageProps(src, `${projectTitle} project screenshot`, {
        width: 800,
        height: 600,
        ...options
    });
}

/**
 * Create avatar image props with defaults
 */
export function createAvatarImageProps(
    name: string,
    options: Partial<ImageProps> = {}
): ImageProps {
    const src = getOptimizedAvatarImage(name);
    return createImageProps(src, `${name} avatar`, {
        width: 400,
        height: 400,
        ...options
    });
}
