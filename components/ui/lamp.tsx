"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/helpers/utils";

export const LampContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "relative flex min-h-[250px] flex-col items-start justify-start overflow-hidden bg-transparent w-full rounded-md z-0",
                className
            )}
        >
            <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
                {/* Horizontal Lamp Bar at Top */}
                <motion.div
                    initial={{ width: "2rem", opacity: 0 }}
                    whileInView={{ width: "32rem", opacity: 1 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent z-50"
                ></motion.div>

                {/* Lamp Bar Glow */}
                <motion.div
                    initial={{ width: "1rem", opacity: 0 }}
                    whileInView={{ width: "20rem", opacity: 0.6 }}
                    transition={{
                        delay: 0.4,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-2 bg-gradient-to-r from-transparent via-blue-300/60 to-transparent blur-sm z-40"
                ></motion.div>

                {/* Natural Light Cone Spread */}
                <motion.div
                    initial={{ opacity: 0, scaleY: 1, scaleX: 1 }}
                    whileInView={{ opacity: 0.2, scaleY: 1, scaleX: 1 }}
                    transition={{
                        delay: 0.6,
                        duration: 1.2,
                        ease: "easeOut",
                    }}
                    style={{
                        background: "radial-gradient(ellipse 84% 120% at 50% 0%, rgba(34, 211, 238, 0.15) 0%, rgba(147, 197, 253, 0.08) 40%, rgba(59, 130, 246, 0.04) 70%, transparent 100%)"
                    }}
                    className="absolute top-3 left-1/2 -translate-x-1/2 w-[108%] h-[84%] blur-md"
                ></motion.div>

                {/* Inner Light Cone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 3, scale: 1 }}
                    transition={{
                        delay: 0.8,
                        duration: 1.4,
                        ease: "easeOut",
                    }}
                    style={{
                        background: "radial-gradient(ellipse 72% 96% at 50% 0%, rgba(103, 232, 249, 0.12) 0%, rgba(96, 165, 250, 0.06) 50%, transparent 80%)"
                    }}
                    className="absolute top-5 left-1/2 -translate-x-1/2 w-[84%] h-[72%] blur-sm"
                ></motion.div>

                {/* Subtle Center Glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.3 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    transition={{
                        delay: 1,
                        duration: 1.6,
                        ease: "easeOut",
                    }}
                    style={{
                        background: "radial-gradient(ellipse 48% 72% at 50% 0%, rgba(165, 243, 252, 0.08) 0%, rgba(219, 234, 254, 0.04) 60%, transparent 100%)"
                    }}
                    className="absolute top-7 left-1/2 -translate-x-1/2 w-[60%] h-[60%] blur-lg"
                ></motion.div>
            </div>

            <div className="relative z-50 flex flex-col items-center px-4 pt-6 w-full">
                {children}
            </div>
        </div>
    );
};


