import { personalInfo } from "@/data/personalData";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = personalInfo.websiteUrl || "https://sumitworkfolio.in";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/private/", "/admin/", "/*.json", "/*.xml"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
