import { personalInfo } from "@/data/personalData";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = personalInfo.websiteUrl || "https://sumitworkfolio.in";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/private/", "/admin/", "/api/", "/_next/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
