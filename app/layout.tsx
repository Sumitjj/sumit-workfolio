import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Footer } from "@/components/footer";
import { personalInfo } from "@/data/portfolio";

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

// Add structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  url: personalInfo.websiteUrl || "https://sumitworkfolio.in",
  image: personalInfo.avatar,
  sameAs: [
    // Remove references to non-existent properties
  ],
  jobTitle: personalInfo.title,
  worksFor: {
    "@type": "Organization",
    name: "Freelance" // Use a default value since currentCompany doesn't exist
  },
  description: personalInfo.bio,
  knowsAbout: [
    "Salesforce Commerce Cloud",
    "Full Stack Development",
    "UI/UX Design",
    "React",
    "Next.js",
    "TypeScript"
  ]
};

// Enhanced metadata for SEO and social sharing
export const metadata: Metadata = {
  title: {
    default: `${personalInfo.name} - ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.bio,
  keywords: [
    "full-stack developer",
    "salesforce commerce cloud",
    "salesforce b2c commerce",
    "salesforce b2c commerce cloud",
    "salesforce b2c commerce cloud developer",
    "salesforce b2c commerce cloud architect",
    "salesforce b2c commerce cloud technical lead",
    "salesforce b2c commerce cloud solution architect",
    "SFCC",
    "demandware",
    "agentforce",
    "UI/UX designer",
    "React",
    "Next.js",
    "TypeScript",
    "web development",
    "portfolio",
    personalInfo.name.toLowerCase().replace(" ", "-"),
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  metadataBase: new URL("https://sumitworkfolio.in"), // Replace with your domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sumitworkfolio.in", // Replace with your domain
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio,
    siteName: `${personalInfo.name} Workfolio`,
    images: [
      {
        url: "/og-image.jpg", // You'll want to add this
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Workfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio,
    images: ["/og-image.jpg"], // You'll want to add this
    creator: "@sumitjangid", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google verification code
  },
};

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
        {/* Add structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preload critical images */}
        <link
          rel="preload"
          as="image"
          href={personalInfo.avatar}
          type="image/jpeg"
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
