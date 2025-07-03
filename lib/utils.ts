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
    } catch (error) {
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
}

/**
 * Get available resume file by scanning the resume folder
 * Returns the first available resume file in the public/resume directory
 */
export function getAvailableResume(): ResumeInfo {
    // Since we're in a client-side environment, we'll use a known file
    // In a real-world scenario with SSR, you could use fs.readdir
    // For now, we'll default to the known file in the resume folder
    const knownResumeFile = 'SumitJangid_Resume_2025.docx';

    return {
        url: `/resume/${knownResumeFile}`,
        filename: knownResumeFile
    };
}

/**
 * Enhanced resume download function
 * Downloads the first available resume file from the resume folder
 */
export function downloadResume(): void {
    const resume = getAvailableResume();

    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = resume.url;
    link.download = resume.filename;
    link.target = '_blank';

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Get formatted resume button text based on available format
 */
export function getResumeButtonText(): string {
    const resume = getAvailableResume();
    return `Resume (${resume.format})`;
}
