import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Utility function for smooth scrolling to elements
 * @deprecated Use smoothScrollToElement from lib/scroll.ts for better performance
 */
export function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerHeight = 80; // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

/**
 * Utility function to format date
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
}

/**
 * Utility function to validate email
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
