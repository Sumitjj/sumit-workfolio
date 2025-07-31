import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Footer } from "@/components/footer";
import { personalInfo } from "@/data/portfolio";
import { generateMetadata } from "@/lib/seo/metadata";

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
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/images/avatars/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/avatars/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/avatars/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/avatars/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/avatars/favicon/sumit-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/avatars/favicon/sumit-512x512.png" />
        <link rel="manifest" href="/images/avatars/favicon/site.webmanifest" />

        {/* PWA and mobile meta tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/images/avatars/favicon/browserconfig.xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sumit Jangid Portfolio" />
        <meta name="application-name" content="Sumit Jangid Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />

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
