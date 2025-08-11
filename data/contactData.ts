/**
 * Contact configuration for email services
 */
export const contactConfig = {
    // Gmail SMTP Configuration for Nodemailer
    smtp: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_USER || "",
            pass: process.env.GMAIL_APP_PASSWORD || "",
        },
    },

    // Email Configuration
    fromEmail: process.env.GMAIL_USER || "s.jangir129fl@gmail.com",
    fromName: "Sumit Jangid Portfolio",
    recipientEmail: "s.jangir129fl@gmail.com",

    // Email Templates and Subjects
    subjects: {
        project: "Project Inquiry",
        general: "General Inquiry",
        collaboration: "Collaboration Opportunity",
        other: "Other Inquiry",
        default: "Portfolio Contact",
    },

    defaultBody: "Hi Sumit,\n\nI came across your portfolio and would like to discuss a potential opportunity.\n\nBest regards"
};
