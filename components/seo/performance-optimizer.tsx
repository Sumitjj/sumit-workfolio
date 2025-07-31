'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface PerformanceOptimizerProps {
    children: React.ReactNode;
}

/**
 * Core Web Vitals targets for this portfolio
 */
const coreWebVitalsTargets = {
    lcp: { target: 2500 }, // 2.5 seconds
    fid: { target: 100 },   // 100 milliseconds
    cls: { target: 0.1 }    // 0.1
};

/**
 * Performance Optimizer Component
 * Implements Core Web Vitals monitoring for the portfolio
 */
export function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Monitor Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        const lcp = entry.startTime;
                        if (lcp > coreWebVitalsTargets.lcp.target) {
                            console.warn('LCP is above target:', lcp, 'ms');
                        }
                    }

                    if (entry.entryType === 'first-input') {
                        const fid = (entry as PerformanceEntry & { processingStart: number }).processingStart - (entry as PerformanceEntry & { startTime: number }).startTime;
                        if (fid > coreWebVitalsTargets.fid.target) {
                            console.warn('FID is above target:', fid, 'ms');
                        }
                    }

                    if (entry.entryType === 'layout-shift') {
                        const cls = (entry as PerformanceEntry & { value: number }).value;
                        if (cls > coreWebVitalsTargets.cls.target) {
                            console.warn('CLS is above target:', cls);
                        }
                    }
                });
            });

            observer.observe({
                entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']
            });

            return () => observer.disconnect();
        }
    }, []);

    return <>{children}</>;
}

/**
 * Optimized Image Component
 * Implements lazy loading and optimization for portfolio images
 */
export function OptimizedImage({
    src,
    alt,
    className,
    priority = false,
    width,
    height,
    ...props
}: {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    width?: number;
    height?: number;
    [key: string]: unknown;
}) {
    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            priority={priority}
            width={width || 400}
            height={height || 400}
            {...props}
        />
    );
}
