import type { Metadata } from "next"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import ServicePage from "@/components/sections/service-page"

export const metadata: Metadata = {
  title: "Cybersecurity & Protection | Steel Motion LLC - Veteran-Led Technology Solutions",
  description: "Protect your organization with military-grade cybersecurity solutions. Steel Motion delivers security assessments, threat protection, and compliance consulting with veteran expertise.",
  keywords: ["cybersecurity", "security assessment", "threat protection", "compliance", "security consulting", "veteran-owned business"],
  openGraph: {
    title: "Cybersecurity & Protection | Steel Motion LLC",
    description: "Protect your organization with military-grade cybersecurity solutions.",
    url: "https://steelmotionllc.com/services/cybersecurity",
    siteName: "Steel Motion LLC",
    images: [
      {
        url: "/images/steel-motion-og-security.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Motion LLC - Cybersecurity & Protection"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity & Protection | Steel Motion LLC",
    description: "Protect your organization with military-grade cybersecurity solutions.",
    images: ["/images/steel-motion-og-security.jpg"],
  }
}

export default function CybersecurityPage() {
  const serviceData = {
    title: "Cybersecurity & Protection",
    subtitle: "Military-grade security for your digital assets",
    description: "Defend your organization against evolving cyber threats with comprehensive security solutions designed by veterans who understand the importance of mission-critical protection.",
    heroGradient: "from-teal-600 via-cyan-500 to-blue-500",
    features: [
      {
        title: "Security Assessment & Auditing",
        description: "Comprehensive evaluation of your security posture with detailed vulnerability assessments and penetration testing.",
        icon: "🔍"
      },
      {
        title: "Threat Detection & Response",
        description: "Advanced monitoring systems that detect, analyze, and respond to security threats in real-time.",
        icon: "🛡️"
      },
      {
        title: "Compliance & Risk Management",
        description: "Ensure adherence to industry standards like NIST, SOC 2, HIPAA, and government security frameworks.",
        icon: "📋"
      },
      {
        title: "Security Architecture Design",
        description: "Design and implement robust security architectures that protect against sophisticated attack vectors.",
        icon: "🏰"
      },
      {
        title: "Incident Response & Recovery",
        description: "Rapid response protocols and recovery procedures to minimize downtime and data loss during security incidents.",
        icon: "🚨"
      },
      {
        title: "Security Training & Awareness",
        description: "Educate your team on security best practices and create a culture of cybersecurity awareness.",
        icon: "🎓"
      }
    ],
    benefits: [
      "Reduce security incidents by 85% through proactive monitoring",
      "Achieve compliance with industry and government standards",
      "Minimize downtime with rapid incident response protocols",
      "Protect intellectual property and sensitive data",
      "Build customer trust with robust security practices",
      "Avoid costly data breaches and regulatory penalties"
    ],
    industries: [
      "Government & Defense Contracting",
      "Financial Services & Banking",
      "Healthcare & Medical Systems",
      "Critical Infrastructure",
      "Legal & Professional Services",
      "Technology & Software Development"
    ],
    ctaText: "Secure Your Organization",
    ctaDescription: "Don't leave your security to chance. Let our veteran cybersecurity experts assess your vulnerabilities and implement military-grade protection for your organization."
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ServicePage {...serviceData} />
      <Footer />
    </main>
  )
}