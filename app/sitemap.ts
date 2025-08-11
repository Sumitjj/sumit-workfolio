import { personalInfo } from "@/data/personalData";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = personalInfo.websiteUrl || "https://www.sumitworkfolio.in";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        // Avoid fragment URLs (#...) in XML sitemap; search engines ignore fragments
    ];
}
