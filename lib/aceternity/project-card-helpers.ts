/**
 * Helper utilities for project card components
 * Extracted color analysis, styling, and utility functions
 */

import { type ExtractedColors } from "./image-color-extractor";

// Types
interface ColorAnalysis {
    brightness: number;
    isDark: boolean;
    isVeryDark: boolean;
}

interface ProjectCardStyles {
    borderColor: string;
    borderWidth: string;
    boxShadow: string;
}

interface TagStyles {
    backgroundColor: string;
    border: string;
    color?: string;
}

// Constants
export const BORDER_WIDTH = "2px";
export const DEFAULT_COLORS = {
    primary: "rgba(99, 102, 241, 0.5)",
    secondary: "rgba(165, 180, 252, 0.2)",
    accent: "rgba(67, 56, 202, 0.2)",
    border: "rgba(99, 102, 241, 0.5)",
    shadow: "rgba(99, 102, 241, 0.15)",
} as const;

export const BRIGHTNESS_THRESHOLDS = {
    VERY_DARK: 50,
    DARK: 100,
} as const;

// Color analysis utilities
export function calculateBrightness(r: number, g: number, b: number): number {
    return (r * 299 + g * 587 + b * 114) / 1000;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function analyzeColor(hexColor: string): ColorAnalysis {
    const rgb = hexToRgb(hexColor);
    if (!rgb) {
        return { brightness: 0, isDark: true, isVeryDark: true };
    }

    const brightness = calculateBrightness(rgb.r, rgb.g, rgb.b);

    return {
        brightness,
        isDark: brightness < BRIGHTNESS_THRESHOLDS.DARK,
        isVeryDark: brightness < BRIGHTNESS_THRESHOLDS.VERY_DARK
    };
}

// Color generation utilities
export function getBorderColor(hexColor: string): string {
    const analysis = analyzeColor(hexColor);

    if (analysis.isVeryDark) {
        return 'rgba(156, 163, 175, 0.6)'; // Light gray
    } else if (analysis.isDark) {
        return 'rgba(107, 114, 128, 0.6)'; // Medium gray
    }

    return `${hexColor}50`;
}

export function getTagBackgroundColor(hexColor: string): string {
    const analysis = analyzeColor(hexColor);

    if (analysis.isVeryDark) {
        return 'rgba(156, 163, 175, 0.15)'; // Light gray background
    } else if (analysis.isDark) {
        return 'rgba(107, 114, 128, 0.15)'; // Medium gray background
    }

    return `${hexColor}20`;
}

export function getTagBorderColor(hexColor: string): string {
    const analysis = analyzeColor(hexColor);

    if (analysis.isVeryDark) {
        return 'rgba(156, 163, 175, 0.4)'; // Light gray border
    } else if (analysis.isDark) {
        return 'rgba(107, 114, 128, 0.4)'; // Medium gray border
    }

    return `${hexColor}30`;
}

export function getAccentTextColor(hexColor: string): string {
    const analysis = analyzeColor(hexColor);

    if (analysis.isVeryDark) {
        return '#6B7280'; // Medium gray text for dark backgrounds
    } else if (analysis.isDark) {
        return '#374151'; // Dark gray text for medium backgrounds
    }

    return hexColor;
}

// Style generation utilities
export function generateCardStyles(projectColors: ExtractedColors | null): ProjectCardStyles {
    return {
        borderColor: projectColors ? getBorderColor(projectColors.primary) : DEFAULT_COLORS.border,
        borderWidth: BORDER_WIDTH,
        boxShadow: projectColors
            ? `0 4px 6px -1px ${projectColors.primary}15, 0 2px 4px -1px ${projectColors.primary}08`
            : `0 4px 6px -1px ${DEFAULT_COLORS.shadow}, 0 2px 4px -1px ${DEFAULT_COLORS.shadow}`,
    };
}

export function generateTagStyles(
    projectColors: ExtractedColors | null,
    colorType: 'secondary' | 'accent'
): TagStyles {
    if (!projectColors) {
        return {
            backgroundColor: colorType === 'secondary' ? DEFAULT_COLORS.secondary : DEFAULT_COLORS.accent,
            border: colorType === 'secondary'
                ? '1px solid rgba(165, 180, 252, 0.3)'
                : '1px solid rgba(67, 56, 202, 0.3)',
            color: colorType === 'accent' ? '#4338ca' : undefined,
        };
    }

    const color = colorType === 'secondary' ? projectColors.secondary : projectColors.accent;

    return {
        backgroundColor: getTagBackgroundColor(color),
        border: `1px solid ${getTagBorderColor(color)}`,
        color: colorType === 'accent' ? getAccentTextColor(color) : undefined,
    };
}

// Content utilities
export function getDisplayTitle(title: string): string {
    const words = title.split(" ");
    return words.length > 1 ? words[0] : title;
}

export function getTopTechnologies(technologies: string[], limit: number = 3): string[] {
    return technologies.slice(0, limit);
}

// Class name utilities
export function getImageContainerClass(isFeatured: boolean): string {
    return `relative w-full overflow-hidden flex-shrink-0 ${isFeatured ? "h-32 sm:h-36 lg:h-40" : "h-24 sm:h-28 lg:h-32"
        }`;
}

export function getContentClass(isFeatured: boolean): string {
    return `relative flex flex-col h-full min-h-0 ${isFeatured ? "p-4" : "p-3"
        }`;
}

export function getHeaderClass(isFeatured: boolean): string {
    return `flex items-start justify-between flex-shrink-0 ${isFeatured ? "mb-3" : "mb-2"
        }`;
}

export function getTitleClass(isFeatured: boolean): string {
    return `font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight tracking-tight flex-1 ${isFeatured ? "text-base sm:text-lg min-h-[1.5rem]" : "text-sm sm:text-base min-h-[1.25rem]"
        }`;
}

export function getDescriptionClass(isFeatured: boolean): string {
    return `flex items-start flex-shrink-0 ${isFeatured ? "h-12 sm:h-14 mb-3" : "h-10 sm:h-12 mb-2"
        }`;
}

export function getDescriptionTextClass(isFeatured: boolean): string {
    return `text-muted-foreground line-clamp-2 leading-relaxed ${isFeatured ? "text-xs sm:text-sm" : "text-xs"
        }`;
}

export function getFooterClass(isFeatured: boolean): string {
    return `mt-auto border-t border-border/30 flex-shrink-0 ${isFeatured ? "pt-3" : "pt-2"
        }`;
}

export function getCardClass(className?: string): string {
    return `group cursor-pointer h-full w-full relative overflow-hidden rounded-xl border-2 bg-card/80 backdrop-blur-sm transition-all duration-300 ease-out hover:bg-card/90 hover:-translate-y-1 hover:scale-[1.02] transform-gpu will-change-transform ${className || ''}`;
}

export function getButtonClass(isFeatured: boolean, variant: 'github' | 'live'): string {
    const baseClass = "p-0 bg-background/60 backdrop-blur-md shadow-sm border hover:scale-110 transition-all";
    const sizeClass = isFeatured ? "h-7 w-7" : "h-6 w-6";
    const variantClass = variant === 'github'
        ? "hover:bg-primary/80 hover:text-white border-primary/20"
        : "hover:bg-secondary/80 hover:text-white border-secondary/20";

    return `${baseClass} ${variantClass} ${sizeClass}`;
}

export function getIconClass(isFeatured: boolean): string {
    return isFeatured ? "h-3 w-3" : "h-2.5 w-2.5";
}

export function getTagClass(isFeatured: boolean): string {
    return `inline-flex items-center rounded-md font-medium text-muted-foreground hover:bg-muted transition-colors duration-200 whitespace-nowrap ${isFeatured ? "px-2 py-1 text-xs" : "px-1.5 py-0.5 text-xs"
        }`;
}

export function getAccentTagClass(isFeatured: boolean): string {
    return `inline-flex items-center rounded-md font-medium whitespace-nowrap ${isFeatured ? "px-2 py-1 text-xs" : "px-1.5 py-0.5 text-xs"
        }`;
}

// Export types for external use
export type { ColorAnalysis, ProjectCardStyles, TagStyles }; 