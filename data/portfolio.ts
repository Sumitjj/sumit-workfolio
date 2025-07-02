import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    ExternalLink,
    Code2,
    Palette,
    Database,
    Globe,
    Smartphone,
    Zap,
} from "lucide-react";
import {
    Project,
    Skill,
    Testimonial,
    SocialLink,
    Experience,
    NavItem,
} from "@/types";
import { getOptimizedProjectImage, getOptimizedAvatarImage } from "@/lib/images";

/**
 * Navigation items for the portfolio
 */
export const navigationItems: NavItem[] = [
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
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
    resume: "/resume.pdf",
};

/**
 * Featured projects with placeholder content
 */
export const projects: Project[] = [
    {
        id: "1",
        longDescription: "Complete e-commerce solution with user authentication, product management, cart functionality, and secure payment processing. Features include admin dashboard, inventory management, and real-time analytics.",
        categories: ["Web Development", "E-Commerce"],
        title: "Full Beauty Brands",
        description:
            "Full Beauty",
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
            "AOSmith",
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
            "Ascena",
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
            "Loreal",
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
            "Camping World",
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
            "Saje",
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
            "AOSmith",
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
            "AOSmith",
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
            "AOSmith",
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
            "AOSmith",
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
            "AOSmith",
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
            "AOSmith",
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
            "London Drugs",
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
            "Uniqlo",
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
 * Client testimonials
 */
export const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Sarah Chen",
        position: "Product Manager",
        company: "TechCorp Solutions",
        avatar: getOptimizedAvatarImage("Sarah Chen"),
        content: "Alex consistently delivers high-quality work and has an exceptional eye for detail. His technical skills and collaborative approach make him invaluable to our team.",
        rating: 5,
    },
    {
        id: "2",
        name: "Michael Rodriguez",
        position: "CEO",
        company: "Startup Inc.",
        avatar: getOptimizedAvatarImage("Michael Rodriguez"),
        content: "Working with Alex was a game-changer for our startup. He brought our vision to life with incredible attention to user experience and performance.",
        rating: 5,
    },
    {
        id: "3",
        name: "Emily Davis",
        position: "Design Director",
        company: "Creative Studio",
        avatar: getOptimizedAvatarImage("Emily Davis"),
        content: "Alex has an amazing ability to translate complex designs into beautiful, functional interfaces. His code is clean, maintainable, and performant.",
        rating: 5,
    },
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
        url: "mailto:s.jangir129@gmail.com",
        icon: Mail,
    },
];