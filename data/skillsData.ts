import {
    FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaJava, FaJenkins, FaGithub, FaLinkedin, FaNode,
    FaBitbucket
} from "react-icons/fa";
import {
    SiPwa, SiMongodb, SiTailwindcss, SiJira,
    SiJquery, SiNestjs, SiMainwp, SiCodesignal, SiGoogledataproc
} from "react-icons/si";
import { Cpu } from "lucide-react";
import { GiDeerHead } from "react-icons/gi";
import { PiLightningFill, PiFileHtmlDuotone } from "react-icons/pi";
import { DiScrum } from "react-icons/di";
import { MdManageAccounts } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { BiLogoTypescript } from "react-icons/bi";
import { FaSalesforce } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io";
import { TbSdk } from "react-icons/tb";
import { TbApi } from "react-icons/tb";
import { TbBrandNextjs } from "react-icons/tb";
import { SkillGroup } from "@/types";

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