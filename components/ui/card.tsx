import * as React from "react";
import { cn } from "@/lib/helpers/utils";

/**
 * Card root component with glass morphism styling
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "elevated" | "bordered";
    hover?: boolean;
  }
>(({ className, variant = "default", hover = false, ...props }, ref) => {
  const variants = {
    default: "bg-card text-card-foreground shadow-sm",
    glass: "glass backdrop-blur-xl bg-white/10 dark:bg-black/10",
    elevated: "bg-card text-card-foreground shadow-xl",
    bordered: "bg-card text-card-foreground border-2 border-border",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border transition-all duration-300",
        variants[variant],
        hover && "hover-lift hover:shadow-2xl",
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

/**
 * Card header component
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * Card title component
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * Card description component
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * Card content component
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Card footer component
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }; 