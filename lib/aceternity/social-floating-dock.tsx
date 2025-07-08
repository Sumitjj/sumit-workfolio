import React from "react";
import { FloatingDock } from "@/lib/aceternity/floating-dock";
import { socialLinks } from "@/data/portfolio";
import { handleEmailClick } from "@/lib/helpers/utils";

export function SocialFloatingDock({
    className,
    mobileClassName
}: {
    className?: string;
    mobileClassName?: string;
}) {
    const socialItems = socialLinks.map((social) => {
        const IconComponent = social.icon;

        // Handle email differently
        if (social.platform === "Email") {
            return {
                title: social.platform,
                icon: <IconComponent className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "#",
                onClick: () => handleEmailClick(
                    "s.jangir129@gmail.com",
                    "Portfolio Inquiry - Let's Connect",
                    "Hi Sumit,\n\nI came across your portfolio and would like to discuss a potential opportunity.\n\nBest regards"
                )
            };
        }

        return {
            title: social.platform,
            icon: <IconComponent className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: social.url,
            onClick: undefined
        };
    });

    return (
        <div className={className}>
            <FloatingDock
                items={socialItems}
                desktopClassName=""
                mobileClassName={mobileClassName}
            />
        </div>
    );
}
