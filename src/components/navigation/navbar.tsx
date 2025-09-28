'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1728]/95 backdrop-blur-md border-b border-[#1a3a5c]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
            {/* Steel Motion Logo - Enhanced Design */}
            <div className="w-12 h-12 relative group">
              {/* Animated background rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F2FF]/20 to-[#33CCFF]/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00F2FF]/10 to-[#33CCFF]/10 animate-ping animation-delay-1000"></div>

              {/* Main logo container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#0a1728] via-[#1a3a5c] to-[#0f2640] shadow-xl shadow-[#00F2FF]/25 border border-[#00F2FF]/30 overflow-hidden group-hover:shadow-[#00F2FF]/40 transition-all duration-300">
                {/* Inner glow effect */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#00F2FF]/10 via-transparent to-[#33CCFF]/10"></div>

                {/* Logo image */}
                <Image
                  src="/images/steel-motion-hero-logo.png"
                  alt="Steel Motion Logo"
                  width={48}
                  height={48}
                  className="relative z-10 w-full h-full object-contain p-1 filter brightness-110 contrast-110 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    maskImage: 'radial-gradient(circle at center, black 70%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 70%, transparent 100%)',
                  }}
                  onError={(e) => {
                    // Fallback to placeholder if logo not found
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-logo');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />

                {/* Fallback placeholder - Enhanced */}
                <div className="fallback-logo hidden absolute inset-0 rounded-full bg-gradient-to-br from-[#00F2FF] via-[#33CCFF] to-[#00F2FF] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00F2FF]/20 via-[#33CCFF]/30 to-[#00F2FF]/20 animate-pulse"></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgo8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBGMkZGO3N0b3Atb3BhY2l0eTowLjMiIC8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzQ0NGRjtzdG9wLW9wYWNpdHk6MC4xIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idXJsKCNncmFkaWVudCkiIC8+Cjwvc3ZnPg==')] opacity-50"></div>
                  <span className="text-[#0a1728] font-bold text-lg relative z-10 drop-shadow-sm">SM</span>
                </div>

                {/* Rotating border effect */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#00F2FF]/50 via-transparent to-[#33CCFF]/50 bg-clip-border animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Outer glow on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00F2FF]/0 via-[#00F2FF]/20 to-[#33CCFF]/0 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-[#E0E0E0] to-[#00F2FF] bg-clip-text text-transparent">
                Steel Motion
              </h1>
            </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            <div className="relative group">
              <button
                onClick={() => scrollToSection('services')}
                className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 font-medium flex items-center gap-1"
              >
                Provided Solutions
              </button>
              {/* Dropdown menu */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#1a3a5c] border border-[#0a1728] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-4 space-y-3">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors"
                  >
                    <div className="font-medium">AI Transformation</div>
                    <div className="text-sm text-[#666666]">Automation & Process Optimization</div>
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors"
                  >
                    <div className="font-medium">Cloud Services</div>
                    <div className="text-sm text-[#666666]">Scalable Infrastructure Solutions</div>
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors"
                  >
                    <div className="font-medium">Cybersecurity Consulting</div>
                    <div className="text-sm text-[#666666]">Security Assessment & Protection</div>
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors"
                  >
                    <div className="font-medium">Custom Development</div>
                    <div className="text-sm text-[#666666]">Tailored Application Solutions</div>
                  </button>
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#00F2FF]/90 hover:to-[#33CCFF]/90 text-[#0F1E2C] px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#00F2FF]/25 font-semibold"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a3a5c] border-t border-[#0a1728]"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="space-y-2">
                <div className="text-[#B3B3B3] font-medium py-2">Provided Solutions</div>
                <div className="pl-4 space-y-2">
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left text-[#666666] hover:text-[#00F2FF] transition-colors text-sm py-1"
                  >
                    AI Transformation & Automation
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left text-[#666666] hover:text-[#00F2FF] transition-colors text-sm py-1"
                  >
                    Cloud Services
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left text-[#666666] hover:text-[#00F2FF] transition-colors text-sm py-1"
                  >
                    Cybersecurity Consulting
                  </button>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="block w-full text-left text-[#666666] hover:text-[#00F2FF] transition-colors text-sm py-1"
                  >
                    Custom Development
                  </button>
                </div>
              </div>
              <Link
                href="/about"
                className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#00F2FF]/90 hover:to-[#33CCFF]/90 text-[#0F1E2C] py-3 rounded-full transition-all duration-300 font-semibold"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}