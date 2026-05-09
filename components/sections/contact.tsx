"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  FiMessageSquare,
  FiMail,
  FiUser,
  FiHome,
  FiFile,
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiClock,
  FiAward,
  FiGlobe,
  FiCoffee
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/ui/metric-card";
import { cn } from "@/lib/helpers/utils";
import { ChevronDown, Sparkles } from "lucide-react";

const Fade = ({ children }: { children: React.ReactNode;[key: string]: unknown }) => <>{children}</>;

// Form data interface
interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

// Form validation errors interface
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Form submission states
type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

const SUBJECT_OPTIONS = [
  { value: "project", label: "Project Discussion" },
  { value: "general", label: "General Inquiry" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Other" },
] as const;

/**
 * Highlight metrics component aligned with website theme
 */
function HighlightMetrics() {
  const metrics = [
    {
      icon: FiClock,
      value: "< 24h",
      label: "Quick Response",
      description: "Fast turnaround time",
      accent: "#f59e0b"
    },
    {
      icon: FiAward,
      value: "10+",
      label: "Years Experience",
      description: "Proven track record",
      accent: "#10b981"
    },
    {
      icon: FiGlobe,
      value: "Global",
      label: "Remote Ready",
      description: "Worldwide collaboration",
      accent: "#3b82f6"
    }
  ];

  return (
    <div className="relative">
      {/* Theme-aligned background */}
      <div className="rounded-2xl border border-border/25 bg-card/55 shadow-lg shadow-black/5">
        <div className="p-4 sm:p-8">
          {/* Header matching website style */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h4 className="mx-auto max-w-sm text-base font-semibold leading-snug text-foreground sm:text-lg dark:text-emerald-300">
              What you can expect after hitting send button
            </h4>
          </div>

          {/* Metrics grid using website card styling */}
          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:auto-rows-fr">
            {metrics.map((metric) => (
              <div key={metric.label} className="h-full">
                <MetricCard
                  icon={metric.icon}
                  value={metric.value}
                  label={metric.label}
                  caption={metric.description}
                  accent={metric.accent}
                  className="min-h-[104px] md:min-h-[158px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Beautiful contact form with validation and Gmail SMTP integration via Nodemailer
 */
function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: 'project',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);

  const selectedSubject = SUBJECT_OPTIONS.find(option => option.value === formData.subject) ?? SUBJECT_OPTIONS[0];
  const fieldClassName = "w-full min-h-[58px] sm:min-h-[62px] lg:min-h-[68px] px-3 py-3 sm:px-4 sm:py-3 lg:py-4 rounded-xl border border-border/30 bg-background/70 text-sm sm:text-base transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-muted-foreground/60 touch-manipulation focus:outline-none focus:border-emerald-400/85 focus:ring-2 focus:ring-emerald-400/35 focus:bg-background/85 hover:border-emerald-300/45";

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!subjectDropdownRef.current?.contains(event.target as Node)) {
        setIsSubjectOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSubjectOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Validate form fields
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent multiple submissions
    if (submissionState === 'sending') return;

    if (!validateForm()) return;

    setSubmissionState('sending');

    try {
      // Send email via our new API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || '',
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmissionState('success');

        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            subject: 'project',
            message: ''
          });
          setSubmissionState('idle');
        }, 100);
      } else {
        setSubmissionState('error');
        console.error('Email sending failed:', result.message);

        // Reset error state after 5 seconds
        setTimeout(() => {
          setSubmissionState('idle');
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmissionState('error');

      // Reset error state after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    }
  }, [formData, submissionState, validateForm]);

  // Handle input changes
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear specific error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl border border-border/30 bg-gradient-to-br from-background/90 to-background/60 shadow-2xl h-full flex flex-col">
      {/* Responsive Form Header */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <div className="section-icon-mono relative inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl border mb-4 sm:mb-6">
          <FiMessageSquare className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-foreground" />
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-2 sm:mb-3 dark:text-emerald-300">Drop Me a Line</h3>
      </div>

      {/* Responsive Contact Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6 flex-1">
        {/* Name & Email Row - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center dark:text-emerald-300">
              <FiUser className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={cn(
                fieldClassName,
                errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/35"
              )}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center">
                <FiAlertCircle className="w-3 h-3 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center dark:text-emerald-300">
              <FiMail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={cn(
                fieldClassName,
                errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/35"
              )}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center">
                <FiAlertCircle className="w-3 h-3 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Company & Subject Row - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center dark:text-emerald-300">
              <FiHome className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className={fieldClassName}
              placeholder="Your company (optional)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center dark:text-emerald-300">
              <FiFile className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
              Subject *
            </label>
            <div ref={subjectDropdownRef} className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isSubjectOpen}
                onClick={() => setIsSubjectOpen(prev => !prev)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setIsSubjectOpen(true);
                  }
                }}
                className={cn(
                  fieldClassName,
                  "text-left flex items-center justify-between gap-3",
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
                  errors.subject && "border-red-500 focus:border-red-500 focus:ring-red-500/35"
                )}
              >
                <span className="font-medium text-foreground/90">{selectedSubject.label}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald-300/25 bg-emerald-400/10 text-emerald-300">
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isSubjectOpen && "rotate-180")} />
                </span>
              </button>

              {isSubjectOpen && (
                <div className="mt-2 overflow-hidden rounded-xl border border-primary/20 bg-background/95 shadow-2xl shadow-primary/10">
                  <div className="p-1" role="listbox" aria-label="Subject">
                    {SUBJECT_OPTIONS.map((option) => {
                      const isSelected = option.value === formData.subject;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            handleInputChange('subject', option.value);
                            setIsSubjectOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm sm:text-base transition-colors duration-200",
                            isSelected
                              ? "bg-gradient-to-r from-primary/20 to-emerald-500/15 text-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                          )}
                        >
                          <span className="font-medium">{option.label}</span>
                          {isSelected && <FiCheck className="h-4 w-4 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            {errors.subject && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center">
                <FiAlertCircle className="w-3 h-3 mr-1" />
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        {/* Message - Responsive */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground flex items-center dark:text-emerald-300">
            <FiMessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={5}
            className={cn(
              fieldClassName,
              "min-h-[150px] resize-none",
              errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500/35"
            )}
            placeholder="Tell me about your project, ideas, or how we can work together..."
          />
          {errors.message && (
            <p className="text-xs sm:text-sm text-red-500 flex items-center">
              <FiAlertCircle className="w-3 h-3 mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Responsive Submit Button */}
        <Button
          type="submit"
          disabled={submissionState === 'sending'}
          onClick={(e) => {
            // Additional click handler to prevent multiple submissions
            if (submissionState === 'sending') {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          className={cn(
            "w-full min-h-[64px] sm:min-h-[72px] px-5 py-4 text-base sm:text-lg font-extrabold relative overflow-hidden transition-[color,background-color,border-color,box-shadow,transform] duration-200 group touch-manipulation",
            "rounded-2xl border border-emerald-300/45 bg-gradient-to-r from-emerald-500/15 via-card to-cyan-500/10 text-foreground shadow-xl shadow-emerald-500/15",
            "hover:-translate-y-0.5 hover:border-emerald-300/80 hover:from-emerald-400/20 hover:to-cyan-400/15 hover:shadow-2xl hover:shadow-emerald-500/20",
            "focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-0",
            "before:absolute before:inset-x-4 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-emerald-200/90 before:to-transparent",
            submissionState === 'success' && "bg-green-600 hover:bg-green-600",
            submissionState === 'error' && "bg-red-600 hover:bg-red-600"
          )}
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {submissionState === 'idle' && (
              <>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-300/15 text-emerald-200 shadow-inner transition-transform duration-200 group-hover:translate-x-0.5">
                  <FiSend className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span>Send Message</span>
              </>
            )}
            {submissionState === 'sending' && (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            )}
            {submissionState === 'success' && (
              <>
                <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Message Sent!</span>
              </>
            )}
            {submissionState === 'error' && (
              <>
                <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Failed to Send</span>
              </>
            )}
          </div>
        </Button>

        {/* Enhanced Highlight Metrics */}
        <div className="pt-4 sm:pt-6">
          <Fade direction="up" triggerOnce delay={400}>
            <HighlightMetrics />
          </Fade>
        </div>
      </form>
    </div>
  );
}

/**
 * Main Contact Section Component - Fully Responsive
 */
export function ContactSection() {
  return (
    <section id="contact" className="relative pt-10 sm:pt-12 lg:pt-16 pb-8 sm:pb-10 lg:pb-14 overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Responsive Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            {/* Coffee Icon with Professional Positioning */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="section-icon-mono motion-icon ambient-float relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl border">
                <FiCoffee className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-foreground" />
              </div>
            </div>

            {/* Title with better spacing */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Let&apos;s Build Together
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Got an idea or project in mind? I&apos;m always up for meaningful collaborations. Let&apos;s create something impactful and future-ready.
            </p>
          </div>
        </Fade>

        {/* Contact Content - Responsive Single Card */}
        <div className="relative">
          {/* Enhanced Background for Mobile */}
          <div className="absolute inset-0 -mx-2 sm:-mx-4 lg:-mx-8 -my-4 sm:-my-8 rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Primary Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background/5 to-secondary/8" />

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
                backgroundSize: '200px 200px, 400px 400px'
              }} />
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          {/* Responsive Contact Form Container */}
          <div className="relative flex justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
            <div className="w-full max-w-lg sm:max-w-2xl md:max-w-4xl xl:max-w-5xl">
              <Fade direction="up" triggerOnce delay={200}>
                <ContactForm />
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
