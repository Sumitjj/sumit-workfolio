/**
 * Performance monitoring utilities for portfolio website
 */

import { useEffect, useState, useRef } from 'react';

// Performance metrics interface
interface PerformanceMetrics {
    scrollFPS: number;
    averageScrollTime: number;
    maxScrollTime: number;
    renderCount: number;
}

// Global performance tracker
class PerformanceTracker {
    private scrollTimes: number[] = [];
    private renderTimes: number[] = [];
    private frameCount = 0;
    private lastFrameTime = 0;
    private isTracking = false;

    startTracking() {
        this.isTracking = true;
        this.scrollTimes = [];
        this.renderTimes = [];
        this.frameCount = 0;
    }

    stopTracking(): PerformanceMetrics {
        this.isTracking = false;

        const metrics: PerformanceMetrics = {
            scrollFPS: this.calculateFPS(),
            averageScrollTime: this.calculateAverage(this.scrollTimes),
            maxScrollTime: Math.max(...this.scrollTimes, 0),
            renderCount: this.renderTimes.length
        };

        return metrics;
    }

    recordScrollTime(startTime: number) {
        if (!this.isTracking) return;

        const endTime = performance.now();
        const scrollTime = endTime - startTime;
        this.scrollTimes.push(scrollTime);

        // Keep only last 100 measurements
        if (this.scrollTimes.length > 100) {
            this.scrollTimes = this.scrollTimes.slice(-100);
        }
    }

    recordRenderTime(componentName: string, startTime: number) {
        if (!this.isTracking) return;

        const endTime = performance.now();
        const renderTime = endTime - startTime;
        this.renderTimes.push(renderTime);
    }

    recordFrame() {
        if (!this.isTracking) return;

        const now = performance.now();
        if (this.lastFrameTime) {
            this.frameCount++;
        }
        this.lastFrameTime = now;
    }

    private calculateFPS(): number {
        if (this.scrollTimes.length < 2) return 60;

        const avgFrameTime = this.calculateAverage(this.scrollTimes);
        return Math.round(1000 / avgFrameTime);
    }

    private calculateAverage(times: number[]): number {
        if (times.length === 0) return 0;
        return times.reduce((sum, time) => sum + time, 0) / times.length;
    }
}

// Global instance
export const performanceTracker = new PerformanceTracker();

/**
 * Hook to monitor component render performance
 */
export function useRenderPerformance(componentName: string) {
    const startTime = performance.now();

    return () => {
        performanceTracker.recordRenderTime(componentName, startTime);
    };
}

/**
 * Hook to monitor scroll performance
 */
export function useScrollPerformance() {
    return {
        startMeasure: () => performance.now(),
        endMeasure: (startTime: number) => performanceTracker.recordScrollTime(startTime)
    };
}

/**
 * Optimize images for better scroll performance
 */
export function optimizeImage(src: string, width?: number, quality: number = 75): string {
    // For external images, return as is
    if (src.startsWith('http')) {
        return src;
    }

    // For local images, add optimization parameters
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());

    return `${src}?${params.toString()}`;
}

/**
 * Lazy load images with intersection observer
 */
export function useLazyImage(src: string, placeholder?: string) {
    const [imageSrc, setImageSrc] = useState(placeholder || '');
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setImageSrc(src);
                    observer.unobserve(img);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(img);

        return () => {
            observer.unobserve(img);
        };
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return { imageSrc, isLoaded, imgRef, handleLoad };
}

/**
 * Performance monitoring commands for development
 */
export const perf = {
    start: () => performanceTracker.startTracking(),
    stop: () => performanceTracker.stopTracking(),

    // Monitor scroll performance for 10 seconds
    monitorScroll: (duration = 10000) => {
        performanceTracker.startTracking();

        setTimeout(() => {
            const metrics = performanceTracker.stopTracking();
            return {
                ...metrics,
                recommendation: metrics.scrollFPS < 30 ?
                    'Consider reducing backdrop-blur or complex animations during scroll' :
                    'Scroll performance looks good!'
            };
        }, duration);
    },

    // Check current page performance
    checkPage: () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');

        const metrics = {
            pageLoad: Math.round(navigation.loadEventEnd - navigation.fetchStart),
            domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        };

        return metrics;
    }
};

// Expose perf to global scope in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Safely extend window object with perf
    (window as unknown as { perf: typeof perf }).perf = perf;
}
