import { Metadata } from "next";
import { personalInfo, socialLinks } from "@/data/personalData";
import { projects } from "@/data/projectsData";
import { experiences } from "@/data/experienceData";
import { certifications } from "@/data/certificationData";

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
            "SFCC Developer",
            "SFCC Architect",
            "SFRA Development",
            "Headless Commerce",
            "Sumit workfolio",
            "Sumit portfolio",
            "Sumit jangid",
            "Sumit jangid workfolio",
            "Sumit jangid portfolio",
            "Sumit jangid developer",
            "Sumit jangid sfcc",
            "Sumit jangid sfcc developer",
            "Next.js",
            "React",
            "TypeScript",
            "Full Stack Development",
            "E-commerce Architecture",
            "OCAPI/SCAPI",
            "B2C Commerce SDK",
            "Demandware",
            "Commerce Cloud",
            "Digital Commerce",
            "E-commerce Solutions",
            "Web Development",
            "Frontend Development",
            "Backend Development",
            "API Development",
            "Microservices",
            "Cloud Architecture",
            "AWS",
            "Node.js",
            "JavaScript",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
            "Bootstrap",
            "Git",
            "Agile Development",
            "Scrum",
            "Project Management",
            "Team Leadership",
            "Technical Architecture",
            "System Design",
            "Database Design",
            "Performance Optimization",
            "SEO Optimization",
            "Mobile Responsive Design",
            "Progressive Web Apps",
            "RESTful APIs",
            "GraphQL",
            "MongoDB",
            "PostgreSQL",
            "Redis",
            "Docker",
            "Kubernetes",
            "CI/CD",
            "DevOps",
            "Testing",
            "Unit Testing",
            "Integration Testing"
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
            "SFCC Developer",
            "SFCC Architect",
            "Fullstack Developer",
            "Next.js Portfolio",
            "SFRA Developer",
            "Commerce Cloud Expert",
            "E-commerce Development",
            "Headless Commerce",
            "Digital Commerce",
            "Web Development",
            "React Developer",
            "TypeScript Developer",
            "Node.js Developer",
            "Bengaluru Developer",
            "India Developer",
            "Remote Developer",
            "Freelance Developer",
            "Contract Developer",
            "Senior Developer",
            "Lead Developer",
            "Technical Lead",
            "Solution Architect",
            "System Architect",
            "Software Architect",
            "Developer Portfolio",
            "Web Developer Portfolio",
            "Full Stack Portfolio",
            "React Portfolio",
            "Next.js Portfolio",
            "Salesforce Portfolio",
            "OCAPI Developer",
            "SCAPI Developer",
            "B2C Commerce SDK",
            "Salesforce Integration",
            "API Development",
            "Microservices",
            "Cloud Architecture",
            "AWS Developer",
            "Sumit Portfolio",
            "Sumit Workfolio",
            "Sumit Jangid",
            "Sumit Jangid Portfolio",
            "Sumit Jangid Developer",
            "Sumit Jangid SFCC",
            "Sumit Workfolio",
            "Sumit Jangid Workfolio",
            "Technology Consultant",
            "Digital Transformation",
            "Agile Development",
            "Scrum Master",
            "Project Management",
            "Team Leadership",
            "Progressive Web Apps",
            "Mobile Responsive",
            "Performance Optimization",
            "SEO Optimization",
            "RESTful APIs",
            "GraphQL",
            "Docker",
            "Kubernetes",
            "CI/CD",
            "DevOps",
            "Unit Testing",
            "Integration Testing",
            "E2E Testing",
            "Jest",
            "Cypress",
            "Playwright",
            "MongoDB",
            "PostgreSQL",
            "Redis",
            "Git",
            "GitHub",
            "Bitbucket",
            "Tailwind CSS",
            "Bootstrap",
            "HTML5",
            "CSS3",
            "SASS",
            "LESS",
            "Salesforce Certified",
            "B2C Commerce Developer",
            "B2C Commerce Architect",
            "Professional Certification",
            "Salesforce Partner",
            "Custom Development",
            "Web Application Development",
            "Mobile App Development",
            "API Integration",
            "Third-party Integration",
            "Legacy System Migration",
            "Retail E-commerce",
            "Fashion E-commerce",
            "Electronics E-commerce",
            "Healthcare E-commerce",
            "Finance E-commerce",
            "Education E-commerce",
            "Enterprise Solutions",
            "SMB Solutions",
            "Startup Development",
            "Scale-up Solutions",
            "Enterprise Architecture",
            "Global Developer",
            "International Projects",
            "Cross-border E-commerce",
            "Multi-language Support",
            "Multi-currency Support",
            "9+ Years Experience",
            "Senior Level",
            "Expert Level",
            "Veteran Developer",
            "Seasoned Professional",
            "Portfolio Projects",
            "Case Studies",
            "Success Stories",
            "Client Testimonials",
            "Project Showcase",
            "Hire Developer",
            "Freelance Work",
            "Contract Work",
            "Consultation",
            "Technical Consultation",
            "Architecture Review",
            "Client Reviews",
            "Project Success",
            "Technical Excellence",
            "Problem Solver",
            "Innovation Leader",
            "Emerging Technologies",
            "AI Integration",
            "Machine Learning",
            "Blockchain",
            "IoT Solutions",
            "Progressive Web Apps"
        ]
    };

    // Additional structured data for better SEO
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: `${personalInfo.name} - Professional Services`,
        url: baseUrl,
        logo: `${baseUrl}${personalInfo.avatar}`,
        description: "Professional Salesforce B2C Commerce Cloud development and consulting services",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Bengaluru",
            addressRegion: "Karnataka",
            addressCountry: "IN"
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: personalInfo.phone,
            email: personalInfo.email,
            contactType: "customer service"
        },
        sameAs: socialLinks.map(link => link.url),
        serviceArea: {
            "@type": "GeoCircle",
            geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 12.9716,
                longitude: 77.5946
            },
            geoRadius: "50000"
        }
    };

    const serviceData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Salesforce B2C Commerce Cloud Development",
        provider: {
            "@type": "Person",
            name: personalInfo.name
        },
        description: "Professional Salesforce B2C Commerce Cloud development, architecture, and consulting services",
        areaServed: {
            "@type": "Country",
            name: "Worldwide"
        },
        serviceType: [
            "Web Development",
            "E-commerce Development",
            "Software Architecture",
            "Technical Consulting",
            "System Integration"
        ],
        offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock"
        }
    };

    return [personData, websiteData, portfolioData, organizationData, serviceData];
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
        // Keep keywords concise; Google largely ignores the meta keywords tag
        keywords: [
            "Salesforce B2C Commerce Cloud Architect",
            "SFCC Developer",
            "Salesforce Commerce Cloud",
            "Next.js Portfolio",
            personalInfo.name,
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
                    url: `${baseUrl}/images/logo/SumitJangir.png`,
                    width: 1200,
                    height: 630,
                    alt: `${personalInfo.name} – Salesforce B2C Commerce Cloud Architect`,
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${baseUrl}/images/logo/SumitJangir.png`],
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
