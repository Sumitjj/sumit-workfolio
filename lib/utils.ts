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
 * Resume format type
 */
export type ResumeFormat = 'PDF' | 'DOCX';

/**
 * Resume file information
 */
export interface ResumeInfo {
    url: string;
    filename: string;
    format: ResumeFormat;
}

/**
 * Get available resume file dynamically
 * Returns the first available resume file in the public/resume directory
 * This function tries multiple common filename patterns
 */
export function getAvailableResume(): ResumeInfo {
    // For now, we'll use the known available file
    // In a production environment with Node.js backend, you could use fs.readdir
    const availableFile = 'SumitJangidResume.docx';

    return {
        url: `/resume/${availableFile}`,
        filename: availableFile,
        format: availableFile.endsWith('.pdf') ? 'PDF' : 'DOCX'
    };
}

/**
 * Enhanced resume view/download function
 * Opens the resume in a new tab with print options, allowing users to view or download
 */
export function openResume(): void {
    const resume = getAvailableResume();

    // Open resume in new tab for viewing/printing
    window.open(resume.url, '_blank', 'noopener,noreferrer');
}

/**
 * Legacy download function for compatibility
 * @deprecated Use openResume() instead for better UX
 */
export function downloadResume(): void {
    openResume();
}

/**
 * Get formatted resume button text based on available format
 */
export function getResumeButtonText(): string {
    const resume = getAvailableResume();
    return `Resume (${resume.format})`;
}
