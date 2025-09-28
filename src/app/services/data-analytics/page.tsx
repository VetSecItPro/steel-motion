import type { Metadata } from "next"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import ServicePage from "@/components/sections/service-page"

export const metadata: Metadata = {
  title: "Data Analytics & Intelligence | Steel Motion LLC - Veteran-Led Technology Solutions",
  description: "Transform raw data into actionable business intelligence. Steel Motion delivers data analytics, visualization, and business intelligence solutions with veteran precision.",
  keywords: ["data analytics", "business intelligence", "data visualization", "predictive analytics", "data science", "veteran-owned business"],
  openGraph: {
    title: "Data Analytics & Intelligence | Steel Motion LLC",
    description: "Transform raw data into actionable business intelligence.",
    url: "https://steelmotionllc.com/services/data-analytics",
    siteName: "Steel Motion LLC",
    images: [
      {
        url: "/images/steel-motion-og-analytics.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Motion LLC - Data Analytics & Intelligence"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Analytics & Intelligence | Steel Motion LLC",
    description: "Transform raw data into actionable business intelligence.",
    images: ["/images/steel-motion-og-analytics.jpg"],
  }
}

export default function DataAnalyticsPage() {
  const serviceData = {
    title: "Data Analytics & Intelligence",
    subtitle: "Turn data into strategic advantage",
    description: "Unlock the hidden value in your data with advanced analytics and business intelligence solutions that drive informed decision-making and strategic growth.",
    heroGradient: "from-gray-600 via-slate-500 to-blue-600",
    features: [
      {
        title: "Business Intelligence Dashboards",
        description: "Interactive dashboards that provide real-time insights into your business performance and key metrics.",
        icon: "📊"
      },
      {
        title: "Predictive Analytics & Forecasting",
        description: "Advanced statistical models that predict future trends and help you make proactive business decisions.",
        icon: "🔮"
      },
      {
        title: "Data Warehouse & ETL Solutions",
        description: "Centralized data storage and automated pipelines that ensure clean, accessible data for analysis.",
        icon: "🏭"
      },
      {
        title: "Custom Reporting & Visualization",
        description: "Tailored reports and visualizations that communicate insights clearly to stakeholders at all levels.",
        icon: "📈"
      },
      {
        title: "Performance Analytics & KPI Tracking",
        description: "Monitor and measure what matters most with comprehensive performance tracking and KPI management.",
        icon: "🎯"
      },
      {
        title: "Data Strategy & Governance",
        description: "Establish data governance frameworks and strategies that ensure data quality and compliance.",
        icon: "📋"
      }
    ],
    benefits: [
      "Make data-driven decisions with confidence and precision",
      "Identify new revenue opportunities through advanced analytics",
      "Reduce costs by optimizing operations based on data insights",
      "Improve customer satisfaction through behavioral analytics",
      "Streamline reporting processes and reduce manual effort",
      "Gain competitive advantage through predictive capabilities"
    ],
    industries: [
      "Retail & E-commerce Analytics",
      "Manufacturing & Operations",
      "Healthcare & Patient Analytics",
      "Financial Services & Risk Analysis",
      "Government & Public Sector",
      "Marketing & Customer Intelligence"
    ],
    ctaText: "Unlock Your Data's Potential",
    ctaDescription: "Ready to transform your data into a strategic asset? Let's discuss how advanced analytics can drive growth and efficiency in your organization."
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ServicePage {...serviceData} />
      <Footer />
    </main>
  )
}