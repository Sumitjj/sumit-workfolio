import {
    FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaJava, FaJenkins, FaGithub, FaLinkedin, FaNode,
    FaBitbucket
} from "react-icons/fa";
import {
    SiPwa, SiMongodb, SiTailwindcss, SiJira,
    SiJquery, SiNestjs, SiMainwp, SiCodesignal, SiBackendless, SiGoogledataproc
} from "react-icons/si";
import { Cpu } from "lucide-react";
import { GiDeerHead } from "react-icons/gi";
import { PiLightningFill, PiFileHtmlDuotone } from "react-icons/pi";
import { DiScrum } from "react-icons/di";
import { MdManageAccounts } from "react-icons/md";
import { HiOutlineCloud, HiOutlineMail } from "react-icons/hi";
import { TbPackages } from "react-icons/tb";
import { BiLogoTypescript } from "react-icons/bi";
import { FaSalesforce } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { TbSdk } from "react-icons/tb";
import { TbApi } from "react-icons/tb";
import { TbBrandNextjs } from "react-icons/tb";
import {
    Project,
    SkillGroup,
    SocialLink,
    Experience,
    NavItem,
    Certification,
} from "@/types";
import { getOptimizedProjectImage, getOptimizedAvatarImage } from "@/lib/helpers/images";


/**
 * Skills and technologies, grouped by category
 */
export const skillGroups: SkillGroup[] = [
    {
        title: "Backend & E-Commerce",
        icon: Cpu,
        skills: [
            { name: "SFRA", icon: FaSalesforce, color: "#FFFFFF" },
            { name: "SGJC", icon: FaSalesforce, color: "#FFFFFF" },
            { name: "OCAPI/SCAPI", icon: TbPackages, color: "#FFFFFF" },
            { name: "B2C Commerce-SDK", icon: TbSdk, color: "#FFFFFF" },
            { name: "RESTful APIs", icon: TbApi, color: "#FFFFFF" },
            { name: "Node.js", icon: FaNode, color: "#FFFFFF" },
            { name: "Nest JS", icon: SiNestjs, color: "#FFFFFF" },
            { name: "Core Java", icon: FaJava, color: "#FFFFFF" },
            { name: "PWA Kit", icon: SiPwa, color: "#FFFFFF" },
            { name: "MongoDB", icon: SiMongodb, color: "#FFFFFF" },
        ]
    },
    {
        title: "Frontend & Headless",
        icon: GiDeerHead,
        skills: [
            { name: "ISML", icon: PiFileHtmlDuotone, color: "#FFFFFF" },
            { name: "JavaScript", icon: IoLogoJavascript, color: "#FFFFFF" },
            { name: "Typescript", icon: BiLogoTypescript, color: "#FFFFFF" },
            { name: "React Js", icon: FaReact, color: "#FFFFFF" },
            { name: "Next Js", icon: TbBrandNextjs, color: "#FFFFFF" },
            { name: "HTML5", icon: FaHtml5, color: "#FFFFFF" },
            { name: "CSS3", icon: FaCss3Alt, color: "#FFFFFF" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#FFFFFF" },
            { name: "JQuery", icon: SiJquery, color: "#FFFFFF" },
            { name: "LWC", icon: PiLightningFill, color: "#FFFFFF" }
        ]
    },
    {
        title: "Leadership & Process",
        icon: SiGoogledataproc,
        skills: [
            { name: "Project Management", icon: MdManageAccounts, color: "#FFFFFF" },
            { name: "Team Leadership", icon: SiMainwp, color: "#FFFFFF" },
            { name: "System Design", icon: SiCodesignal, color: "#FFFFFF" },
            { name: "Agile/Scrum", icon: DiScrum, color: "#FFFFFF" },
            { name: "Jira", icon: SiJira, color: "#FFFFFF" },
            { name: "GitHub", icon: FaGitAlt, color: "#FFFFFF" },
            { name: "Jenkins", icon: FaJenkins, color: "#FFFFFF" },
            { name: "Bitbucket", icon: FaBitbucket, color: "#FFFFFF" },
        ]
    }
];

/**
 * Navigation items for the portfolio
 */
export const navigationItems: NavItem[] = [
    { href: "#projects", label: "Creations" },
    { href: "#skills", label: "Tech" },
    { href: "#experience", label: "Journey" },
    { href: "#certifications", label: "Badges" },
    { href: "#contact", label: "Connect" },
];

/**
 * Footer content
 */
export const footerContent = {
    copyright: "Designed & developed by",
    craftedWith: "Crafted with",
    connectWith: "Connect with me",
    alwaysLearning: "Always learning, always building",
};

/**
 * Personal information and bio
 */
export const personalInfo = {
    name: "Sumit Jangid",
    title: "Salesforce Certified B2C Commerce Lead",
    location: "Bengaluru, India",
    email: "s.jangir129fl@gmail.com",
    phone: "+91 (995) 079-4448",
    bio: "Transforming e-commerce vision into reality with 9+ years of SFCC mastery. Trusted by brands to build fast, flexible, and future- ready digital storefronts.",
    avatar: getOptimizedAvatarImage("Sumit Jangid"),
    resume: "/resume/SumitJangid_Resume_2025.docx",
    logo: "/images/logo/Sumitj.png",
    websiteUrl: "https://www.sumitworkfolio.in",
};

/**
 * Featured projects with placeholder content
 */
export const projects: Project[] = [
    {
        id: "1",
        longDescription: [
            "Worked on multiple brands under FullBeauty, focusing on checkout redesign in headless commerce.",
            "Implemented solutions using NextJs, NestJs, OCAPI, SCAPI, and more.",
            "Enhanced performance and scalability for high-traffic e-commerce.",
            "Collaborated with cross-functional teams for seamless integrations."
        ],
        categories: ["E-Commerce", "Headless Commerce"],
        title: "Full Beauty",
        description: [
            "Checkout redesign in headless commerce.",
            "NextJs, NestJs, OCAPI, SCAPI expertise.",
            "Performance and scalability improvements."
        ],
        image: getOptimizedProjectImage("Full Beauty FBB"),
        technologies: ["NextJs", "NestJs", "REST APIs", "SCAPI", "OCAPI", "SFRA", "B2C Commerce-SDK", "SGJC"],
        liveUrl: "https://www.fullbeauty.com/",
        featured: true,
        organization: "Merkle",
    },
    {
        id: "2",
        title: "Aquasana",
        description: [
            "Custom product configurators using SFRA.",
            "Integrated subscription and support modules via OCAPI.",
            "Enhanced e-commerce features and performance."
        ],
        image: getOptimizedProjectImage("Aquasana"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "3rd Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["E-Commerce"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "8",
        title: "Hotwater",
        description: [
            "Built product configurators in SFRA for water heaters.",
            "Integrated efficiency tools and backend APIs.",
            "Streamlined customer experience and scalability."
        ],
        image: getOptimizedProjectImage("Hotwater"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.hotwater.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "3",
        title: "Lane Bryant",
        description: [
            "Developed inclusive fashion storefront using SFRA.",
            "Implemented fitting guides via custom OCAPI logic.",
            "Enhanced user personalization and performance."
        ],
        image: getOptimizedProjectImage("LaneBryant"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.lanebryant.com/",
        longDescription: "Modern social media platform featuring real-time messaging, video sharing, live streaming capabilities, and advanced content moderation. Built for high scalability and performance.",
        categories: ["Web Development", "Real-time"],
        featured: true,
        organization: "Merkle",
    },
    {
        id: "4",
        title: "LondonDrugs",
        description: [
            "SFRA-based multi-category retail platform.",
            "Integrated pharmacy and loyalty systems.",
            "Optimized user journeys and checkout flows."
        ],
        image: getOptimizedProjectImage("LondonDrugs"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.londondrugs.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
    },
    {
        id: "13",
        title: "Loreal",
        description: [
            "SFRA-powered cosmetics platform with virtual try-ons.",
            "Implemented SCAPI-based personalization features.",
            "Improved product discovery and engagement."
        ],
        image: getOptimizedProjectImage("Loreal"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "http://lancome-usa.com/",
        longDescription: "Enterprise-grade task management platform with team collaboration, Gantt charts, time tracking, and comprehensive reporting. Integrates with popular development tools.",
        categories: ["Web Development", "Productivity"],
        featured: true,
        organization: "Publicis Sapient",
    },
    {
        id: "5",
        title: "Camping World",
        description: [
            "Implemented wellness product store using SFRA.",
            "Integrated content-driven education modules.",
            "Enhanced holistic shopping experiences."
        ],
        image: getOptimizedProjectImage("Camping World"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
    },
    {
        id: "6",
        title: "Saje Wellness",
        description: [
            "Built omnichannel commerce experience using SFRA.",
            "Integrated global store locator and inventory.",
            "Improved performance across devices."
        ],
        image: getOptimizedProjectImage("Saje"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.saje.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
    },
    {
        id: "7",
        title: "Uniqlo",
        description: [
            "Developed heating solutions platform with SFRA.",
            "Integrated dealer locator and warranty tools.",
            "Boosted performance and configurability."
        ],
        image: getOptimizedProjectImage("Uniqlo"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.uniqlo.com/us/en/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
    },
    {
        id: "9",
        title: "State",
        description: [
            "Built energy-efficient SFRA storefront.",
            "Integrated smart home device compatibility.",
            "Optimized support and customer workflows."
        ],
        image: getOptimizedProjectImage("State"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.statewaterheaters.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "10",
        title: "Reliance",
        description: [
            "Developed B2B-focused commerce features in SFRA.",
            "Added predictive maintenance and controls.",
            "Enhanced commercial product visibility."
        ],
        image: getOptimizedProjectImage("Reliance"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.reliancewaterheaters.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "11",
        title: "American",
        description: [
            "SFRA-based smart boiler platform integration.",
            "Enabled remote monitoring and controls.",
            "Focused on predictive maintenance tools."
        ],
        image: getOptimizedProjectImage("American"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.americanwaterheater.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "12",
        title: "Lochinvar",
        description: [
            "Developed SFRA storefront with smart product suite.",
            "Integrated SCAPI/OCAPI for service tools.",
            "Enabled global commerce scalability."
        ],
        image: getOptimizedProjectImage("Lochinvar"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.lochinvar.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "13",
        title: "AOSmith Corp",
        description: [
            "Developed SFRA storefront with smart product suite.",
            "Integrated SCAPI/OCAPI for service tools.",
            "Enabled global commerce scalability."
        ],
        image: getOptimizedProjectImage("AOSmith"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.aosmith.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: true,
        organization: "Merkle",
    },
];

/**
 * Work experience
 */
export const experiences: Experience[] = [
    {
        id: "1",
        position: "B2C Commerce Technical Lead",
        company: "Merkle",
        startDate: new Date(2021, 3, 1),
        current: true,
        description:
            "Results-oriented technical leader with over 9 years of experience in architecting and delivering scalable, high-performance eCommerce solutions. Proven expertise in driving end-to-end implementations and optimizing support engagements across multiple global brands. Strong hands-on experience with Salesforce SFRA and SGJC frameworks, with a growing focus on modern headless architectures leveraging SCAPI, OCAPI, and the B2C Commerce SDK.",
        technologies: [
            "SFRA",
            "SCAPI",
            "OCAPI",
            "B2C Commerce SDK",
            "Nest Js",
            "JavaScript/TypeScript",
            "Next Js",
            "Third Party Integrations"
        ],
        projects: ["FullBeauty Brands", "Aquasana Water Filters", "Hotwater", "State Water Heaters", "Reliance Water Heaters", "American Water Heaters", "Lochinvar", "AO Smith Corp", "Lane Bryant"]
    },
    {
        id: "2",
        position: "Associate Technology L2",
        company: "Publicis Sapient",
        startDate: new Date(2019, 5, 1),
        endDate: new Date(2021, 2, 31),
        current: false,
        description:
            "Contributed to the successful support and enhancement of over 50+ brands under the L’Oréal portfolio as part of a dedicated Managed Services team. Played a key role in issue resolution, performance optimization, and the implementation of enhancement requests across multiple brands. Led and executed the migration of several brands from legacy SGJC implementations to the LORA architecture, built on top of the SFRA framework, ensuring improved scalability, maintainability, and performance.",
        technologies: [
            "SFCC",
            "SFRA",
            "JavaScript",
            "OCAPI",
            "SCSS",
            "Third Party Integrations"
        ],
        projects: ["Loreal"]
    },
    {
        id: "3",
        position: "B2C Commerce Developer",
        company: "PFSWeb",
        startDate: new Date(2016, 1, 1),
        endDate: new Date(2019, 4, 31),
        current: false,
        description:
            "Began eCommerce journey by successfully delivering multiple projects on the Demandware and SGJC architecture, laying a strong foundation in scalable Salesforce B2C Commerce Cloud (SFCC) solutions. Designed and implemented high-performing, maintainable architectures across both implementation and managed services projects, ensuring reliability, scalability, and optimal performance. Over the past 3 years, demonstrated deep expertise in SFCC and SGJC by leading critical solution design, performance tuning, and architectural improvements for enterprise - grade eCommerce platforms, contributing to increased stability and business agility.",
        technologies: [
            "SFCC",
            "Demandware",
            "SGJC",
            "Javascript",
            "JQuery",
            "Third Party Integrations",
            "Pipelines"
        ],
        projects: ["Camping World", "Saje Natural Wellness", "London Drugs", "Uniqlo"]
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
        description: "Demonstrates expertise in developing and customizing Salesforce B2C Commerce Cloud solutions, including storefront development, business logic implementation, and integration capabilities."
    },
    {
        id: "2",
        name: "Salesforce Certified B2C Commerce Architect",
        issuer: "Salesforce",
        dateEarned: new Date(2025, 0, 22), // June 22, 2021
        verificationUrl: "https://www.salesforce.com/trailblazer/sjangir3",
        badgeUrl: "/images/badges/B2CArchitectBadge.png",
        description: "Validates advanced skills in designing and implementing complex B2C Commerce Cloud solutions, including architecture decisions, performance optimization, and enterprise-level integrations."
    },
    {
        id: "3",
        name: "Salesforce Certified Agentforce Specialist",
        issuer: "Salesforce",
        dateEarned: new Date(2025, 6, 10), // March 10, 2020
        verificationUrl: "https://www.salesforce.com/trailblazer/sjangir3",
        badgeUrl: "/images/badges/SalesforceAgentForce.png",
        description: "Certifies proficiency in JavaScript programming within the Salesforce ecosystem, including modern JavaScript features, asynchronous programming, and Lightning Web Components development."
    }
];

/**
 * Contact configuration for email services
 */
export const contactConfig = {
    // Gmail SMTP Configuration for Nodemailer
    smtp: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_USER || "",
            pass: process.env.GMAIL_APP_PASSWORD || "",
        },
    },

    // Email Configuration
    fromEmail: process.env.GMAIL_USER || "s.jangir129fl@gmail.com",
    fromName: "Sumit Jangid Portfolio",
    recipientEmail: "s.jangir129fl@gmail.com",

    // Email Templates and Subjects
    subjects: {
        project: "Project Inquiry",
        general: "General Inquiry",
        collaboration: "Collaboration Opportunity",
        other: "Other Inquiry",
        default: "Portfolio Contact",
    },

    defaultBody: "Hi Sumit,\n\nI came across your portfolio and would like to discuss a potential opportunity.\n\nBest regards"
};

/**
 * Social media links
 */
export const socialLinks: SocialLink[] = [
    {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/sumit-jangid/",
        icon: FaLinkedin,
    },
    {
        platform: "GitHub",
        url: "https://github.com/Sumitjj",
        icon: FaGithub,
    },
    {
        platform: "Salesforce Profile",
        url: "https://www.salesforce.com/trailblazer/sjangir3",
        icon: HiOutlineCloud,
    },
    {
        platform: "Email",
        url: "mailto:s.jangir129fl@gmail.com?subject=Portfolio%20Inquiry%20-%20Let's%20Connect&body=Hi%20Sumit,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity.%0D%0A%0D%0ABest%20regards",
        icon: HiOutlineMail,
    }
];