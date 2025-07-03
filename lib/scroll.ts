/**
 * High-performance scroll utilities with throttling and smooth navigation
 */

import { useEffect, useState, useRef } from 'react';

// Throttle function for performance optimization
function throttle<T extends (...args: never[]) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    let previous = 0;

    return function executedFunction(...args: Parameters<T>) {
        const now = Date.now();

        if (!previous) previous = now;

        const remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func(...args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func(...args);
            }, remaining);
        }
    };
}



/**
 * Custom hook for optimized scroll position tracking
 */
export function useScrollPosition(threshold: number = 50) {
    const [scrollY, setScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const updateScrollPosition = throttle(() => {
            const newScrollY = window.scrollY;
            setScrollY(newScrollY);
            setIsScrolled(newScrollY > threshold);
        }, 16); // ~60fps

        window.addEventListener('scroll', updateScrollPosition, { passive: true });

        // Initial check
        updateScrollPosition();

        return () => window.removeEventListener('scroll', updateScrollPosition);
    }, [threshold]);

    return { scrollY, isScrolled };
}

/**
 * Custom hook for tracking active section with optimized performance
 */
export function useActiveSection(sections: string[], offset: number = 120) {
    const [activeSection, setActiveSection] = useState<string>('');
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    useEffect(() => {
        // Cache DOM elements
        sections.forEach(section => {
            sectionsRef.current[section] = document.getElementById(section);
        });

        const updateActiveSection = throttle(() => {
            const scrollPosition = window.scrollY + offset;

            for (const section of sections) {
                const element = sectionsRef.current[section];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        }, 16);

        window.addEventListener('scroll', updateActiveSection, { passive: true });
        updateActiveSection(); // Initial check

        return () => window.removeEventListener('scroll', updateActiveSection);
    }, [sections, offset]);

    return activeSection;
}

/**
 * Smooth scroll to element with proper offset and easing
 */
export function smoothScrollToElement(
    elementId: string,
    headerOffset: number = 80,
    duration: number = 300
) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // Fast and smooth easing function for responsive scrolling
    const easeOutExpo = (t: number): number => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const easeProgress = easeOutExpo(progress);
        const currentPosition = startPosition + distance * easeProgress;

        window.scrollTo(0, currentPosition);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    // Start animation immediately
    requestAnimationFrame(animation);
}

/**
 * Optimized scroll event listener with cleanup
 */
export function useScrollEvent(
    callback: (scrollY: number) => void,
    throttleMs: number = 16
) {
    useEffect(() => {
        const throttledCallback = throttle(() => {
            callback(window.scrollY);
        }, throttleMs);

        window.addEventListener('scroll', throttledCallback, { passive: true });

        return () => window.removeEventListener('scroll', throttledCallback);
    }, [callback, throttleMs]);
}

/**
 * Check if element is in viewport with threshold
 */
export function useInViewport(
    elementRef: React.RefObject<HTMLElement>,
    threshold: number = 0.1
) {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [elementRef, threshold]);

    return isInView;
}

/**
 * Performance-optimized scroll to top
 */
export function scrollToTop(duration: number = 600) {
    smoothScrollToElement('', 0, duration);
}

/**
 * Get all section elements and their positions (cached)
 */
export function getSectionPositions(sections: string[], headerOffset: number = 80) {
    const positions = new Map<string, number>();

    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            const position = rect.top + window.pageYOffset - headerOffset;
            positions.set(section, position);
        }
    });

    return positions;
}

/**
 * Optimized navigation helper
 */
export function createNavigationHandler(
    sections: string[],
    headerOffset: number = 80,
    onNavigate?: (section: string) => void
) {
    return (href: string, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
        }

        if (href.startsWith('#')) {
            const targetId = href.substring(1);

            // Handle home/top navigation
            if (!targetId || targetId === 'home' || targetId === 'top') {
                smoothScrollToElement('hero', headerOffset);
                onNavigate?.('hero');
                return;
            }

            // Handle section navigation
            if (sections.includes(targetId)) {
                smoothScrollToElement(targetId, headerOffset);
                onNavigate?.(targetId);
                return;
            }
        }

        // Handle external links
        if (href.startsWith('http') || href.startsWith('mailto:')) {
            window.open(href, '_blank', 'noopener noreferrer');
            return;
        }

        // Fallback to normal navigation
        window.location.assign(href);
    };
}
 