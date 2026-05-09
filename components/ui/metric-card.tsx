import React from "react";
import { cn } from "@/lib/helpers/utils";

interface MetricCardProps {
  icon: React.ElementType;
  value: React.ReactNode;
  label: string;
  accent: string;
  caption?: string;
  className?: string;
}

export function MetricCard({
  icon: Icon,
  value,
  label,
  accent,
  caption,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "group motion-card relative flex h-full min-h-[92px] overflow-hidden rounded-xl border border-border/45 bg-card/80 p-3 text-left shadow-sm sm:min-h-[118px] sm:p-4",
        "transition-[border-color,background-color,box-shadow,transform] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/95",
        className
      )}
      style={{ boxShadow: `0 12px 28px -24px ${accent}` }}
    >
      <div className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: accent }} />

      <div className="relative flex w-full min-w-0 items-center gap-2.5 pl-1 sm:gap-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-background/65 shadow-inner sm:h-11 sm:w-11"
          style={{ color: accent }}
        >
          <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <div className="min-w-0 max-w-full text-[clamp(1.55rem,7vw,2rem)] font-black leading-[0.95] text-foreground sm:text-2xl lg:text-3xl">
              {value}
            </div>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase leading-snug tracking-[0.11em] text-muted-foreground sm:text-[11px] sm:tracking-[0.15em]">
            {label}
          </div>
          {caption && (
            <div className="mt-1 break-words text-[11px] leading-snug text-muted-foreground/80 sm:text-sm">
              {caption}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
