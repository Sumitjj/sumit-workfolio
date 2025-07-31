import { Metadata } from "next";
import { personalInfo, projects, experiences, certifications, socialLinks } from "@/data/portfolio";

// Base URL configuration
const baseUrl = "https://www.sumitworkfolio.in";

// Enhanced structured data for Person and Portfolio
export const generateStructuredData = () => {
    const personData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: personalInfo.name,
        url: baseUrl,
        image: `${baseUrl}${personalInfo.avatar}`,
        jobTitle: personalInfo.title,
        description: personalInfo.bio,
        email: personalInfo.email,
        telephone: personalInfo.phone,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressCountry: "IN"
        },
        worksFor: {
            "@type": "Organization",
            name: "Freelance"
        },
        knowsAbout: [
            "Salesforce B2C Commerce Cloud",
            "Salesforce B2C Commerce Cloud developer",
            "SFRA Development",
            "Headless Commerce",
            "Next.js",
            "React",
            "TypeScript",
            "Full Stack Development",
            "E-commerce Architecture",
            "OCAPI/SCAPI",
            "B2C Commerce SDK"
        ],
        hasCredential: certifications.map(cert => ({
            "@type": "EducationalOccupationalCredential",
            name: cert.name,
            credentialCategory: "Professional Certification",
            recognizedBy: {
                "@type": "Organization",
                name: cert.issuer
            },
            validIn: {
                "@type": "Country",
                name: "Worldwide"
            }
        })),
        sameAs: socialLinks.map(link => link.url),
        alumniOf: {
            "@type": "Organization",
            name: "Salesforce Ecosystem"
        }
    };

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${personalInfo.name} - Portfolio`,
        url: baseUrl,
        description: personalInfo.bio,
        author: {
            "@type": "Person",
            name: personalInfo.name
        },
        publisher: {
            "@type": "Person",
            name: personalInfo.name
        }
    };

    const portfolioData = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: `${personalInfo.name} Portfolio`,
        description: personalInfo.bio,
        author: {
            "@type": "Person",
            name: personalInfo.name
        },
        dateCreated: "2024",
        dateModified: new Date().toISOString().split('T')[0],
        genre: "Portfolio",
        keywords: [
            "Salesforce B2C Commerce Cloud Architect",
            "Fullstack Developer",
            "Next.js Portfolio",
            "SFRA Developer",
            "Commerce Cloud Expert",
            "E-commerce Development",
            "Headless Commerce"
        ]
    };

    return [personData, websiteData, portfolioData];
};

// Dynamic metadata generation
export const generateMetadata = (page?: string): Metadata => {
    const title = page
        ? `${page} | ${personalInfo.name} - ${personalInfo.title}`
        : `${personalInfo.name} - ${personalInfo.title}`;

    const description = page
        ? `${personalInfo.bio} Explore ${page.toLowerCase()} and discover my expertise in Salesforce B2C Commerce Cloud, full-stack development, and modern web technologies.`
        : personalInfo.bio;

    return {
        title: {
            default: title,
            template: `%s | ${personalInfo.name}`,
        },
        description,
        keywords: [
            "Salesforce B2C Commerce Cloud Architect",
            "Fullstack Developer",
            "Next.js Portfolio",
            "SFRA Developer",
            "Commerce Cloud Expert",
            "E-commerce Development",
            "Headless Commerce",
            "Salesforce Commerce Cloud",
            "B2C Commerce Cloud",
            "SFCC Developer",
            "Demandware",
            "OCAPI",
            "SCAPI",
            "B2C Commerce SDK",
            "React Developer",
            "TypeScript",
            "Node.js",
            "E-commerce Solutions",
            "Digital Commerce",
            "Web Development",
            "Bengaluru",
            "India",
            personalInfo.name.toLowerCase().replace(" ", "-"),
        ],
        authors: [{ name: personalInfo.name }],
        creator: personalInfo.name,
        publisher: personalInfo.name,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: page ? `/${page}` : "/",
        },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: page ? `${baseUrl}/${page}` : baseUrl,
            title,
            description,
            siteName: `${personalInfo.name} Workfolio`,
            images: [
                {
                    url: `${baseUrl}${personalInfo.avatar}`,
                    width: 400,
                    height: 400,
                    alt: `${personalInfo.name} - Professional Photo`,
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${baseUrl}${personalInfo.avatar}`],
            creator: "@sumitjangid",
            site: "@sumitjangid",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        verification: {
            google: process.env.GOOGLE_VERIFICATION_CODE,
        },
        category: "Technology",
        classification: "Portfolio",
    };
};

// Project-specific metadata
export const generateProjectMetadata = (projectId: string): Metadata => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return generateMetadata();

    const projectDescription = Array.isArray(project.description)
        ? project.description.join(" ")
        : project.description;

    return {
        title: `${project.title} Project | ${personalInfo.name}`,
        description: `${projectDescription} Explore this ${project.categories.join(", ")} project by ${personalInfo.name}, showcasing expertise in ${project.technologies.join(", ")}.`,
        keywords: [
            ...project.technologies,
            ...project.categories,
            "Salesforce B2C Commerce Cloud",
            "E-commerce Development",
            personalInfo.name,
        ],
        openGraph: {
            title: `${project.title} Project | ${personalInfo.name}`,
            description: projectDescription,
            images: [
                {
                    url: `${baseUrl}${project.image}`,
                    width: 800,
                    height: 600,
                    alt: `${project.title} - Project Screenshot`,
                }
            ],
        },
        twitter: {
            title: `${project.title} Project | ${personalInfo.name}`,
            description: projectDescription,
            images: [`${baseUrl}${project.image}`],
        },
    };
};

// Experience-specific metadata
export const generateExperienceMetadata = (experienceId: string): Metadata => {
    const experience = experiences.find(e => e.id === experienceId);
    if (!experience) return generateMetadata();

    return {
        title: `${experience.position} at ${experience.company} | ${personalInfo.name}`,
        description: `${experience.description} Experience in ${experience.technologies.join(", ")} at ${experience.company}.`,
        keywords: [
            ...experience.technologies,
            experience.company,
            experience.position,
            "Salesforce B2C Commerce Cloud",
            "Professional Experience",
            personalInfo.name,
        ],
    };
};
