"use client";
import React from "react";
import { SparklesCore } from "./sparkles";

interface FooterSparklesProps {
    className?: string;
}

export function FooterSparkles({ className }: FooterSparklesProps) {
    return (
        <div className={`relative w-full flex flex-col items-center pointer-events-none ${className}`} style={{ zIndex: 0 }}>
            {/* Static glowing line, full width, glow only in center, ultra-thin line */}
            <div className="relative w-full flex justify-center items-center" style={{ height: '20px' }}>
                <svg
                    width="100%"
                    height="8"
                    viewBox="0 0 1000 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-8"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    <defs>
                        <linearGradient id="footerLineGradient" x1="0" y1="4" x2="1000" y2="4" gradientUnits="userSpaceOnUse">
                            <stop offset="20%" stopColor="rgba(110,231,183,0)" />
                            <stop offset="40%" stopColor="rgba(110,231,183,0.4)" />
                            <stop offset="50%" stopColor="rgba(110,231,183,1)" />
                            <stop offset="60%" stopColor="rgba(110,231,183,0.5)" />
                            <stop offset="100%" stopColor="rgba(110,231,183,0)" />
                        </linearGradient>
                        <radialGradient id="footerLineGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="20%" stopColor="rgba(110,231,183,0.5)" />
                            <stop offset="60%" stopColor="rgba(110,231,183,0.1)" />
                            <stop offset="100%" stopColor="rgba(110,231,183,0)" />
                        </radialGradient>
                    </defs>
                    {/* Glow */}
                    <rect x="0" y="0" width="1000" height="8" fill="url(#footerLineGlow)" />
                    {/* Ultra-thin Line */}
                    <line x1="0" y1="4" x2="1000" y2="4" stroke="url(#footerLineGradient)" strokeWidth="0.8" strokeLinecap="round" />
                </svg>
            </div>
            {/* Sparkles effect, below the line, curved density, masked */}
            <div
                className="absolute left-1/2 -translate-x-1/2 top-6 w-[45rem] max-w-full h-20"
                style={{
                    maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, white 80%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, white 80%, transparent 100%)',
                }}
            >
                <SparklesCore
                    background="transparent"
                    minSize={0.6}
                    maxSize={1}
                    particleDensity={500}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
        </div>
    );
}