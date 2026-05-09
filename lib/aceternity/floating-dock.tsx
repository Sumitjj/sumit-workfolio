import { cn } from "@/lib/helpers/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { useState } from "react";

type DockItem = {
    title: string;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
};

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: DockItem[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const DockLink = ({ item, className }: { item: DockItem; className?: string }) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.onClick) {
            event.preventDefault();
            item.onClick();
        }
    };

    const isExternal = !item.onClick && item.href && item.href !== "#";

    return (
        <a
            href={item.href}
            aria-label={item.title}
            title={item.title}
            onClick={handleClick}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
                "flex aspect-square items-center justify-center rounded-full border border-border/30 bg-card/60 text-neutral-500 shadow-sm",
                "transition-[color,background-color,border-color,transform] duration-200 ease-out",
                "hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary dark:text-neutral-300",
                className
            )}
        >
            <span className="flex h-5 w-5 items-center justify-center">{item.icon}</span>
        </a>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: DockItem[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={cn("relative block md:hidden", className)}>
            {open && (
                <div className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2">
                    {items.map((item) => (
                        <DockLink key={item.title} item={item} className="h-12 w-12" />
                    ))}
                </div>
            )}
            <button
                type="button"
                aria-expanded={open}
                aria-label="Toggle social links"
                onClick={() => setOpen((current) => !current)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border/30 bg-card/70"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: DockItem[];
    className?: string;
}) => {
    return (
        <div className={cn("mx-auto hidden items-center gap-3 md:flex", className)}>
            {items.map((item) => (
                <DockLink key={item.title} item={item} className="h-10 w-10" />
            ))}
        </div>
    );
};
