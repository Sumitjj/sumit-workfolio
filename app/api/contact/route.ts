import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateContactEmailHtml, generateAutoReplyEmailHtml, emailTemplates } from "@/components/email-templates/contact-email";
import { contactConfig, personalInfo } from "@/data/portfolio";

// Create reusable transporter object using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: contactConfig.smtp.host,
    port: contactConfig.smtp.port,
    secure: contactConfig.smtp.secure,
    auth: {
      user: contactConfig.smtp.auth.user,
      pass: contactConfig.smtp.auth.pass,
    },
    // Additional security options
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Verify transporter configuration
const verifyTransporter = async (transporter: nodemailer.Transporter) => {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("SMTP Transporter verification failed:", error);
    return false;
  }
};

export async function POST(request: NextRequest) {
  try {
    // Check Gmail credentials
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: "Gmail credentials not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables."
        },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address format." },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = createTransporter();

    // Verify transporter
    const isVerified = await verifyTransporter(transporter);
    if (!isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Email service configuration error. Please check Gmail settings."
        },
        { status: 500 }
      );
    }

    // Prepare email data
    const emailData = {
      name,
      email,
      company,
      subject,
      message,
      submittedAt: new Date()
    };

    // Portfolio owner information (from portfolio.ts)
    const portfolioOwner = {
      name: personalInfo.name,
      title: personalInfo.title,
      website: "https://www.sumitworkfolio.in",
      email: contactConfig.recipientEmail
    };

    // Generate main email HTML
    const mainEmailHtml = generateContactEmailHtml(
      emailData,
      portfolioOwner,
      contactConfig.subjects
    );

    // Generate auto-reply email HTML
    const autoReplyHtml = generateAutoReplyEmailHtml(
      name,
      portfolioOwner
    );

    // Main email options
    const mainMailOptions = {
      from: {
        name: contactConfig.fromName,
        address: contactConfig.fromEmail,
      },
      to: contactConfig.recipientEmail,
      replyTo: email,
      subject: `${contactConfig.subjects[subject as keyof typeof contactConfig.subjects] || contactConfig.subjects.default} - New Contact from ${name}`,
      html: mainEmailHtml,
      text: `
New contact form submission from ${name}

Email: ${email}
${company ? `Company: ${company}` : ''}
Subject: ${contactConfig.subjects[subject as keyof typeof contactConfig.subjects] || contactConfig.subjects.default}

Message:
${message}

---
Submitted: ${new Date().toLocaleString()}
From: Portfolio Contact Form at https://www.sumitworkfolio.in
      `.trim(),
    };

    // Auto-reply email options
    const autoReplyMailOptions = {
      from: {
        name: contactConfig.fromName,
        address: contactConfig.fromEmail,
      },
      to: email,
      subject: emailTemplates.subjects.autoReplySubject,
      html: autoReplyHtml,
      text: emailTemplates.messages.autoReplyMessage(name, personalInfo.name),
    };

    try {
      // Send main email
      console.log("Sending main email...");
      const mainEmailResult = await transporter.sendMail(mainMailOptions);
      console.log("Main email sent successfully:", mainEmailResult.messageId);

      // Send auto-reply email
      try {
        console.log("Sending auto-reply email...");
        const autoReplyResult = await transporter.sendMail(autoReplyMailOptions);
        console.log("Auto-reply sent successfully:", autoReplyResult.messageId);
      } catch (autoReplyError) {
        // Log auto-reply error but don't fail the main request
        console.warn("Auto-reply failed (non-critical):", autoReplyError);
      }

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully! Thank you for reaching out.",
        emailId: mainEmailResult.messageId
      });

    } catch (sendError) {
      console.error('Email sending error:', sendError);

      // Provide specific error messages based on error type
      let errorMessage = "Failed to send email. Please try again later.";

      if (sendError instanceof Error) {
        if (sendError.message.includes("Invalid login")) {
          errorMessage = "Email authentication failed. Please check Gmail app password.";
        } else if (sendError.message.includes("Connection")) {
          errorMessage = "Connection to email server failed. Please check your internet connection.";
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
          error: process.env.NODE_ENV === 'development' ? sendError : undefined
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
        error: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}
