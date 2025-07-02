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
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo, contactConfig } from "@/data/portfolio";
import { cn } from "@/lib/utils";

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
  message?: string;
}

// Form submission states
type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

/**
 * Beautiful contact form with validation and EmailJS integration
 */
function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: 'general',
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
          subject: 'general',
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
      <div className="relative p-8 sm:p-10 lg:p-12 rounded-2xl backdrop-blur-xl border border-border/30 bg-gradient-to-br from-background/80 to-background/40 shadow-2xl h-full flex flex-col">
        {/* Form Header */}
        <div className="text-center mb-8 lg:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
            <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">Let&apos;s Work Together</h3>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            Ready to bring your ideas to life? Drop me a message and let&apos;s create something extraordinary!
          </p>
        </div>

        {/* Contact Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 flex-1">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center">
                <User className="w-4 h-4 mr-2 text-primary" />
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 lg:py-4 rounded-lg border transition-all duration-300",
                  "bg-background/50 backdrop-blur-sm text-base",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                  "placeholder:text-muted-foreground/60",
                  errors.name ? "border-red-500" : "border-border/30 hover:border-border/50"
                )}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 lg:py-4 rounded-lg border transition-all duration-300",
                  "bg-background/50 backdrop-blur-sm text-base",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                  "placeholder:text-muted-foreground/60",
                  errors.email ? "border-red-500" : "border-border/30 hover:border-border/50"
                )}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Company & Subject Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center">
                <Building className="w-4 h-4 mr-2 text-primary" />
                Company (Optional)
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 lg:py-4 rounded-lg border border-border/30 hover:border-border/50 transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-muted-foreground/60 text-base"
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center">
                <FileText className="w-4 h-4 mr-2 text-primary" />
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className="w-full px-4 py-3 lg:py-4 rounded-lg border border-border/30 hover:border-border/50 transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base"
              >
                <option value="general">General Inquiry</option>
                <option value="project">Project Discussion</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center">
              <MessageSquare className="w-4 h-4 mr-2 text-primary" />
              Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={6}
              className={cn(
                "w-full px-4 py-3 lg:py-4 rounded-lg border transition-all duration-300 resize-none text-base",
                "bg-background/50 backdrop-blur-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary",
                "placeholder:text-muted-foreground/60",
                errors.message ? "border-red-500" : "border-border/30 hover:border-border/50"
              )}
              placeholder="Tell me about your project, ideas, or how we can work together..."
            />
            {errors.message && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submissionState === 'sending'}
            className={cn(
              "w-full py-4 lg:py-5 text-base font-medium relative overflow-hidden transition-all duration-500 group",
              submissionState === 'success' && "bg-green-600 hover:bg-green-600",
              submissionState === 'error' && "bg-red-600 hover:bg-red-600"
            )}
          >
            <div className="flex items-center justify-center space-x-2">
              {submissionState === 'idle' && (
                <>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Send Message</span>
                </>
              )}
              {submissionState === 'sending' && (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              )}
              {submissionState === 'success' && (
                <>
                  <Check className="w-4 h-4" />
                  <span>Message Sent!</span>
                </>
              )}
              {submissionState === 'error' && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Failed to Send</span>
                </>
              )}
            </div>
          </Button>

          {/* Response Promise - Connected to Form */}
          <div className="pt-6 border-t border-border/20">
            {/* Response Promise */}
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-4 bg-gradient-to-b from-border/30 to-transparent" />

              {/* Promise Card */}
              <div className="bg-gradient-to-r from-primary/5 via-background/10 to-secondary/5 backdrop-blur-sm rounded-xl border border-border/20 p-4 sm:p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mb-2">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Your message matters to me</p>
                  <p className="text-xs text-muted-foreground">Here&apos;s what you can expect after hitting send</p>
                </div>

                {/* Response Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-primary">
                      &lt; 24h
                    </div>
                    <div className="text-xs text-muted-foreground">Quick Response</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-600">
                      9+ Years
                    </div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-blue-600">
                      Global
                    </div>
                    <div className="text-xs text-muted-foreground">Remote Ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
}

/**
 * Main Contact Section Component
 */
export function ContactSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-background/3 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <Fade direction="up" triggerOnce>
          <div className="text-center mb-10 sm:mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Mail className="w-12 h-12 text-primary" />
                <div className="absolute inset-0 w-12 h-12 bg-primary/20 rounded-full blur-lg animate-pulse" />
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground ml-4">
                Contact
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to turn your vision into reality? Let&apos;s collaborate and create something extraordinary together.
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-8 rounded-full" />
          </div>
        </Fade>

        {/* Contact Content - Centered Single Card */}
        <div className="relative">
          {/* Stunning Section Background */}
          <div className="absolute inset-0 -mx-4 sm:-mx-6 lg:-mx-8 -my-8 rounded-3xl overflow-hidden">
            {/* Primary Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background/5 to-secondary/8" />

            {/* Decorative Gradient Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl opacity-60" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl opacity-40" />

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                                 radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
                backgroundSize: '400px 400px'
              }} />
            </div>

            {/* Geometric Elements */}
            <div className="absolute top-8 right-8 w-24 h-24 border border-primary/20 rounded-full animate-pulse" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border border-secondary/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-secondary/30 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
          </div>

          {/* Centered Contact Form */}
          <div className="relative flex justify-center p-8 sm:p-12">
            <div className="w-full max-w-2xl lg:max-w-3xl">
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