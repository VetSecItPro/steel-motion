'use client'

import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Brand & Social */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/steel-motion-hero-logo.png"
              alt="Steel Motion Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-lg font-bold">Steel Motion LLC</span>
            <div className="flex space-x-2">
              <a
                href="https://www.linkedin.com/in/vetsecitpro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#00F2FF] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@steelmotionllc.com"
                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#00F2FF] transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Center - Veteran Badge & Copyright */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 bg-slate-900/50 border border-slate-700 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-xs font-medium">VETERAN OWNED</span>
            </div>
            <span className="text-slate-500 text-sm">© 2025 Steel Motion LLC</span>
          </div>

          {/* Right side - Legal Links */}
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-slate-400 hover:text-[#00F2FF] text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-400 hover:text-[#00F2FF] text-sm transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
