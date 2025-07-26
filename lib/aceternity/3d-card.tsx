"use client";

import { cn } from "@/lib/helpers/utils";

import React, {
    createContext,
    useState,
    useContext,
    useRef,
    useEffect,
} from "react";

import type {
    HTMLAttributes,
    ElementType,
    Dispatch,
    SetStateAction,
    MouseEvent,
} from "react";

interface MouseEnterContextType {
    isMouseEntered: boolean;
    setIsMouseEntered: Dispatch<SetStateAction<boolean>>;
}

const MouseEnterContext = createContext<MouseEnterContextType | undefined>(undefined);

interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
    containerClassName?: string;
}

export const CardContainer: React.FC<CardContainerProps> = ({
    children,
    className,
    containerClassName,
    ...props
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 50;
        const y = (e.clientY - top - height / 2) / 50;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseEnter = () => {
        setIsMouseEntered(true);
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    return (
        <MouseEnterContext.Provider value={{ isMouseEntered, setIsMouseEntered }}>
            <div
                className={cn("flex items-center justify-center", containerClassName)}
                style={{ perspective: "1000px" }}
                {...props}
            >
                <div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                        "flex items-center justify-center relative transition-all duration-200 ease-linear",
                        className
                    )}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {children}
                </div>
            </div>
        </MouseEnterContext.Provider>
    );
};

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> { }

export const CardBody: React.FC<CardBodyProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                "[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

interface CardItemProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    rotateX?: number | string;
    rotateY?: number | string;
    rotateZ?: number | string;
}

export const CardItem: React.FC<CardItemProps> = ({
    as: Tag = "div",
    children,
    className,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    ...rest
}) => {
    const ref = useRef<any>(null);
    const { isMouseEntered } = useMouseEnter();

    useEffect(() => {
        handleAnimations();
    }, [isMouseEntered]);

    const handleAnimations = () => {
        if (!ref.current) return;
        if (isMouseEntered) {
            ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        }
    };

    return (
        <Tag
            ref={ref}
            className={cn("w-fit transition duration-200 ease-linear", className)}
            {...rest}
        >
            {children}
        </Tag>
    );
};

// Hook to use the context
export const useMouseEnter = (): MouseEnterContextType => {
    const context = useContext(MouseEnterContext);
    if (context === undefined) {
        throw new Error("useMouseEnter must be used within a MouseEnterProvider");
    }
    return context;
};
