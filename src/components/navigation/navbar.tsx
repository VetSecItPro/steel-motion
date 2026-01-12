'use client'

import { useState } from "react"
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
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a1728]/95 backdrop-blur-md border-b border-[#1a3a5c]"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="flex items-center gap-3 animate-slide-in-left">
            {/* Steel Motion Logo */}
            <div className="w-10 h-10 relative">
              <Image
                src="/images/steel-motion-hero-logo.png"
                alt="Steel Motion Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-[#E0E0E0] to-[#00F2FF] bg-clip-text text-transparent">
                Steel Motion
              </h1>
            </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 animate-fade-in-delay">
            <div className="relative group">
              <button
                onClick={() => scrollToSection('services')}
                className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 font-medium flex items-center gap-1"
              >
                Provided Solutions
              </button>
              {/* Dropdown menu */}
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#1a3a5c] border border-[#0a1728] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-4 space-y-3">
                  <Link
                    href="/services/ai-transformation"
                    className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors"
                  >
                    <div className="font-medium">AI Transformation & Automation</div>
                    <div className="text-sm text-[#666666]">Intelligent automation & process optimization</div>
                  </Link>
                  <Link
                    href="/services/custom-development"
                    className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors"
                  >
                    <div className="font-medium">Custom Application Development</div>
                    <div className="text-sm text-[#666666]">Tailored software solutions</div>
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/blog"
              className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 font-medium"
            >
              Articles
            </Link>
            <Link
              href="/portfolio"
              className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 font-medium"
            >
              Portfolio
            </Link>
            <Link
              href="/partnerships"
              className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 font-medium"
            >
              Partnerships
            </Link>
            <Link
              href="/about"
              className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link href="/#contact">
              <Button className="bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#00F2FF]/90 hover:to-[#33CCFF]/90 text-[#0F1E2C] px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#00F2FF]/25 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#B3B3B3] hover:text-[#00F2FF] transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-[#1a3a5c] border-t border-[#0a1728] animate-mobile-menu"
            role="menu"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="space-y-2">
                <div className="text-[#B3B3B3] font-medium py-2">Provided Solutions</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/services/ai-transformation"
                    className="block w-full text-left text-[#666666] hover:text-[#00F2FF] transition-colors text-sm py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    AI Transformation & Automation
                  </Link>
                  <Link
                    href="/services/custom-development"
                    className="block w-full text-left text-[#666666] hover:text-[#00F2FF] transition-colors text-sm py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Custom Application Development
                  </Link>
                </div>
              </div>
              <Link
                href="/blog"
                className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/portfolio"
                className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/partnerships"
                className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Partnerships
              </Link>
              <Link
                href="/about"
                className="block w-full text-left text-[#B3B3B3] hover:text-[#00F2FF] transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link href="/#contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-[#00F2FF] to-[#33CCFF] hover:from-[#00F2FF]/90 hover:to-[#33CCFF]/90 text-[#0F1E2C] py-3 rounded-full transition-all duration-300 font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes mobileMenuSlide {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fadeIn 0.5s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-mobile-menu {
          animation: mobileMenuSlide 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  )
}