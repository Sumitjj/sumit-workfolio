import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Footer } from "@/components/footer";
import { personalInfo } from "@/data/portfolio";
import { generateMetadata, generateStructuredData } from "@/lib/seo/metadata";

// Optimized font loading with display swap for better performance
const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Only preload main font
});

// Enhanced metadata for SEO and social sharing
export const metadata: Metadata = generateMetadata();

// Viewport configuration for responsive design
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/**
 * Root layout component with theme provider and optimized font loading
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <title>Sumit Jangid | Salesforce B2C Commerce Architect | Next.js Developer</title>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicon and app icons - Optimized for better SEO */}
        <link rel="icon" type="image/x-icon" href="/images/avatars/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/avatars/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/avatars/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/avatars/favicon/sumit-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/avatars/favicon/sumit-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/avatars/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/images/avatars/favicon/site.webmanifest" />

        {/* Additional favicon meta tags for better compatibility */}
        <meta name="msapplication-TileImage" content="/images/avatars/favicon/sumit-192x192.png" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* PWA and mobile meta tags */}
        <meta name="description" content="Official portfolio of Sumit Jangid – Salesforce B2C Commerce Cloud Architect with 9+ years expertise in SFCC, Next.js, React, and scalable eCommerce solutions. Explore projects, skills, certifications, and contact info for hiring." />
        <meta name="keywords" content="SFCC, SFCC portfolio, SFCC developer, SFCC architect, Salesforce B2C Commerce Lead, Salesforce B2C Commerce Architect, Ecommerce Architect, Next.js Developer, React Developer, TypeScript Developer, Full Stack Developer India, Sumit Portfolio, Sumit Jangid Portfolio, Sumit Jangid Workfolio, Sumit workfolio, sfcc workfolio, Bengaluru Developer, Remote Developer, Freelance Developer, Contract Developer, Senior Developer, Lead Developer, Technical Lead, Solution Architect, System Architect, Software Architect, Developer Portfolio, Web Developer Portfolio, Full Stack Portfolio, React Portfolio, Next.js Portfolio, Salesforce Portfolio, OCAPI Developer, SCAPI Developer, B2C Commerce SDK, Salesforce Integration, API Development, Microservices, Cloud Architecture, AWS Developer, Technology Consultant, Digital Transformation, Agile Development, Scrum Master, Project Management, Team Leadership, Progressive Web Apps, Mobile Responsive, Performance Optimization, SEO Optimization, RESTful APIs, GraphQL, Docker, Kubernetes, CI/CD, DevOps, Unit Testing, Integration Testing, E2E Testing, Jest, Cypress, Playwright, MongoDB, PostgreSQL, Redis, Git, GitHub, Bitbucket, Tailwind CSS, Bootstrap, HTML5, CSS3, SASS, LESS, Salesforce Certified, B2C Commerce Developer, B2C Commerce Architect, Professional Certification, Salesforce Partner, Custom Development, Web Application Development, Mobile App Development, API Integration, Third-party Integration, Legacy System Migration, Retail E-commerce, Fashion E-commerce, Electronics E-commerce, Healthcare E-commerce, Finance E-commerce, Education E-commerce, Enterprise Solutions, SMB Solutions, Startup Development, Scale-up Solutions, Enterprise Architecture, Global Developer, International Projects, Cross-border E-commerce, Multi-language Support, Multi-currency Support, 9+ Years Experience, Senior Level, Expert Level, Veteran Developer, Seasoned Professional, Portfolio Projects, Case Studies, Success Stories, Client Testimonials, Project Showcase, Hire Developer, Freelance Work, Contract Work, Consultation, Technical Consultation, Architecture Review, Client Reviews, Project Success, Technical Excellence, Problem Solver, Innovation Leader, Emerging Technologies, AI Integration, Machine Learning, Blockchain, IoT Solutions, Progressive Web Apps" />
        <meta name="author" content="Sumit Jangid" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/images/avatars/favicon/browserconfig.xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sumit Jangid Portfolio" />
        <meta name="application-name" content="Sumit Jangid Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://www.sumitworkfolio.in" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        />

        <meta property="og:title" content="Sumit Jangid – Salesforce B2C Architect & Developer" />
        <meta property="og:description" content="Explore my projects, skills, and experiences as a Salesforce Commerce Cloud Architect and Next.js developer." />
        <meta property="og:image" content={personalInfo.avatar} />
        <meta property="og:url" content="https://www.sumitworkfolio.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sumit Jangid – Salesforce B2C Architect & Developer" />
        <meta name="twitter:description" content="Explore my projects, skills, and experiences as a Salesforce Commerce Cloud Architect and Next.js developer." />
        <meta name="twitter:image" content={personalInfo.avatar} />
        <meta name="twitter:url" content="https://www.sumitworkfolio.in" />

        {/* Preload critical images */}
        <link
          rel="preload"
          as="image"
          href={personalInfo.avatar}
          type="image/jpeg"
        />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased smooth-transition"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
