import { cn } from "@/lib/helpers/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";

import { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
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

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <a
                                    href={item.href}
                                    key={item.title}
                                    onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!(); } : undefined}
                                    className="flex h-14 w-14 items-center justify-center rounded-full"
                                >
                                    <div className="h-6 w-6">{item.icon}</div>
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-14 w-14 items-center justify-center rounded-full"
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
    items: { title: string; icon: React.ReactNode; href: string; onClick?: () => void }[];
    className?: string;
}) => {
    const mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden h-10 items-end gap-2 md:flex",
                className,
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    icon,
    href,
    onClick,
}: {
    mouseX: MotionValue;
    icon: React.ReactNode;
    href: string;
    onClick?: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [60, 120, 60]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [60, 120, 60]);

    const widthTransformIcon = useTransform(distance, [-150, 0, 150], [28, 56, 28]);
    const heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [28, 56, 28],
    );

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    const heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
    };

    const isExternal = !onClick && href && href !== "#";
    return (
        <a
            href={href}
            onClick={handleClick}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            <motion.div
                ref={ref}
                style={{ width, height }}
                className="relative flex aspect-square items-center justify-center rounded-full"
            >
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </a>
    );
} 