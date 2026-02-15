import { Metadata } from 'next'
import Navbar from "@/components/navigation/navbar"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Terms of Service | Steel Motion LLC',
  description: 'Terms of Service for Steel Motion LLC. Read our terms and conditions for using our website and services.',
  alternates: {
    canonical: 'https://steelmotionllc.com/terms',
  },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-sm-surface-primary" id="main-content">
      <Navbar />
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 md:p-12" style={{ boxShadow: 'var(--sm-shadow-md)' }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-sm-text-primary">Terms of Service</h1>
            <p className="text-sm-text-muted mb-8 text-lg">Last updated: December 2024</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Agreement to Terms</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  By accessing or using the Steel Motion LLC website (steelmotionllc.com) and services,
                  you agree to be bound by these Terms of Service. If you do not agree to these terms,
                  please do not use our website or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Services Description</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  Steel Motion LLC provides technology consulting services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-sm-text-secondary space-y-2 ml-4 mt-4">
                  <li>AI Transformation and Automation</li>
                  <li>Custom Application Development</li>
                  <li>Cloud Infrastructure Solutions</li>
                  <li>Cybersecurity Services</li>
                  <li>Data Analytics and Intelligence</li>
                </ul>
                <p className="text-sm-text-secondary leading-relaxed mt-4">
                  Specific services, deliverables, timelines, and pricing are defined in individual
                  client agreements and statements of work.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Intellectual Property</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  The content on this website, including text, graphics, logos, images, and software,
                  is the property of Steel Motion LLC and is protected by copyright and trademark laws.
                  You may not reproduce, distribute, or create derivative works without our written permission.
                </p>
                <p className="text-sm-text-secondary leading-relaxed mt-4">
                  Intellectual property rights for client work products are defined in individual
                  service agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">User Responsibilities</h2>
                <p className="text-sm-text-secondary leading-relaxed mb-4">
                  When using our website and services, you agree to:
                </p>
                <ul className="list-disc list-inside text-sm-text-secondary space-y-2 ml-4">
                  <li>Provide accurate and truthful information</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not interfere with or disrupt our website or services</li>
                  <li>Respect the intellectual property rights of Steel Motion LLC and third parties</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Confidentiality</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  We understand the sensitive nature of business information. Any confidential
                  information shared during consultations or engagements will be treated with
                  appropriate care and protected according to the terms of our client agreements
                  and applicable non-disclosure agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Limitation of Liability</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  To the fullest extent permitted by law, Steel Motion LLC shall not be liable for
                  any indirect, incidental, special, consequential, or punitive damages arising out
                  of or related to your use of our website or services. Our total liability for any
                  claim shall not exceed the amount paid by you for the specific services giving
                  rise to the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Disclaimer of Warranties</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  Our website and informational content are provided &quot;as is&quot; without warranties of
                  any kind, either express or implied. We do not warrant that the website will be
                  uninterrupted, error-free, or free of viruses or other harmful components.
                </p>
                <p className="text-sm-text-secondary leading-relaxed mt-4">
                  Warranties and guarantees for specific services are defined in individual client
                  agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Indemnification</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  You agree to indemnify and hold harmless Steel Motion LLC, its officers, directors,
                  employees, and agents from any claims, damages, losses, or expenses arising from
                  your violation of these Terms of Service or your use of our website and services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Third-Party Links</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  Our website may contain links to third-party websites or services. We are not
                  responsible for the content, policies, or practices of these third parties.
                  Your use of third-party sites is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Governing Law</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the
                  laws of the United States. Any disputes arising from these terms shall be resolved
                  through binding arbitration or in the appropriate courts, as determined by the
                  nature of the dispute.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Changes to Terms</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Changes will
                  be effective immediately upon posting to this page. Your continued use of our
                  website after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Severability</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  If any provision of these Terms of Service is found to be unenforceable or invalid,
                  that provision shall be limited or eliminated to the minimum extent necessary, and
                  the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-sm-accent-primary mb-4">Contact Information</h2>
                <p className="text-sm-text-secondary leading-relaxed">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 text-sm-text-secondary">
                  <p><strong className="text-sm-text-primary">Steel Motion LLC</strong></p>
                  <p>Email: <a href="mailto:contact@steelmotionllc.com" className="text-sm-accent-secondary hover:underline">contact@steelmotionllc.com</a></p>
                </div>
              </section>

              <div className="pt-8 border-t border-sm-border-default">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm-accent-secondary hover:underline"
                >
                  &larr; Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
