import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineCloud, HiOutlineMail } from "react-icons/hi";
import { SocialLink } from "@/types";
import { getOptimizedAvatarImage } from "@/lib/helpers/images";

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

/**
 * Footer content
 */
export const footerContent = {
    copyright: "Designed & developed by",
    craftedWith: "Crafted with",
    connectWith: "Connect with me",
    alwaysLearning: "Always learning, always building",
};

