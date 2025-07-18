import {
    FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaJava, FaJenkins, FaGithub, FaLinkedin, FaNode
} from "react-icons/fa";
import {
    SiPwa, SiMongodb, SiTailwindcss, SiJira,
    SiJquery, SiNestjs, SiMainwp, SiCodesignal, SiBackendless, SiGoogledataproc
} from "react-icons/si";
import { GiDeerHead } from "react-icons/gi";

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
        icon: SiBackendless,
        skills: [
            { name: "SFRA", icon: FaSalesforce },
            { name: "SGJC", icon: FaSalesforce },
            { name: "OCAPI/SCAPI", icon: TbPackages },
            { name: "Javascript", icon: IoLogoJavascript },
            { name: "Typescript", icon: BiLogoTypescript },
            { name: "B2C Commerce-SDK", icon: TbSdk },
            { name: "RESTful APIs", icon: TbApi },
            { name: "Node.js", icon: FaNode },
            { name: "NEST JS", icon: SiNestjs },
            { name: "Core Java", icon: FaJava },
            { name: "MongoDB", icon: SiMongodb },
        ]
    },
    {
        title: "Frontend & Headless",
        icon: GiDeerHead,
        skills: [
            { name: "React Js", icon: FaReact },
            { name: "Next Js", icon: TbBrandNextjs },
            { name: "JavaScript", icon: IoLogoJavascript },
            { name: "Typescript", icon: BiLogoTypescript },
            { name: "HTML5", icon: FaHtml5 },
            { name: "CSS3", icon: FaCss3Alt },
            { name: "Tailwind CSS", icon: SiTailwindcss },
            { name: "JQuery", icon: SiJquery },
            { name: "PWA Kit", icon: SiPwa },

        ]
    },
    {
        title: "Leadership & Process",
        icon: SiGoogledataproc,
        skills: [
            { name: "Agile/Scrum", icon: DiScrum },
            { name: "Team Leadership", icon: SiMainwp },
            { name: "System Design", icon: SiCodesignal },
            { name: "Project Management", icon: MdManageAccounts },
            { name: "Jira", icon: SiJira },
            { name: "GitHub", icon: FaGitAlt },
            { name: "Jenkins", icon: FaJenkins },
        ]
    }
];

/**
 * Navigation items for the portfolio
 */
export const navigationItems: NavItem[] = [
    { href: "#skills", label: "Toolkit" },
    { href: "#projects", label: "Creations" },
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
    email: "s.jangir129@gmail.com",
    phone: "+91 (995) 079-4448",
    bio: "Transforming e-commerce vision into reality with 9+ years of SFCC mastery. Trusted by brands to build fast, flexible, and future- ready digital storefronts.",
    avatar: getOptimizedAvatarImage("Sumit Jangid"),
    resume: "/resume/SumitJangid_Resume_2025.docx",
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
        title: "FullBeauty",
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
        title: "Aquasana Water Filters",
        description:
            "Comprehensive water filtration e-commerce platform featuring advanced product configurators, subscription management, and integrated customer support systems.",
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
        description:
            "Water heating solutions platform with product configurators, energy efficiency calculators, and professional installation network integration.",
        image: getOptimizedProjectImage("Hotwater"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "3",
        title: "Lane Bryant",
        description:
            "Fashion retail platform with size-inclusive shopping experience, advanced fitting guides, and personalized style recommendations for plus-size customers.",
        image: getOptimizedProjectImage("LaneBryant"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "3rd-Party Integrations"],
        liveUrl: "https://www.lanebryant.com/",
        longDescription: "Modern social media platform featuring real-time messaging, video sharing, live streaming capabilities, and advanced content moderation. Built for high scalability and performance.",
        categories: ["Web Development", "Real-time"],
        featured: true,
        organization: "Merkle",
    },
    {
        id: "4",
        title: "London Drugs",
        description:
            "Multi-category retail platform with pharmacy services, electronics, home goods, and health products with integrated loyalty programs.",
        image: getOptimizedProjectImage("LondonDrugs"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "3rd-Party Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
    },
    {
        id: "13",
        title: "Loreal",
        description:
            "Premium beauty and cosmetics platform with virtual try-on features, skin analysis tools, and personalized product recommendations.",
        image: getOptimizedProjectImage("Loreal"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "3rd-Party Integrations"],
        liveUrl: "http://lancome-usa.com/",
        longDescription: "Enterprise-grade task management platform with team collaboration, Gantt charts, time tracking, and comprehensive reporting. Integrates with popular development tools.",
        categories: ["Web Development", "Productivity"],
        featured: true,
        organization: "Publicis Sapient",
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
        organization: "PFSWeb",
    },
    {
        id: "6",
        title: "Saje Natural Wellness",
        description:
            "Natural wellness and aromatherapy e-commerce platform featuring essential oils, wellness products, and educational content for holistic health.",
        image: getOptimizedProjectImage("Saje"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
    },
    {
        id: "7",
        title: "Uniqlo",
        description:
            "Global fashion retailer with innovative clothing technology, sustainable practices, and seamless omnichannel shopping experiences.",
        image: getOptimizedProjectImage("Uniqlo"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
    },
    {
        id: "9",
        title: "State Water Heaters",
        description:
            "Commercial and residential water heating solutions with advanced product selection tools, warranty management, and dealer locator systems.",
        image: getOptimizedProjectImage("State"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "10",
        title: "Reliance Water Heaters",
        description:
            "Reliable water heating solutions platform with energy-efficient products, smart home integration, and comprehensive customer support.",
        image: getOptimizedProjectImage("Reliance"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.hotwater.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "11",
        title: "American Water Heaters",
        description:
            "Professional-grade water heating systems with advanced controls, energy monitoring, and maintenance scheduling for commercial applications.",
        image: getOptimizedProjectImage("American"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.hotwater.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "12",
        title: "Lochinvar",
        description:
            "High-efficiency commercial water heating and boiler systems with smart controls, remote monitoring, and predictive maintenance capabilities.",
        image: getOptimizedProjectImage("Lochinvar"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.hotwater.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
    },
    {
        id: "13",
        title: "AO Smith Corp",
        description:
            "Global water technology solutions with innovative products, smart connectivity, and comprehensive service networks for residential and commercial markets.",
        image: getOptimizedProjectImage("AOSmith"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Third-Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
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
        position: "Salesforce Certified B2C Commerce Technical Lead",
        company: "Merkle",
        startDate: new Date(2021, 3, 1),
        current: true,
        description:
            "Results-driven Salesforce B2C Commerce Cloud Technical Lead with 9+ years of experience in designing and implementing scalable, high- performing eCommerce solutions",
        technologies: [
            "SFRA",
            "SGJC",
            "Node.js",
            "NestJs",
            "JavaScript/TypeScript",
            "NextJs",
            "Commerce SDK",
            "SCAPI/OCAPI"
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
            "Managed dedicated support for L'Oréal, handling major issue resolution and enhancement requests. ",
        technologies: [
            "SFCC",
            "SGJC",
            "JavaScript",
            "SCSS",
            "Webpack",
            "SFRA"
        ],
        projects: ["Loreal"]
    },
    {
        id: "3",
        position: "Salesforce Commerce Cloud Developer",
        company: "PFSWeb",
        startDate: new Date(2016, 1, 1),
        endDate: new Date(2019, 4, 31),
        current: false,
        description:
            "Delivered multiple SFCC implementations and managed services projects, ensuring robust and scalable solutions.",
        technologies: [
            "SFCC",
            "Demandware",
            "SGJC",
            "Javascript",
            "JQuery",
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
        project: "Project Inquiry",
        general: "General Inquiry",
        collaboration: "Collaboration Opportunity",
        default: "Casual Talk",
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
        url: "mailto:s.jangir129@gmail.com?subject=Portfolio%20Inquiry%20-%20Let's%20Connect&body=Hi%20Sumit,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity.%0D%0A%0D%0ABest%20regards",
        icon: HiOutlineMail,
    }
];