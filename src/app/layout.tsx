import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DeviceProvider } from "@/lib/contexts/DeviceContext";
import PageTransition from "@/components/ui/page-transition";
import OrganizationSchema from "@/components/structured-data/organization";
import SmoothScroll from "@/components/ui/smooth-scroll";
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
  title: "Steel Motion LLC | AI Automation & Custom Software Development",
  description: "Steel Motion LLC builds AI automation systems and custom software applications. Veteran-owned. Based in Texas. Serving businesses nationwide. Free strategy call available.",
  keywords: ["AI automation", "custom software development", "veteran-owned business", "technology solutions", "SaaS development", "AI consulting"],
  authors: [{ name: "Steel Motion LLC" }],
  creator: "Steel Motion LLC",
  publisher: "Steel Motion LLC",
  openGraph: {
    title: "Steel Motion LLC | AI Automation & Custom Software Development",
    description: "Steel Motion LLC builds AI automation systems and custom software applications. Veteran-owned. Based in Texas.",
    url: "https://steelmotionllc.com",
    siteName: "Steel Motion LLC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Motion LLC | AI Automation & Custom Software Development",
    description: "Steel Motion LLC builds AI automation systems and custom software applications. Veteran-owned. Based in Texas.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DeviceProvider>
          <SmoothScroll />
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
