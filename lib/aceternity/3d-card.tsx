"use client";

import { cn } from "@/lib/helpers/utils";

import React, {
    createContext,
    useContext,
} from "react";

import type {
    HTMLAttributes,
    ElementType,
    Dispatch,
    SetStateAction,
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
    return (
        <MouseEnterContext.Provider value={{ isMouseEntered: false, setIsMouseEntered: () => undefined }}>
            <div
                className={cn("flex items-center justify-center", containerClassName)}
                {...props}
            >
                <div
                    className={cn(
                        "flex items-center justify-center relative",
                        className
                    )}
                >
                    {children}
                </div>
            </div>
        </MouseEnterContext.Provider>
    );
};

export const CardBody: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
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
    translateX: _translateX = 0,
    translateY: _translateY = 0,
    translateZ: _translateZ = 0,
    rotateX: _rotateX = 0,
    rotateY: _rotateY = 0,
    rotateZ: _rotateZ = 0,
    ...rest
}) => {
    void _translateX;
    void _translateY;
    void _translateZ;
    void _rotateX;
    void _rotateY;
    void _rotateZ;

    return (
        <Tag
            className={cn("w-fit", className)}
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
