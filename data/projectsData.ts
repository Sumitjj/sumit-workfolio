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
        bannerImage: getOptimizedProjectImage("Full Beauty FBB"),
        longDescription: [
            "Worked on multiple brands under FullBeauty, focusing on checkout redesign in headless commerce.",
            "Implemented solutions using NextJs, NestJs, OCAPI, SCAPI, and more.",
            "Enhanced performance and scalability for high-traffic e-commerce.",
            "Collaborated with cross-functional teams for seamless integrations."
        ],
        categories: ["E-Commerce", "Headless Commerce"],
        title: "Full Beauty",
        description: [
            "Checkout redesign in headless commerce using NextJs, NestJs, OCAPI, SCAPI, B2C Commerce SDK, B2C Commerce Cloud, and scalability best practices.",
        ],
        image: getOptimizedProjectImage("Full Beauty FBB"),
        technologies: ["NextJs", "NestJs", "REST APIs", "SCAPI", "OCAPI", "SFRA", "B2C Commerce-SDK", "SGJC"],
        liveUrl: "https://www.fullbeauty.com/",
        featured: true,
        organization: "Merkle",
        customizations: [
            {
                title: "Headless Checkout Redesign",
                description: "Built a modular checkout with address, payment, and shipment steps orchestrated via SCAPI and custom services.",
                layer: "SCAPI"
            },
            {
                title: "Cart Promotions Engine",
                description: "Implemented custom promotion hooks and cartridge pipes to support complex coupon stacking rules.",
                layer: "Cartridge"
            },
            {
                title: "OCAPI Basket Orchestration",
                description: "Extended OCAPI hooks for resilient basket operations and inventory checks.",
                layer: "OCAPI"
            }
        ],
        integrations: [
            { name: "Stripe", purpose: "Primary payments (Cards, Wallets)", type: "Payment" },
            { name: "Klaviyo", purpose: "Email campaigns and flows", type: "Email" },
            { name: "Algolia", purpose: "Search & merchandising", type: "Search" },
            { name: "Segment", purpose: "Unified analytics tracking", type: "Analytics" }
        ]
    },
    {
        id: "2",
        title: "Lane Bryant",
        description: [
            "Developed Lane Bryant on the SFRA architecture to deliver a high-performance, scalable e-commerce platform for plus-size women’s fashion, ensuring an optimized user experience."
        ],
        image: getOptimizedProjectImage("LaneBryant"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.lanebryant.com/",
        longDescription: "Modern social media platform featuring real-time messaging, video sharing, live streaming capabilities, and advanced content moderation. Built for high scalability and performance.",
        categories: ["Web Development", "Real-time"],
        featured: true,
        organization: "Merkle",
        bannerImage: getOptimizedProjectImage("LaneBryant"),
        customizations: [
            {
                title: "Fit Guide Services",
                description: "Custom SFRA controllers invoking SCAPI to compute size recommendations.",
                layer: "SCAPI"
            },
            {
                title: "PLP Facets & SEO",
                description: "Cartridge-level pipelines for dynamic facets, canonical URLs, and SEO-friendly filters.",
                layer: "Cartridge"
            }
        ],
        integrations: [
            { name: "Adyen", purpose: "Global payments & 3DS", type: "Payment" },
            { name: "Contentful", purpose: "Content management for editorial blocks", type: "CMS" },
            { name: "Optimizely", purpose: "A/B testing on PDP/PLP", type: "A/B Testing" }
        ]
    },
    {
        id: "3",
        title: "Loreal",
        description: [
            "Built an SFRA-powered cosmetics platform with virtual try-on features, integrating OCAPI and LORA architecture to enhance the user experience across 80+ L’Oréal brands.",
        ],
        image: getOptimizedProjectImage("Loreal"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "http://lancome-usa.com/",
        longDescription: "Enterprise-grade task management platform with team collaboration, Gantt charts, time tracking, and comprehensive reporting. Integrates with popular development tools.",
        categories: ["Web Development", "Productivity"],
        featured: true,
        organization: "Publicis Sapient",
        bannerImage: getOptimizedProjectImage("Loreal"),
        customizations: [
            {
                title: "Virtual Try-On",
                description: "Frontend integration with PDP and SCAPI endpoints for variant overlays.",
                layer: "Frontend"
            },
            {
                title: "Personalized Offers",
                description: "SCAPI-driven promotions and customer groups for targeted discounts.",
                layer: "SCAPI"
            }
        ],
        integrations: [
            { name: "Cybersource", purpose: "Fraud & payments", type: "Security" },
            { name: "ModiFace", purpose: "AR Try-On SDK", type: "Other" },
            { name: "Adobe Analytics", purpose: "Customer behavior tracking", type: "Analytics" }
        ]
    },
    {
        id: "2",
        title: "Aquasana",
        description: [
            "Built on SFRA architecture to deliver a high performance and scalable e-Commerce platform.",
        ],
        image: getOptimizedProjectImage("Aquasana"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "3rd Party Integrations"],
        liveUrl: "https://www.aquasana.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["E-Commerce"],
        featured: false,
        organization: "Merkle",
        bannerImage: getOptimizedProjectImage("Aquasana"),
        customizations: [
            {
                title: "Configurator PDP",
                description: "SFRA-based PDP with option model and inventory matrix, persisted through OCAPI basket.",
                layer: "SFRA"
            },
            {
                title: "Subscription Flows",
                description: "Custom OCAPI hooks and BM jobs to sync subscription states.",
                layer: "OCAPI"
            }
        ],
        integrations: [
            { name: "Recurly", purpose: "Subscriptions billing", type: "Subscriptions" },
            { name: "Zendesk", purpose: "Customer support & tickets", type: "Support" },
            { name: "Google Analytics", purpose: "Event & funnel tracking", type: "Analytics" }
        ]
    },
    {
        id: "8",
        title: "Hotwater",
        description: [
            "Hotwater implementation on SFRA architecure to provide a water heater solutions and services."
        ],
        image: getOptimizedProjectImage("Hotwater"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.hotwater.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: false,
        organization: "Merkle",
        bannerImage: getOptimizedProjectImage("Hotwater"),
        customizations: [
            {
                title: "Dealer Locator",
                description: "Custom SFRA controllers and ISML to integrate geospatial search and stock availability.",
                layer: "SFRA"
            },
            {
                title: "Warranty Registration",
                description: "OCAPI-based service layer posting registrations to external ERP.",
                layer: "OCAPI"
            }
        ],
        integrations: [
            { name: "Google Maps", purpose: "Store & dealer locator", type: "Maps" },
            { name: "SendGrid", purpose: "Transactional emails", type: "Email" }
        ]
    },
    {
        id: "4",
        title: "LondonDrugs",
        description: [
            "Built on SFRA a multi brand retail platform with pharmacy and electronics store and many more."
        ],
        image: getOptimizedProjectImage("LondonDrugs"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.londondrugs.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
        bannerImage: getOptimizedProjectImage("LondonDrugs"),
        customizations: [
            {
                title: "Pharmacy Module",
                description: "BM jobs and OCAPI services to sync prescriptions and eligibility.",
                layer: "BM"
            },
            {
                title: "Loyalty Points",
                description: "Cartridge hook to award and redeem loyalty at basket and order placement.",
                layer: "Cartridge"
            }
        ],
        integrations: [
            { name: "Salesforce Marketing Cloud", purpose: "Journeys & promotions", type: "Email" },
            { name: "Bazaarvoice", purpose: "UGC & reviews", type: "Reviews" }
        ]
    },
    {
        id: "5",
        title: "Camping World",
        description: [
            "Camping world delivers the best camping experience with a wide range of products and services."
        ],
        image: getOptimizedProjectImage("Camping World"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.campingworld.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
        bannerImage: getOptimizedProjectImage("Camping World"),
        customizations: [
            {
                title: "Store Pickup",
                description: "Custom SFRA controller with OCAPI to fetch store inventory and pickup windows.",
                layer: "SFRA"
            }
        ],
        integrations: [
            { name: "Google Analytics", purpose: "Site analytics", type: "Analytics" }
        ]
    },
    {
        id: "6",
        title: "Saje Wellness",
        description: [
            "Saje wellness is a leading wellness brand that provides a wide range of Essential oils and diffusers."
        ],
        image: getOptimizedProjectImage("Saje"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.saje.com/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
        bannerImage: getOptimizedProjectImage("Saje"),
        customizations: [
            {
                title: "Inventory Syndication",
                description: "BM jobs and OCAPI services to sync stock from ERP to SFCC catalog.",
                layer: "BM"
            }
        ],
        integrations: [
            { name: "Algolia", purpose: "Search & discovery", type: "Search" }
        ]
    },
    {
        id: "7",
        title: "Uniqlo",
        description: [
            "Uniqlo is a leading global fashion brand that provides a wide range of products and services in appreal."
        ],
        image: getOptimizedProjectImage("Uniqlo"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.uniqlo.com/us/en/",
        longDescription: "Comprehensive learning platform with video streaming, interactive quizzes, progress analytics, and certification system. Supports multiple content formats and gamification.",
        categories: ["Web Development", "Education"],
        featured: false,
        organization: "PFSWeb",
        bannerImage: getOptimizedProjectImage("Uniqlo"),
        customizations: [
            {
                title: "PLP Performance",
                description: "Cartridge-level caching and search refinements for high-traffic PLPs.",
                layer: "Cartridge"
            }
        ],
        integrations: [
            { name: "Segment", purpose: "Unified event stream", type: "Analytics" }
        ]
    },
    {
        id: "9",
        title: "State",
        description: [
            "State water heaters is a leading brand that provides a wide range of water heaters and services."
        ],
        image: getOptimizedProjectImage("State"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.statewaterheaters.com/",
        longDescription: "Comprehensive analytics platform featuring machine learning algorithms for predictive analytics, real-time data processing, and interactive visualizations. Built for scalability and performance.",
        categories: ["Web Development", "AI/ML"],
        featured: false,
        organization: "Merkle",
        bannerImage: getOptimizedProjectImage("State"),
        customizations: [
            {
                title: "Smart Device Registration",
                description: "OCAPI custom endpoints to register and manage device warranties.",
                layer: "OCAPI"
            }
        ],
        integrations: [
            { name: "SendGrid", purpose: "Transactional notifications", type: "Email" }
        ]
    },
    {
        id: "10",
        title: "Reliance",
        description: [
            "Reliance water heaters is a leading brand that provides a wide range of water heaters and services."
        ],
        image: getOptimizedProjectImage("Reliance"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.reliancewaterheaters.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
        bannerImage: getOptimizedProjectImage("Reliance"),
        customizations: [
            {
                title: "B2B Pricing Tiers",
                description: "BM price books and cartridge logic for account-specific pricing.",
                layer: "BM"
            }
        ],
        integrations: [
            { name: "Stripe", purpose: "Card payments", type: "Payment" }
        ]
    },
    {
        id: "11",
        title: "American",
        description: [
            "American water heaters is a leading brand that provides a wide range of water heaters and services."
        ],
        image: getOptimizedProjectImage("American"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.americanwaterheater.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
        bannerImage: getOptimizedProjectImage("American"),
        customizations: [
            {
                title: "Warranty Claims",
                description: "OCAPI services and SFRA forms for claim submissions.",
                layer: "OCAPI"
            }
        ],
        integrations: [
            { name: "Google Analytics", purpose: "Measurement", type: "Analytics" }
        ]
    },
    {
        id: "12",
        title: "Lochinvar",
        description: [
            "Lochinvar is a leading brand that provides a wide range of water heaters and services."
        ],
        image: getOptimizedProjectImage("Lochinvar"),
        technologies: ["SFRA", "OCAPI", "REST APIs", "Integrations"],
        liveUrl: "https://www.lochinvar.com/",
        longDescription: "Full-featured mobile banking application with end-to-end encryption, biometric authentication, real-time transactions, and comprehensive financial management tools.",
        categories: ["Mobile Development", "Fintech"],
        featured: false,
        organization: "Merkle",
        bannerImage: getOptimizedProjectImage("Lochinvar"),
        customizations: [
            {
                title: "Service Tools Integration",
                description: "SCAPI orchestration for service parts lookup and order.",
                layer: "SCAPI"
            }
        ],
        integrations: [
            { name: "Adyen", purpose: "Payments & 3DS", type: "Payment" }
        ]
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
        bannerImage: getOptimizedProjectImage("AOSmith"),
        customizations: [
            {
                title: "Headless Category Experience",
                description: "Next.js frontend over SCAPI for high-performance catalog browsing.",
                layer: "Frontend"
            }
        ],
        integrations: [
            { name: "Segment", purpose: "Unified analytics layer", type: "Analytics" }
        ]
    },
];
