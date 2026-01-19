import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DeviceProvider } from "@/lib/contexts/DeviceContext";
import PageTransition from "@/components/ui/page-transition";
import CustomCursor from "@/components/ui/custom-cursor";
import OrganizationSchema from "@/components/structured-data/organization";
import SmoothScroll from "@/components/ui/smooth-scroll";
import Spotlight from "@/components/ui/spotlight";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steel Motion LLC - Veteran-Led AI & Technology Solutions",
  description: "Transform your business with veteran-led AI consulting, custom application development, and technology solutions. Steel Motion LLC delivers military precision for digital transformation.",
  keywords: ["AI consulting", "veteran-owned business", "technology solutions", "custom app development", "digital transformation", "cybersecurity"],
  authors: [{ name: "Steel Motion LLC" }],
  creator: "Steel Motion LLC",
  publisher: "Steel Motion LLC",
  openGraph: {
    title: "Steel Motion LLC - Veteran-Led AI & Technology Solutions",
    description: "Transform your business with veteran-led AI consulting and technology solutions.",
    url: "https://steelmotion.com",
    siteName: "Steel Motion LLC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Motion LLC - Veteran-Led AI & Technology Solutions",
    description: "Transform your business with veteran-led AI consulting and technology solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased no-cursor`}
      >
        <DeviceProvider>
          <SmoothScroll />
          <CustomCursor />
          <Spotlight />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <PageTransition>
            {children}
          </PageTransition>
        </DeviceProvider>
      </body>
    </html>
  );
}
