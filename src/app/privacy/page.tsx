import { Metadata } from 'next'
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Privacy Policy | Steel Motion LLC',
  description: 'Privacy Policy for Steel Motion LLC. Learn how we collect, use, and protect your personal information in compliance with GDPR.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-[#B3B3B3] mb-8">Last updated: December 2024</p>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Introduction</h2>
              <p className="text-[#B3B3B3] leading-relaxed">
                Steel Motion LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and
                ensuring the security of your personal data. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you visit our website steelmotionllc.com
                and use our services, in compliance with the General Data Protection Regulation (GDPR) and
                other applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Data Controller</h2>
              <p className="text-[#B3B3B3] leading-relaxed">
                Steel Motion LLC is the data controller responsible for your personal data.
                For any questions about this policy or your data rights, contact us at:
              </p>
              <div className="mt-4 text-[#B3B3B3]">
                <p>Email: <a href="mailto:contact@steelmotionllc.com" className="text-[#00F2FF] hover:underline">contact@steelmotionllc.com</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Information We Collect</h2>

              <h3 className="text-xl font-medium text-white mb-2">Personal Information You Provide</h3>
              <p className="text-[#B3B3B3] leading-relaxed mb-4">
                We collect personal information that you voluntarily provide when you:
              </p>
              <ul className="list-disc list-inside text-[#B3B3B3] space-y-2 ml-4">
                <li>Fill out our contact form (name, email, company, message)</li>
                <li>Submit a partnership inquiry</li>
                <li>Request information about our services</li>
              </ul>

              <h3 className="text-xl font-medium text-white mb-2 mt-6">Cookies and Tracking</h3>
              <p className="text-[#B3B3B3] leading-relaxed">
                <strong>We only use functional cookies</strong> that are strictly necessary for the
                operation of our website. These cookies do not track your behavior or collect personal
                data for marketing purposes. They are used solely to:
              </p>
              <ul className="list-disc list-inside text-[#B3B3B3] space-y-2 ml-4 mt-4">
                <li>Maintain your session while browsing</li>
                <li>Remember your preferences (such as theme settings)</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              <p className="text-[#B3B3B3] leading-relaxed mt-4">
                We do not use advertising cookies, analytics tracking cookies, or share your data with
                third-party advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Legal Basis for Processing (GDPR)</h2>
              <p className="text-[#B3B3B3] leading-relaxed mb-4">
                Under GDPR, we process your personal data based on the following legal grounds:
              </p>
              <ul className="list-disc list-inside text-[#B3B3B3] space-y-2 ml-4">
                <li><strong>Consent:</strong> When you submit a contact form, you consent to us processing your data to respond to your inquiry</li>
                <li><strong>Legitimate Interest:</strong> To improve our services and ensure website security</li>
                <li><strong>Contractual Necessity:</strong> When processing is required to fulfill a service agreement</li>
                <li><strong>Legal Obligation:</strong> When required by applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">How We Use Your Information</h2>
              <p className="text-[#B3B3B3] leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-[#B3B3B3] space-y-2 ml-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Communicate with you about our services (only when requested)</li>
                <li>Ensure the security and integrity of our website</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="text-[#B3B3B3] leading-relaxed mt-4">
                <strong>We do not sell, rent, or trade your personal information to third parties.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Data Security</h2>
              <p className="text-[#B3B3B3] leading-relaxed mb-4">
                We implement robust security measures to protect your personal data:
              </p>
              <ul className="list-disc list-inside text-[#B3B3B3] space-y-2 ml-4">
                <li><strong>Encryption:</strong> All data transmitted to our servers uses TLS/SSL encryption</li>
                <li><strong>Secure Infrastructure:</strong> Our website is hosted on Vercel with enterprise-grade security</li>
                <li><strong>Access Controls:</strong> Only authorized personnel can access personal data</li>
                <li><strong>Regular Audits:</strong> We conduct regular security assessments</li>
                <li><strong>Incident Response:</strong> We have procedures to detect, report, and respond to data breaches</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Your Rights Under GDPR</h2>
              <p className="text-[#B3B3B3] leading-relaxed mb-4">
                If you are located in the European Economic Area (EEA), you have the following rights:
              </p>
              <ul className="list-disc list-inside text-[#B3B3B3] space-y-2 ml-4">
                <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p className="text-[#B3B3B3] leading-relaxed mt-4">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:contact@steelmotionllc.com" className="text-[#00F2FF] hover:underline">
                  contact@steelmotionllc.com
                </a>. We will respond to your request within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Data Retention</h2>
              <p className="text-[#B3B3B3] leading-relaxed">
                We retain your personal data only for as long as necessary to fulfill the purposes
                for which it was collected, or as required by law. Contact form submissions are
                retained for up to 2 years unless you request deletion earlier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">International Data Transfers</h2>
              <p className="text-[#B3B3B3] leading-relaxed">
                Our website is hosted on Vercel, which may process data in the United States.
                When transferring data outside the EEA, we ensure appropriate safeguards are in place,
                including Standard Contractual Clauses approved by the European Commission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Third-Party Services</h2>
              <p className="text-[#B3B3B3] leading-relaxed mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc list-inside text-[#B3B3B3] space-y-2 ml-4">
                <li><strong>Vercel:</strong> Website hosting and deployment</li>
                <li><strong>Sanity CMS:</strong> Content management for our blog</li>
                <li><strong>Resend:</strong> Email delivery for contact form submissions</li>
              </ul>
              <p className="text-[#B3B3B3] leading-relaxed mt-4">
                These providers have their own privacy policies and are GDPR-compliant.
                We only share the minimum data necessary to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Children&apos;s Privacy</h2>
              <p className="text-[#B3B3B3] leading-relaxed">
                Our website and services are not directed to individuals under 16 years of age.
                We do not knowingly collect personal data from children. If you become aware that
                a child has provided us with personal data, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Changes to This Policy</h2>
              <p className="text-[#B3B3B3] leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes by posting the new Privacy Policy on this page and updating the
                &quot;Last updated&quot; date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Complaints</h2>
              <p className="text-[#B3B3B3] leading-relaxed">
                If you believe we have not handled your personal data properly, you have the right
                to lodge a complaint with your local data protection authority. However, we encourage
                you to contact us first so we can try to resolve your concerns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#00F2FF] mb-4">Contact Us</h2>
              <p className="text-[#B3B3B3] leading-relaxed">
                For questions about this Privacy Policy, your personal data, or to exercise your rights:
              </p>
              <div className="mt-4 text-[#B3B3B3]">
                <p><strong className="text-white">Steel Motion LLC</strong></p>
                <p>Email: <a href="mailto:contact@steelmotionllc.com" className="text-[#00F2FF] hover:underline">contact@steelmotionllc.com</a></p>
              </div>
            </section>

            <div className="pt-8 border-t border-[#00F2FF]/20">
              <Link
                href="/"
                className="inline-flex items-center text-[#00F2FF] hover:underline"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
