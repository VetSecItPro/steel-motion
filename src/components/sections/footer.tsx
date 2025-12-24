'use client'

import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white py-5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/images/steel-motion-hero-logo.png"
                alt="Steel Motion Logo"
                width={32}
                height={32}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
              <h3 className="text-base font-bold">Steel Motion LLC</h3>
            </div>
            <p className="text-slate-400 text-xs mb-3">
              Veteran-led AI transformation and custom development.
            </p>
            <div className="flex space-x-2">
              <a
                href="https://www.linkedin.com/in/vetsecitpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#00F2FF] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:contact@steelmotionllc.com"
                className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#00F2FF] transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Primary Services */}
          <div>
            <h4 className="font-semibold mb-2 text-xs">Core Services</h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li><Link href="/services/ai-transformation" className="hover:text-[#00F2FF] transition-colors">AI Transformation</Link></li>
              <li><Link href="/services/custom-development" className="hover:text-[#00F2FF] transition-colors">Custom App Development</Link></li>
            </ul>
          </div>

          {/* Secondary Services */}
          <div>
            <h4 className="font-semibold mb-2 text-xs">Also Available</h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li><Link href="/services/cloud-infrastructure" className="hover:text-[#00F2FF] transition-colors">Cloud Infrastructure</Link></li>
              <li><Link href="/services/cybersecurity" className="hover:text-[#00F2FF] transition-colors">Cybersecurity</Link></li>
              <li><Link href="/services/data-analytics" className="hover:text-[#00F2FF] transition-colors">Data Analytics</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-2 text-xs">Company</h4>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li><Link href="/about" className="hover:text-[#00F2FF] transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-[#00F2FF] transition-colors">Blog</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#00F2FF] transition-colors">Portfolio</Link></li>
              <li><Link href="/partnerships" className="hover:text-[#00F2FF] transition-colors">Partnerships</Link></li>
              <li><Link href="/#contact" className="hover:text-[#00F2FF] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-slate-900/50 border border-slate-700 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-xs font-medium">VETERAN OWNED BUSINESS</span>
            </div>
            <p className="text-slate-500 text-xs">
              © 2025 Steel Motion LLC
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-slate-500 hover:text-[#00F2FF] text-xs transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-[#00F2FF] text-xs transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
