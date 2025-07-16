"use client";

import React, { useState, useCallback, useRef } from "react";
import { Fade } from "react-awesome-reveal";
import emailjs from "@emailjs/browser";
import {
  MessageSquare,
  Mail,
  User,
  Building,
  FileText,
  Send,
  Check,
  AlertCircle,
  Clock,
  Award,
  Globe,
  Zap,
  Sparkles,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactConfig } from "@/data/portfolio";
import { cn } from "@/lib/helpers/utils";

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

/**
 * Highlight metrics component aligned with website theme
 */
function HighlightMetrics() {
  const metrics = [
    {
      icon: Clock,
      value: "< 24h",
      label: "Quick Response",
      description: "Fast turnaround time",
      valueColor: "text-orange-600 dark:text-orange-400"
    },
    {
      icon: Award,
      value: "9+ Years",
      label: "Experience",
      description: "Proven track record",
      valueColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      icon: Globe,
      value: "Global",
      label: "Remote Ready",
      description: "Worldwide collaboration",
      valueColor: "text-blue-600 dark:text-blue-400"
    }
  ];

  return (
    <div className="relative">
      {/* Theme-aligned background */}
      <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/20 shadow-sm">
        <div className="p-6 sm:p-8">
          {/* Header matching website style */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              What you can expect after hitting send button
            </h4>
          </div>

          {/* Metrics grid using website card styling */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <Fade key={metric.label} direction="up" triggerOnce delay={index * 100}>
                <div className="group">
                  <div className="flex flex-col items-center p-4 h-full bg-card rounded-xl border border-border/20 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    {/* Icon with website styling */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3 group-hover:scale-110 transition-transform duration-300">
                      <metric.icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Value with catchy colors */}
                    <div className={`text-2xl font-bold mb-1 ${metric.valueColor}`}>
                      {metric.value}
                    </div>

                    {/* Label with website styling */}
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {metric.label}
                    </div>

                    {/* Description */}
                    <div className="text-xs text-muted-foreground text-center">
                      {metric.description}
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Beautiful contact form with validation and EmailJS integration
 */
function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

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

    if (!validateForm()) return;

    setSubmissionState('sending');

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not specified',
        subject: contactConfig.subjects[formData.subject as keyof typeof contactConfig.subjects],
        message: formData.message,
        to_email: contactConfig.recipientEmail,
      };

      // Send email via EmailJS
      await emailjs.send(
        contactConfig.emailJsServiceId,
        contactConfig.emailJsTemplateId,
        templateParams,
        contactConfig.emailJsPublicKey
      );

      setSubmissionState('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
        setSubmissionState('idle');
      }, 3000);

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmissionState('error');

      // Reset error state after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    }
  }, [formData, validateForm]);

  // Handle input changes
  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear specific error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl backdrop-blur-xl border border-border/30 bg-gradient-to-br from-background/80 to-background/40 shadow-2xl h-full flex flex-col">
      {/* Responsive Form Header */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-4 sm:mb-6">
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary" />
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-2 sm:mb-3">Drop Me a Line</h3>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-sm sm:max-w-md mx-auto px-2 sm:px-0">
          Ready to bring your ideas to life? Drop me a message and let&apos;s create something extraordinary!
        </p>
      </div>

      {/* Responsive Contact Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6 flex-1">
        {/* Name & Email Row - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center">
              <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={cn(
                "w-full px-3 py-3 sm:px-4 sm:py-3 lg:py-4 rounded-lg border transition-all duration-300",
                "bg-background/50 backdrop-blur-sm text-sm sm:text-base",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                "placeholder:text-muted-foreground/60 touch-manipulation",
                errors.name ? "border-red-500" : "border-border/30 hover:border-border/50"
              )}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={cn(
                "w-full px-3 py-3 sm:px-4 sm:py-3 lg:py-4 rounded-lg border transition-all duration-300",
                "bg-background/50 backdrop-blur-sm text-sm sm:text-base",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                "placeholder:text-muted-foreground/60 touch-manipulation",
                errors.email ? "border-red-500" : "border-border/30 hover:border-border/50"
              )}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Company & Subject Row - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center">
              <Building className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-3 py-3 sm:px-4 sm:py-3 lg:py-4 rounded-lg border border-border/30 hover:border-border/50 transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm sm:text-base touch-manipulation"
              placeholder="Your company (optional)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-foreground flex items-center">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
              Subject *
            </label>
            <select
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={cn(
                "w-full px-3 py-3 sm:px-4 sm:py-3 lg:py-4 rounded-lg border transition-all duration-300",
                "bg-background/50 backdrop-blur-sm text-sm sm:text-base",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                "touch-manipulation",
                errors.subject ? "border-red-500" : "border-border/30 hover:border-border/50"
              )}
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="project">Project Discussion</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Other</option>
            </select>
            {errors.subject && (
              <p className="text-xs sm:text-sm text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        {/* Message - Responsive */}
        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-foreground flex items-center">
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-primary" />
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={5}
            className={cn(
              "w-full px-3 py-3 sm:px-4 sm:py-3 lg:py-4 rounded-lg border transition-all duration-300 resize-none text-sm sm:text-base",
              "bg-background/50 backdrop-blur-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
              "placeholder:text-muted-foreground/60 touch-manipulation",
              errors.message ? "border-red-500" : "border-border/30 hover:border-border/50"
            )}
            placeholder="Tell me about your project, ideas, or how we can work together..."
          />
          {errors.message && (
            <p className="text-xs sm:text-sm text-red-500 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Responsive Submit Button */}
        <Button
          type="submit"
          disabled={submissionState === 'sending'}
          className={cn(
            "w-full py-3 sm:py-4 lg:py-5 text-sm sm:text-base font-medium relative overflow-hidden transition-all duration-500 group touch-manipulation",
            "min-h-[48px] sm:min-h-[52px]", // Ensure good touch target size
            submissionState === 'success' && "bg-green-600 hover:bg-green-600",
            submissionState === 'error' && "bg-red-600 hover:bg-red-600"
          )}
        >
          <div className="flex items-center justify-center space-x-2">
            {submissionState === 'idle' && (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Message Sent!</span>
              </>
            )}
            {submissionState === 'error' && (
              <>
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
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
    <section id="contact" className="relative pt-8 sm:pt-12 lg:pt-16 pb-8 sm:pb-12 lg:pb-16 overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-background/3 to-transparent" />
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Responsive Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            {/* Coffee Icon with Professional Positioning */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-card border border-border/50 shadow-sm">
                <Coffee className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-foreground" />
              </div>
            </div>

            {/* Title with better spacing */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              Let's have Coffee Together
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Ready to turn your vision into reality? Let&apos;s collaborate and create something extraordinary together.
            </p>
          </div>
        </Fade>

        {/* Contact Content - Responsive Single Card */}
        <div className="relative">
          {/* Enhanced Background for Mobile */}
          <div className="absolute inset-0 -mx-2 sm:-mx-4 lg:-mx-8 -my-4 sm:-my-8 rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Primary Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background/5 to-secondary/8" />

            {/* Responsive Decorative Gradient Orbs */}
            <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl opacity-60" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl opacity-40" />

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
                backgroundSize: '200px 200px, 400px 400px'
              }} />
            </div>

            {/* Responsive Geometric Elements */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 border border-primary/20 rounded-full animate-pulse" />
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border border-secondary/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/3 left-1/4 w-1 h-1 sm:w-2 sm:h-2 bg-secondary/30 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
          </div>

          {/* Responsive Contact Form Container */}
          <div className="relative flex justify-center p-4 sm:p-6 lg:p-8 xl:p-12">
            <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl xl:max-w-3xl">
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