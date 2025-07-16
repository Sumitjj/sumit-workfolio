/**
 * Production-ready image color extraction utility
 * Extracts dominant colors and gradients from images with intelligent fallbacks
 */

// Types
interface ColorPoint {
    r: number;
    g: number;
    b: number;
    x: number;
    y: number;
}

interface ExtractedColors {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    dominantColors: string[];
}

interface ColorAnalysisResult {
    brightness: number;
    isDark: boolean;
    isVeryDark: boolean;
}

// Constants
const BRIGHTNESS_THRESHOLDS = {
    VERY_DARK: 50,
    DARK: 100,
} as const;

const COLOR_SIMILARITY_THRESHOLD = 50;
const CANVAS_SIZE = 100;
const SAMPLE_POINTS = [
    { x: 0.1, y: 0.1 },    // Top-left
    { x: 0.9, y: 0.1 },    // Top-right
    { x: 0.1, y: 0.9 },    // Bottom-left
    { x: 0.9, y: 0.9 },    // Bottom-right
    { x: 0.5, y: 0.5 },    // Center
    { x: 0.3, y: 0.3 },    // Top-center
    { x: 0.7, y: 0.7 },    // Bottom-center
] as const;

// Cache for extracted colors (LRU-like behavior)
const colorCache = new Map<string, ExtractedColors>();
const MAX_CACHE_SIZE = 50;

// Fallback color palettes for common project types
const FALLBACK_COLORS: Record<string, ExtractedColors> = {
    "FullBeauty": {
        primary: "#FF6B9D",
        secondary: "#FFB6C1",
        accent: "#FF1493",
        gradient: "radial-gradient(circle at 0% 100%, #FF6B9D15, transparent), radial-gradient(circle at 100% 0%, #FFB6C112, transparent)",
        dominantColors: ["#FF6B9D", "#FFB6C1", "#FF1493"]
    },
    "Aquasana": {
        primary: "#00BFFF",
        secondary: "#87CEEB",
        accent: "#1E90FF",
        gradient: "radial-gradient(circle at 0% 100%, #00BFFF15, transparent), radial-gradient(circle at 100% 0%, #87CEEB12, transparent)",
        dominantColors: ["#00BFFF", "#87CEEB", "#1E90FF"]
    },
    "Lane Bryant": {
        primary: "#8A2BE2",
        secondary: "#9370DB",
        accent: "#9932CC",
        gradient: "radial-gradient(circle at 0% 100%, #8A2BE215, transparent), radial-gradient(circle at 100% 0%, #9370DB12, transparent)",
        dominantColors: ["#8A2BE2", "#9370DB", "#9932CC"]
    },
    "Loreal": {
        primary: "#FF69B4",
        secondary: "#FFC0CB",
        accent: "#DC143C",
        gradient: "radial-gradient(circle at 0% 100%, #FF69B415, transparent), radial-gradient(circle at 100% 0%, #FFC0CB12, transparent)",
        dominantColors: ["#FF69B4", "#FFC0CB", "#DC143C"]
    }
};

const DEFAULT_COLORS: ExtractedColors = {
    primary: "#6366f1",
    secondary: "#a5b4fc",
    accent: "#4338ca",
    gradient: "radial-gradient(circle at 0% 100%, #6366f115, transparent), radial-gradient(circle at 100% 0%, #a5b4fc12, transparent)",
    dominantColors: ["#6366f1", "#a5b4fc", "#4338ca"]
};

// Utility functions
function calculateBrightness(r: number, g: number, b: number): number {
    return (r * 299 + g * 587 + b * 114) / 1000;
}

function analyzeColor(hexColor: string): ColorAnalysisResult {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    if (!result) {
        return { brightness: 0, isDark: true, isVeryDark: true };
    }

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    const brightness = calculateBrightness(r, g, b);

    return {
        brightness,
        isDark: brightness < BRIGHTNESS_THRESHOLDS.DARK,
        isVeryDark: brightness < BRIGHTNESS_THRESHOLDS.VERY_DARK
    };
}

function getVisibleBorderColor(hexColor: string): string {
    const analysis = analyzeColor(hexColor);

    if (analysis.isVeryDark) {
        return "#9CA3AF"; // Light gray
    } else if (analysis.isDark) {
        return "#6B7280"; // Medium gray
    }

    return hexColor;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function calculateColorDistance(color1: ColorPoint, color2: ColorPoint): number {
    return Math.sqrt(
        Math.pow(color1.r - color2.r, 2) +
        Math.pow(color1.g - color2.g, 2) +
        Math.pow(color1.b - color2.b, 2)
    );
}

function extractDominantColors(colors: ColorPoint[]): string[] {
    if (colors.length === 0) return [DEFAULT_COLORS.primary];

    // Group similar colors using distance-based clustering
    const colorGroups: ColorPoint[][] = [];

    colors.forEach(color => {
        let added = false;

        for (const group of colorGroups) {
            const avgColor = group[0];
            const distance = calculateColorDistance(color, avgColor);

            if (distance < COLOR_SIMILARITY_THRESHOLD) {
                group.push(color);
                added = true;
                break;
            }
        }

        if (!added) {
            colorGroups.push([color]);
        }
    });

    // Sort by group size and calculate average colors
    colorGroups.sort((a, b) => b.length - a.length);

    const extractedColors = colorGroups.slice(0, 3).map(group => {
        const avg = group.reduce((acc, color) => ({
            r: acc.r + color.r,
            g: acc.g + color.g,
            b: acc.b + color.b
        }), { r: 0, g: 0, b: 0 });

        return rgbToHex(
            Math.round(avg.r / group.length),
            Math.round(avg.g / group.length),
            Math.round(avg.b / group.length)
        );
    });

    // Ensure at least one color is visible for borders
    return extractedColors.map(color => {
        const analysis = analyzeColor(color);
        return analysis.isVeryDark ? getVisibleBorderColor(color) : color;
    });
}

function generateGradient(colors: string[]): string {
    if (colors.length === 1) {
        return `radial-gradient(circle at 0% 100%, ${colors[0]}15, transparent),
            radial-gradient(circle at 100% 0%, ${colors[0]}10, transparent)`;
    }

    if (colors.length === 2) {
        return `radial-gradient(circle at 0% 100%, ${colors[0]}15, transparent),
            radial-gradient(circle at 100% 0%, ${colors[1]}12, transparent),
            radial-gradient(circle at 100% 100%, ${colors[0]}08, transparent)`;
    }

    return `radial-gradient(circle at 0% 100%, ${colors[0]}15, transparent),
          radial-gradient(circle at 100% 0%, ${colors[1]}12, transparent),
          radial-gradient(circle at 100% 100%, ${colors[2]}10, transparent),
          radial-gradient(circle at 0% 0%, ${colors[0]}08, transparent)`;
}

function extractColorsFromImage(imageSrc: string): Promise<ExtractedColors> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";

        const timeout = setTimeout(() => {
            reject(new Error('Image loading timeout'));
        }, 10000); // 10 second timeout

        img.onload = () => {
            clearTimeout(timeout);

            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                canvas.width = CANVAS_SIZE;
                canvas.height = CANVAS_SIZE;

                // Draw and scale image
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Get image data
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Sample colors from different regions
                const colors: ColorPoint[] = [];

                SAMPLE_POINTS.forEach(point => {
                    const x = Math.floor(point.x * canvas.width);
                    const y = Math.floor(point.y * canvas.height);
                    const index = (y * canvas.width + x) * 4;

                    colors.push({
                        r: data[index],
                        g: data[index + 1],
                        b: data[index + 2],
                        x: point.x,
                        y: point.y
                    });
                });

                // Extract dominant colors
                const dominantColors = extractDominantColors(colors);
                const gradient = generateGradient(dominantColors);

                const result: ExtractedColors = {
                    primary: dominantColors[0],
                    secondary: dominantColors[1] || dominantColors[0],
                    accent: dominantColors[2] || dominantColors[1] || dominantColors[0],
                    gradient,
                    dominantColors
                };

                resolve(result);
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            clearTimeout(timeout);
            reject(new Error('Failed to load image'));
        };

        img.src = imageSrc;
    });
}

function manageCache(cacheKey: string, value: ExtractedColors): void {
    // Remove oldest entries if cache is full
    if (colorCache.size >= MAX_CACHE_SIZE) {
        const firstKey = colorCache.keys().next().value;
        colorCache.delete(firstKey);
    }

    colorCache.set(cacheKey, value);
}

function getFallbackColors(projectTitle: string): ExtractedColors {
    // Try exact match first
    if (FALLBACK_COLORS[projectTitle]) {
        return FALLBACK_COLORS[projectTitle];
    }

    // Try partial matches
    for (const [key, colors] of Object.entries(FALLBACK_COLORS)) {
        if (projectTitle.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(projectTitle.toLowerCase())) {
            return colors;
        }
    }

    return DEFAULT_COLORS;
}

// Main export function
export async function getProjectColorsFromImage(
    projectTitle: string,
    imageSrc: string
): Promise<ExtractedColors> {
    const cacheKey = `${projectTitle}-${imageSrc}`;

    // Check cache first
    if (colorCache.has(cacheKey)) {
        return colorCache.get(cacheKey)!;
    }

    try {
        const colors = await extractColorsFromImage(imageSrc);
        manageCache(cacheKey, colors);
        return colors;
    } catch (error) {
        console.warn(`Failed to extract colors for ${projectTitle}:`, error);

        // Use fallback colors
        const fallbackColors = getFallbackColors(projectTitle);
        manageCache(cacheKey, fallbackColors);
        return fallbackColors;
    }
}

// Utility exports for other components
export function generateProjectCardStyles(colors: ExtractedColors): string {
    return `
    --project-primary: ${colors.primary};
    --project-secondary: ${colors.secondary};
    --project-accent: ${colors.accent};
    --project-shadow: ${colors.primary}20;
    --project-glow: ${colors.primary}40;
  `;
}

export function getProjectCardClasses(colors: ExtractedColors): string {
    const rgb = hexToRgb(colors.primary);
    if (!rgb) return "";

    return `
    hover:shadow-[0_8px_30px_rgb(${rgb.r},${rgb.g},${rgb.b},0.12)]
    hover:shadow-[0_4px_20px_rgb(${rgb.r},${rgb.g},${rgb.b},0.08)]
    group-hover:shadow-[0_0_20px_rgb(${rgb.r},${rgb.g},${rgb.b},0.15)]
  `;
}

// Export types for external use
export type { ExtractedColors, ColorAnalysisResult }; 