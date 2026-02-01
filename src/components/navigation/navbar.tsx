'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDevice } from "@/lib/contexts/DeviceContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useDevice()

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false)
    }
  }, [isMobile, isOpen])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-sm-surface-elevated/95 backdrop-blur-md border-b border-sm-border-default"
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
              <h1 className="text-xl font-bold text-sm-text-primary">
                Steel Motion
              </h1>
            </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
          <div className="flex items-center gap-x-12 animate-fade-in-delay">
            <div className="relative group">
              <button
                onClick={() => scrollToSection('solutions')}
                className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium flex items-center gap-1"
              >
                Solutions
              </button>
              {/* Dropdown menu */}
              <div className="absolute top-full left-0 mt-2 w-72 bg-sm-surface-elevated border border-sm-border-default rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300" style={{ boxShadow: 'var(--sm-shadow-lg)' }}>
                <div className="p-4 space-y-3">
                  <Link
                    href="/services/ai-transformation"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
                  >
                    <div className="font-medium">AI Transformation & Automation</div>
                    <div className="text-sm text-sm-text-muted">Intelligent automation & process optimization</div>
                  </Link>
                  <Link
                    href="/services/custom-development"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
                  >
                    <div className="font-medium">Custom Application Development</div>
                    <div className="text-sm text-sm-text-muted">Tailored software solutions</div>
                  </Link>
                </div>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('products')}
              className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium"
            >
              Products
            </button>
            <Link
              href="/articles"
              className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium"
            >
              Articles
            </Link>
            <Link
              href="/portfolio"
              className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium"
            >
              Portfolio
            </Link>
            <Link
              href="/partnerships"
              className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium"
            >
              Partnerships
            </Link>
            <Link
              href="/about"
              className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link href="/#contact">
              <Button className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && isOpen && (
          <div
            id="mobile-menu"
            className="bg-sm-surface-elevated border-t border-sm-border-default animate-mobile-menu"
            role="menu"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="space-y-2">
                <div className="text-sm-text-primary font-medium py-2">Solutions</div>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/services/ai-transformation"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors text-sm py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    AI Transformation & Automation
                  </Link>
                  <Link
                    href="/services/custom-development"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors text-sm py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Custom Application Development
                  </Link>
                </div>
              </div>
              <button
                onClick={() => { scrollToSection('products'); setIsOpen(false) }}
                className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors font-medium py-2"
              >
                Products
              </button>
              <Link
                href="/articles"
                className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/portfolio"
                className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/partnerships"
                className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Partnerships
              </Link>
              <Link
                href="/about"
                className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link href="/#contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white py-3 rounded-lg transition-all duration-300 font-semibold">
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
