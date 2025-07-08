import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import resumeInfo from './resume-info.json';

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
export function scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
}

/**
 * Handle email links with fallback to Gmail
 */
export function handleEmailClick(email: string, subject?: string, body?: string): void {
    const params = new URLSearchParams();
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);

    const mailtoUrl = `mailto:${email}${params.toString() ? '?' + params.toString() : ''}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}${subject ? '&su=' + encodeURIComponent(subject) : ''}${body ? '&body=' + encodeURIComponent(body) : ''}`;

    try {
        // Try to open default email client
        window.location.href = mailtoUrl;

        // Check if mailto was handled after a short delay
        setTimeout(() => {
            // If the page is still focused, mailto likely failed
            if (document.hasFocus()) {
                // Open Gmail as fallback
                window.open(gmailUrl, '_blank');
            }
        }, 500);
    } catch {
        // Fallback to Gmail if mailto fails
        window.open(gmailUrl, '_blank');
    }
}


/**
 * Open resume in new window
 */
export function openResume(): void {
    window.open(`/resume/${resumeInfo.filename}`, '_blank', 'noopener,noreferrer');
}

/**
 * Get button text
 */
export function getResumeButtonText(): string {
    return `Resume`;
}
