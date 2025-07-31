"use client";

import { generateStructuredData } from "@/lib/seo/metadata";
import { Project, Experience, Certification } from "@/types";

interface StructuredDataProps {
    data?: unknown[];
    type?: "person" | "website" | "portfolio" | "custom";
}

/**
 * Structured Data Component for SEO
 * Injects JSON-LD structured data into the page head
 */
export function StructuredData({ data }: StructuredDataProps) {
    // Use provided data or generate default structured data
    const structuredData = data || generateStructuredData();

    return (
        <>
            {structuredData.map((item, index) => (
                <script
                    key={`structured-data-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(item, null, 2),
                    }}
                />
            ))}
        </>
    );
}

/**
 * Project-specific structured data
 */
export function ProjectStructuredData({ project }: { project: Project }) {
    const projectData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: Array.isArray(project.description) ? project.description.join(" ") : project.description,
        author: {
            "@type": "Person",
            name: "Sumit Jangid"
        },
        dateCreated: "2024",
        genre: "Web Development",
        keywords: [...project.technologies, ...project.categories],
        url: project.liveUrl,
        image: `https://www.sumitworkfolio.in${project.image}`,
        creator: {
            "@type": "Person",
            name: "Sumit Jangid"
        },
        publisher: {
            "@type": "Person",
            name: "Sumit Jangid"
        },
        about: {
            "@type": "Thing",
            name: "E-commerce Development"
        },
        isPartOf: {
            "@type": "CreativeWork",
            name: "Sumit Jangid Portfolio"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(projectData, null, 2),
            }}
        />
    );
}

/**
 * Experience-specific structured data
 */
export function ExperienceStructuredData({ experience }: { experience: Experience }) {
    const experienceData = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: experience.position,
        company: {
            "@type": "Organization",
            name: experience.company
        },
        description: experience.description,
        skills: experience.technologies,
        datePosted: experience.startDate.toISOString(),
        validThrough: experience.current ? undefined : experience.endDate?.toISOString(),
        employmentType: "Full-time",
        jobLocation: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressCountry: "IN"
            }
        },
        applicantLocationRequirements: {
            "@type": "Country",
            name: "India"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(experienceData, null, 2),
            }}
        />
    );
}

/**
 * Certification-specific structured data
 */
export function CertificationStructuredData({ certification }: { certification: Certification }) {
    const certData = {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalCredential",
        name: certification.name,
        credentialCategory: "Professional Certification",
        recognizedBy: {
            "@type": "Organization",
            name: certification.issuer
        },
        validIn: {
            "@type": "Country",
            name: "Worldwide"
        },
        educationalLevel: "Professional",
        dateIssued: certification.dateEarned.toISOString(),
        url: certification.verificationUrl,
        image: `https://www.sumitworkfolio.in${certification.badgeUrl}`,
        description: certification.description
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(certData, null, 2),
            }}
        />
    );
}
