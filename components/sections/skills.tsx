"use client";

import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { 
  Code, 
  Database, 
  Wrench, 
  Zap,
  Server,
  Globe,
  Smartphone,
  Layers,
  Settings,
  Users,
  BarChart3,
  Shield,
  Cloud,
  GitBranch,
  Palette,
  Terminal,
  Package,
  Workflow,
  CheckCircle,
  Target,
  Sparkles
} from "lucide-react";
import { skills } from "@/data/portfolio";
import { cn } from "@/lib/utils";

// Icon mapping for different skills
const skillIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  "Salesforce B2C Commerce": Server,
  "Node.js": Terminal,
  "Express.js": Server,
  "RESTful APIs": Globe,
  "GraphQL": Database,
  "Microservices": Layers,
  "Database Design": Database,
  "Performance Optimization": BarChart3,
  "React": Code,
  "Next.js": Code,
  "TypeScript": Code,
  "JavaScript": Code,
  "HTML5": Globe,
  "CSS3": Palette,
  "Tailwind CSS": Palette,
  "Responsive Design": Smartphone,
  "Team Leadership": Users,
  "Project Management": Target,
  "Code Review": CheckCircle,
  "Git": GitBranch,
  "Docker": Package,
  "AWS": Cloud,
  "CI/CD": Workflow,
  "Testing": Shield,
  "Agile": Settings,
  "Problem Solving": Wrench,
};

// Predefined positions for consistent rendering
const skillPositions = [
  { top: "15%", left: "12%", size: "large" },
  { top: "8%", left: "28%", size: "medium" },
  { top: "22%", left: "45%", size: "small" },
  { top: "5%", left: "62%", size: "medium" },
  { top: "18%", left: "78%", size: "large" },
  { top: "35%", left: "8%", size: "small" },
  { top: "45%", left: "25%", size: "large" },
  { top: "38%", left: "42%", size: "medium" },
  { top: "50%", left: "58%", size: "small" },
  { top: "42%", left: "75%", size: "medium" },
  { top: "62%", left: "15%", size: "medium" },
  { top: "55%", left: "35%", size: "small" },
  { top: "68%", left: "52%", size: "large" },
  { top: "60%", left: "70%", size: "small" },
  { top: "75%", left: "25%", size: "large" },
  { top: "82%", left: "45%", size: "medium" },
  { top: "78%", left: "65%", size: "medium" },
  { top: "85%", left: "8%", size: "small" },
  { top: "88%", left: "82%", size: "small" },
  { top: "92%", left: "35%", size: "small" },
];

// Size configurations
const sizeConfig = {
  small: {
    width: "w-20 h-20 sm:w-24 sm:h-24",
    text: "text-xs",
    icon: "w-4 h-4",
    padding: "p-3",
  },
  medium: {
    width: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
    text: "text-sm",
    icon: "w-5 h-5",
    padding: "p-4",
  },
  large: {
    width: "w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36",
    text: "text-sm sm:text-base",
    icon: "w-6 h-6",
    padding: "p-5",
  },
};

/**
 * Floating Skill Bubble Component
 */
interface SkillBubbleProps {
  skill: { name: string; category: string };
  position: { top: string; left: string; size: string };
  index: number;
}

function SkillBubble({ skill, position, index }: SkillBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = skillIcons[skill.name] || Code;
  const sizeData = sizeConfig[position.size as keyof typeof sizeConfig];
  
  // Category-based gradients
  const categoryGradients = {
    backend: "from-blue-500/20 via-blue-400/10 to-blue-600/20",
    frontend: "from-green-500/20 via-green-400/10 to-green-600/20",
    other: "from-purple-500/20 via-purple-400/10 to-purple-600/20",
  };

  const categoryBorders = {
    backend: "border-blue-400/30",
    frontend: "border-green-400/30", 
    other: "border-purple-400/30",
  };

  const categoryIconColors = {
    backend: "text-blue-400",
    frontend: "text-green-400",
    other: "text-purple-400",
  };

  const gradient = categoryGradients[skill.category as keyof typeof categoryGradients] || categoryGradients.other;
  const borderColor = categoryBorders[skill.category as keyof typeof categoryBorders] || categoryBorders.other;
  const iconColor = categoryIconColors[skill.category as keyof typeof categoryIconColors] || categoryIconColors.other;

  return (
    <Fade delay={index * 100} triggerOnce>
      <div
        className="absolute transition-all duration-700 ease-out hover:z-10"
        style={{
          top: position.top,
          left: position.left,
          transform: isHovered ? 'translate(-50%, -50%) scale(1.1)' : 'translate(-50%, -50%)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            "relative group cursor-pointer flex flex-col items-center justify-center rounded-full transition-all duration-500",
            sizeData.width,
            sizeData.padding,
            "backdrop-blur-xl border-2",
            `bg-gradient-to-br ${gradient}`,
            borderColor,
            "hover:shadow-2xl hover:shadow-primary/25",
            "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100"
          )}
        >
          {/* Floating particles */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
            <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          </div>

          <div className={cn("mb-2 transition-all duration-300", isHovered ? "scale-110 rotate-12" : "")}>
            <IconComponent 
              className={cn(
                sizeData.icon,
                iconColor,
                "transition-all duration-300 drop-shadow-lg"
              )} 
            />
          </div>

          <span 
            className={cn(
              sizeData.text,
              "font-medium text-center leading-tight text-white/90 transition-all duration-300",
              isHovered ? "text-white scale-105" : ""
            )}
          >
            {skill.name}
          </span>

          <div 
            className={cn(
              "absolute inset-0 rounded-full transition-opacity duration-500",
              `bg-gradient-to-br ${gradient}`,
              "blur-xl scale-150 opacity-0 group-hover:opacity-60"
            )}
          />
        </div>
      </div>
    </Fade>
  );
}

/**
 * Modern Floating Skills Section - 2025 Design
 */
export function SkillsSection() {
  return (
    <section id="skills" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Dynamic Gradient Mesh Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background/5 to-secondary/8" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/15 to-transparent rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-green-500/15 to-transparent rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-purple-500/15 to-transparent rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                               radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`,
              backgroundSize: '400px 400px, 300px 300px, 500px 500px'
            }}
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Modern Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-primary/20 rounded-full blur-lg animate-pulse" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground ml-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
                Tech Universe
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Navigate through my constellation of technologies and expertise
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary mx-auto mt-8 rounded-full animate-pulse" />
          </div>
        </Fade>

        {/* Floating Skills Universe */}
        <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] overflow-hidden rounded-3xl">
          {/* Background glass effect */}
          <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-background/20 via-background/10 to-background/20 rounded-3xl border border-border/20" />
          
          {/* Skills floating in space */}
          {skills.slice(0, 20).map((skill, index) => (
            <SkillBubble
              key={skill.name}
              skill={skill}
              position={skillPositions[index] || skillPositions[0]}
              index={index}
            />
          ))}

          {/* Interactive connection lines (subtle) */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="50%" stopColor="rgba(34, 197, 94, 0.3)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.3)" />
              </linearGradient>
            </defs>
            {/* Subtle connecting lines between skills */}
            <line x1="15%" y1="20%" x2="45%" y2="25%" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="62%" y1="8%" x2="78%" y2="22%" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" begin="1s" />
            </line>
            <line x1="25%" y1="50%" x2="52%" y2="75%" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.3;0.1" dur="5s" repeatCount="indefinite" begin="2s" />
            </line>
          </svg>

          {/* Floating particles */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-20 right-20 w-1 h-1 bg-secondary/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-green-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
        </div>
      </div>
    </section>
  );
} 