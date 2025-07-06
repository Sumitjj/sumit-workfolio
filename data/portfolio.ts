import {
    Github,
    Linkedin,
    Mail,
    Cloud,
} from "lucide-react";
import {
    Project,
    Skill,
    Testimonial,
    SocialLink,
    Experience,
    NavItem,
    Certification,
} from "@/types";
import { getOptimizedProjectImage, getOptimizedAvatarImage } from "@/lib/images";

/**
 * Navigation items for the portfolio
 */
export const navigationItems: NavItem[] = [
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#certifications", label: "Certifications" },
    { href: "#contact", label: "Contact" },
];

/**
 * Personal information and bio
 */
export const personalInfo = {
    name: "Sumit Jangid",
    title: "Salesforce Certified B2C Commerce Architect",
    location: "Bengaluru, India",
    email: "s.jangir129@gmail.com",
    phone: "+91 (995) 079-4448",
    bio: "Crafting Scalable E-commerce Solutions with 9+ Years of Salesforce Commerce Cloud Expertise, Delivering high- performance digital commerce experiences tailored for growth.",
    avatar: getOptimizedAvatarImage("Sumit Jangid"),
    resume: "/resume/SumitJangid_Resume_2025.docx",
};

/**
 * Featured projects with placeholder content
 */
export const projects: Project[] = [
    {
        id: "1",
        longDescription: "Complete e-commerce solution with user authentication, product management, cart functionality, and secure payment processing. Features include admin dashboard, inventory management, and real-time analytics.",
        categories: ["Web Development", "E-Commerce"],
        title: "FullBeauty Brands",
        description:
            "Enterprise e-commerce platform serving millions of customers with advanced product catalog, personalized shopping experiences, and seamless checkout processes.",
        image: getOptimizedProjectImage("Full Beauty FBB"),
        technologies: ["NextJs", "NestJs", "Commerce-SDK", "REST APIs", "SCAPI", "OCAPI", "SFRA", "SGJC"],
        liveUrl: "https://www.fullbeauty.com/",
        featured: true,
        year: 2024,
    },
    {
        id: "2",
        title: "Aquasana Water Filters",
        description:
            "Comprehensive water filtration e-commerce platform featuring advanced product configurators, subscription management, and integrated customer support systems.",
        image: getOptimizedProjectImage("AOSmith"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: true,
        year: 2024,
    },
    {
        id: "3",
        title: "Lane Bryant",
        description:
            "Fashion retail platform with size-inclusive shopping experience, advanced fitting guides, and personalized style recommendations for plus-size customers.",
        image: getOptimizedProjectImage("Ascena LaneBryant"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.lanebryant.com/",
        longDescription: "Modern social media platform featuring real-time messaging, video sharing, live streaming capabilities, and advanced content moderation. Built for high scalability and performance.",
        categories: ["Web Development", "Real-time"],
        featured: true,
        year: 2023,
    },
    {
        id: "4",
        title: "Loreal",
        description:
            "Premium beauty and cosmetics platform with virtual try-on features, skin analysis tools, and personalized product recommendations.",
        image: getOptimizedProjectImage("Loreal"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "http://lancome-usa.com/",
        longDescription: "Enterprise-grade task management platform with team collaboration, Gantt charts, time tracking, and comprehensive reporting. Integrates with popular development tools.",
        categories: ["Web Development", "Productivity"],
        featured: false,
        year: 2023,
    },
    {
        id: "5",
        title: "Camping World",
        description:
            "Outdoor recreation e-commerce platform with extensive RV and camping gear catalog, installation services, and membership programs.",
        image: getOptimizedProjectImage("Camping World"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        year: 2022,
    },
    {
        id: "6",
        title: "Saje Natural Wellness",
        description:
            "Natural wellness and aromatherapy e-commerce platform featuring essential oils, wellness products, and educational content for holistic health.",
        image: getOptimizedProjectImage("Camping World"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        year: 2022,
    },
    {
        id: "7",
        title: "Hotwater",
        description:
            "Water heating solutions platform with product configurators, energy efficiency calculators, and professional installation network integration.",
        image: getOptimizedProjectImage("AOSmith"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: false,
        year: 2024,
    },
    {
        id: "8",
        title: "State Water Heaters",
        description:
            "Commercial and residential water heating solutions with advanced product selection tools, warranty management, and dealer locator systems.",
        image: getOptimizedProjectImage("AOSmith"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: false,
        year: 2024,
    },
    {
        id: "9",
        title: "Reliance Water Heaters",
        description:
            "Reliable water heating solutions platform with energy-efficient products, smart home integration, and comprehensive customer support.",
        image: getOptimizedProjectImage("AOSmith Hotwater"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.hotwater.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        year: 2023,
    },
    {
        id: "10",
        title: "American Water Heaters",
        description:
            "Professional-grade water heating systems with advanced controls, energy monitoring, and maintenance scheduling for commercial applications.",
        image: getOptimizedProjectImage("AOSmith Hotwater"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.hotwater.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        year: 2023,
    },
    {
        id: "11",
        title: "Lochinvar",
        description:
            "High-efficiency commercial water heating and boiler systems with smart controls, remote monitoring, and predictive maintenance capabilities.",
        image: getOptimizedProjectImage("AOSmith Hotwater"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.hotwater.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        year: 2023,
    },
    {
        id: "12",
        title: "AO Smith Corp",
        description:
            "Global water technology solutions with innovative products, smart connectivity, and comprehensive service networks for residential and commercial markets.",
        image: getOptimizedProjectImage("AOSmith"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: true,
        year: 2024,
    },
    {
        id: "13",
        title: "London Drugs",
        description:
            "Multi-category retail platform with pharmacy services, electronics, home goods, and health products with integrated loyalty programs.",
        image: getOptimizedProjectImage("Camping World"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        year: 2022,
    },
    {
        id: "14",
        title: "Uniqlo",
        description:
            "Global fashion retailer with innovative clothing technology, sustainable practices, and seamless omnichannel shopping experiences.",
        image: getOptimizedProjectImage("Camping World"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        year: 2022,
    },
];

/**
 * Skills and technologies
 */
export const skills: Skill[] = [
    // Backend
    { name: "Demandware", level: 5, category: "backend" },
    { name: "SFRA", level: 5, category: "backend" },
    { name: "Node JS", level: 5, category: "backend" },
    { name: "Express Js", level: 5, category: "backend" },
    { name: "REST APIs", level: 5, category: "backend" },
    { name: "JavaScript", level: 5, category: "frontend" },
    { name: "MongoDB", level: 2, category: "backend" },

    // Frontend
    { name: "React", level: 2, category: "frontend" },
    { name: "Next.js", level: 2, category: "frontend" },
    { name: "TypeScript", level: 3, category: "frontend" },
    { name: "HTML/CSS", level: 5, category: "frontend" },
    { name: "Tailwind CSS", level: 5, category: "frontend" },

    // DevOps
    { name: "Git", level: 4, category: "other" },
    { name: "AWS", level: 2, category: "other" },

    // Other
    { name: "Agile/Scrum", level: 4, category: "other" },
    { name: "Team Leadership", level: 5, category: "other" },
    { name: "System Design", level: 4, category: "other" },
    { name: "Project Management", level: 4, category: "other" },
];

/**
 * Work experience
 */
export const experiences: Experience[] = [
    {
        id: "1",
        position: "Salesforce Certified B2C Commerce Technical Architect",
        company: "Merkle",
        startDate: new Date(2021, 3, 1),
        current: true,
        description:
            "Results-driven Salesforce B2C Commerce Cloud Technical Lead with 9+ years of experience in designing and implementing scalable, high- performing eCommerce solutions",
        technologies: [
            "SFRA",
            "SGJC",
            "Node.js",
            "PWA Kit",
            "JavaScript/TypeScript",
            "NextJs",
            "MongoDB",
            "Commerce SDK",
            "SCAPI/OCAPI"
        ],
    },
    {
        id: "2",
        position: "Associate Technology L1",
        company: "Publicis Sapient",
        startDate: new Date(2019, 0, 1),
        endDate: new Date(2021, 2, 31),
        current: false,
        description:
            "Managed dedicated support for L'Oréal, handling major issue resolution and enhancement requests.",
        technologies: [
            "SFCC",
            "SGJC",
            "JavaScript",
            "SCSS",
            "Webpack",
            "SFRA"
        ],
    },
    {
        id: "3",
        position: "Salesforce Commerce Cloud Developer",
        company: "PFSWeb",
        startDate: new Date(2016, 0, 1),
        endDate: new Date(2019, 11, 31),
        current: false,
        description:
            "Delivered multiple SFCC implementations and managed services projects, ensuring robust and scalable solutions.",
        technologies: [
            "SFCC",
            "SGJC",
            "Javascript",
            "JQuery",
        ],
    },
];

/**
 * Professional certifications
 */
export const certifications: Certification[] = [
    {
        id: "1",
        name: "Salesforce Certified B2C Commerce Developer",
        issuer: "Salesforce",
        dateEarned: new Date(2018, 3, 15), // September 15, 2018
        verificationUrl: "https://www.salesforce.com/trailblazer/sjangir3",
        badgeUrl: "/images/badges/B2CDeveloperBadge.png",
        description: "Demonstrates expertise in developing and customizing Salesforce B2C Commerce Cloud solutions, including storefront development, business logic implementation, and integration capabilities.",
        skills: ["SFRA", "JavaScript", "ISML", "SGJC", "REST APIs", "OCAPI"]
    },
    {
        id: "2",
        name: "Salesforce Certified B2C Commerce Architect",
        issuer: "Salesforce",
        dateEarned: new Date(2025, 0, 22), // June 22, 2021
        verificationUrl: "https://www.salesforce.com/trailblazer/sjangir3",
        badgeUrl: "/images/badges/B2CArchitectBadge.png",
        description: "Validates advanced skills in designing and implementing complex B2C Commerce Cloud solutions, including architecture decisions, performance optimization, and enterprise-level integrations.",
        skills: ["Solution Architecture", "Performance Optimization", "Enterprise Integration", "SCAPI", "PWA Kit", "Microservices"]
    },
    {
        id: "3",
        name: "Salesforce Certified Agentforce Specialist",
        issuer: "Salesforce",
        dateEarned: new Date(2025, 6, 10), // March 10, 2020
        verificationUrl: "https://www.salesforce.com/trailblazer/sjangir3",
        badgeUrl: "/images/badges/SalesforceAgentForce.png",
        description: "Certifies proficiency in JavaScript programming within the Salesforce ecosystem, including modern JavaScript features, asynchronous programming, and Lightning Web Components development.",
        skills: ["JavaScript ES6+", "Lightning Web Components", "Asynchronous Programming", "DOM Manipulation", "Testing", "Modern Web APIs"]
    }
];

/**
 * Contact configuration for email functionality
 * 
 * To set up EmailJS:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Create a new service (Gmail, Outlook, etc.)
 * 3. Create an email template with these variables:
 *    - {{from_name}} - Sender's name
 *    - {{from_email}} - Sender's email
 *    - {{company}} - Sender's company
 *    - {{subject}} - Email subject
 *    - {{message}} - Message content
 *    - {{to_email}} - Your email (recipient)
 * 4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
 * 5. Replace the values below with your actual EmailJS credentials
 */
export const contactConfig = {
    emailJsServiceId: "service_your_service_id", // Replace with your EmailJS service ID
    emailJsTemplateId: "template_your_template_id", // Replace with your EmailJS template ID
    emailJsPublicKey: "your_public_key", // Replace with your EmailJS public key
    recipientEmail: personalInfo.email,
    subjects: {
        general: "Portfolio Contact Form - General Inquiry",
        project: "Portfolio Contact Form - Project Inquiry",
        collaboration: "Portfolio Contact Form - Collaboration Opportunity",
        other: "Portfolio Contact Form - Other"
    }
};

/**
 * Social media links
 */
export const socialLinks: SocialLink[] = [
    {
        platform: "GitHub",
        url: "https://github.com/Sumitjj",
        icon: Github,
    },
    {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/sumit-jangid/",
        icon: Linkedin,
    },
    {
        platform: "Email",
        url: "mailto:s.jangir129@gmail.com?subject=Portfolio%20Inquiry%20-%20Let's%20Connect&body=Hi%20Sumit,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity.%0D%0A%0D%0ABest%20regards",
        icon: Mail,
    },
    {
        platform: "Salesforce Profile",
        url: "https://www.salesforce.com/trailblazer/sjangir3",
        icon: Cloud,
    },
];