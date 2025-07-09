/**
 * Production-ready project background gradient component
 * Provides animated gradient borders based on extracted image colors
 */

import { cn } from "@/lib/helpers/utils";
import { getProjectColorsFromImage, type ExtractedColors } from "@/lib/aceternity/image-color-extractor";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "motion/react";

// Types
interface ProjectBackgroundGradientProps {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    projectTitle: string;
    imageSrc: string;
    animate?: boolean;
    fallbackColors?: ExtractedColors;
}

// Constants
const ANIMATION_DURATION = 8;
const GRADIENT_PADDING = "3px";
const DEFAULT_OPACITY = {
    static: 50,
    hover: 80,
    glow: 20,
} as const;

// Animation variants
const gradientVariants = {
    initial: {
        backgroundPosition: "0 50%",
    },
    animate: {
        backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
} as const;

// Default fallback colors
const DEFAULT_FALLBACK: ExtractedColors = {
    primary: "#6366f1",
    secondary: "#a5b4fc",
    accent: "#4338ca",
    gradient: "radial-gradient(circle at 0% 100%, #6366f115, transparent), radial-gradient(circle at 100% 0%, #a5b4fc12, transparent)",
    dominantColors: ["#6366f1", "#a5b4fc", "#4338ca"]
};

export const ProjectBackgroundGradient: React.FC<ProjectBackgroundGradientProps> = ({
    children,
    className,
    containerClassName,
    projectTitle,
    imageSrc,
    animate = true,
    fallbackColors = DEFAULT_FALLBACK,
}) => {
    // State management
    const [colors, setColors] = useState<ExtractedColors | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Memoized color extraction
    const extractColors = useCallback(async () => {
        if (!projectTitle || !imageSrc) {
            setColors(fallbackColors);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const extractedColors = await getProjectColorsFromImage(projectTitle, imageSrc);
            setColors(extractedColors);
        } catch (err) {
            console.warn('Failed to extract colors for project:', projectTitle, err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            setColors(fallbackColors);
        } finally {
            setIsLoading(false);
        }
    }, [projectTitle, imageSrc, fallbackColors]);

    // Effect for color extraction
    useEffect(() => {
        extractColors();
    }, [extractColors]);

    // Memoized animation configuration
    const animationConfig = useMemo(() => ({
        variants: animate ? gradientVariants : undefined,
        initial: animate ? "initial" : undefined,
        animate: animate ? "animate" : undefined,
        transition: animate ? {
            duration: ANIMATION_DURATION,
            repeat: Infinity,
            repeatType: "reverse" as const,
        } : undefined,
    }), [animate]);

    // Memoized style objects
    const animatedGradientStyle = useMemo(() => ({
        backgroundSize: animate ? "400% 400%" : undefined,
        background: colors?.gradient || fallbackColors.gradient,
    }), [animate, colors?.gradient, fallbackColors.gradient]);

    const staticGradientStyle = useMemo(() => ({
        background: colors?.gradient || fallbackColors.gradient,
    }), [colors?.gradient, fallbackColors.gradient]);

    const glowStyle = useMemo(() => ({
        boxShadow: `0 0 20px ${colors?.primary || fallbackColors.primary}${DEFAULT_OPACITY.glow}`,
    }), [colors?.primary, fallbackColors.primary]);

    // Loading/error state
    if (isLoading) {
        return (
            <div className={cn("relative", containerClassName)} style={{ padding: GRADIENT_PADDING }}>
                <div className={cn("relative z-10", className)}>{children}</div>
            </div>
        );
    }

    // Error state with fallback
    if (error && !colors) {
        return (
            <div className={cn("relative", containerClassName)} style={{ padding: GRADIENT_PADDING }}>
                <div className={cn("relative z-10", className)}>{children}</div>
            </div>
        );
    }

    const currentColors = colors || fallbackColors;

    return (
        <div className={cn("relative group", containerClassName)} style={{ padding: GRADIENT_PADDING }}>
            {/* Animated gradient background */}
            <motion.div
                {...animationConfig}
                style={animatedGradientStyle}
                className={cn(
                    "absolute inset-0 rounded-xl z-[1] opacity-0 group-hover:opacity-100 blur-xl",
                    "transition-all duration-700 will-change-transform group-hover:scale-105"
                )}
            />

            {/* Static gradient border */}
            <div
                style={staticGradientStyle}
                className={cn(
                    "absolute inset-0 rounded-xl z-[1] transition-opacity duration-500 will-change-transform",
                    `opacity-${DEFAULT_OPACITY.static} group-hover:opacity-${DEFAULT_OPACITY.hover}`
                )}
            />

            {/* Project-specific glow effect */}
            <div
                style={glowStyle}
                className={cn(
                    "absolute inset-0 rounded-xl z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                )}
            />

            {/* Content container */}
            <div className={cn("relative z-10", className)}>
                {children}
            </div>
        </div>
    );
};

// Export for external use
export default ProjectBackgroundGradient; 