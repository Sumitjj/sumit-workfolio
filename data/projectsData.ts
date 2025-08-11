// Stats and Heading informations imports
import { FiZap, FiUsers, FiCode, FiAward } from "react-icons/fi";
import { getOptimizedProjectImage } from "@/lib/helpers/images";
import { Project } from "@/types";


// All the sections stats and heading informations
export const PROJECT_STATS = [
    {
        icon: FiZap,
        label: "SCALABLE PROJECTS ARCHITECTED",
        value: "15+",
        color: "#0070d2",
        gradient: "from-blue-500/10 via-blue-600/5 to-purple-600/10",
        textGradient: "linear-gradient(to right, #0070d2, #6f42c1, #0070d2)",
        shadowColor: "#0070d2",
    },
    {
        icon: FiUsers,
        label: "GLOBAL CLIENTS EMPOWERED",
        value: "10+",
        color: "#059669",
        gradient: "from-emerald-500/10 via-green-600/5 to-teal-600/10",
        textGradient: "linear-gradient(to right, #059669, #14b8a6, #059669)",
        shadowColor: "#059669",
    }
];

// Professional highlights data
export const PROFESSIONAL_HIGHLIGHTS = [
    {
        icon: FiCode,
        title: "Expert Development",
        description: "Specialized in Salesforce Commerce Cloud with 9+ years of enterprise experience",
    },
    {
        icon: FiAward,
        title: "Certified Professional",
        description: "Salesforce B2C Commerce Cloud certified with proven track record",
    },
    {
        icon: FiUsers,
        title: "Client Success",
        description: "Delivered successful solutions for enterprise clients worldwide",
    }
];


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
