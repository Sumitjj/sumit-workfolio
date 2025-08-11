import { Experience } from "@/types";

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
