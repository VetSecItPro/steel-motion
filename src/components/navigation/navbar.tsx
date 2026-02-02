'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDevice } from "@/lib/contexts/DeviceContext"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { isMobile } = useDevice()
  const solutionsRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false)
    }
  }, [isMobile, isOpen])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdown &&
        solutionsRef.current && !solutionsRef.current.contains(e.target as Node) &&
        portfolioRef.current && !portfolioRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdown])

  const toggleDropdown = useCallback((name: string) => {
    setOpenDropdown(prev => prev === name ? null : name)
  }, [])

  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent, name: string) => {
    if (e.key === 'Escape') {
      setOpenDropdown(null)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDropdown(name)
    }
  }, [toggleDropdown])

  const handleDropdownItemKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpenDropdown(null)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const isDropdownOpen = (name: string) => openDropdown === name

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
              <span className="text-xl font-bold text-sm-text-primary">
                Steel Motion
              </span>
            </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
          <div className="flex items-center gap-x-12 animate-fade-in-delay">
            <div className="relative" ref={solutionsRef}>
              <button
                onClick={() => {
                  scrollToSection('solutions')
                  toggleDropdown('solutions')
                }}
                onKeyDown={(e) => handleDropdownKeyDown(e, 'solutions')}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen('solutions')}
                className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium flex items-center gap-1"
              >
                Solutions
              </button>
              {/* Dropdown menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-72 bg-sm-surface-elevated border border-sm-border-default rounded-lg transition-all duration-300 ${
                  isDropdownOpen('solutions')
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible'
                }`}
                style={{ boxShadow: 'var(--sm-shadow-lg)' }}
                role="menu"
              >
                <div className="p-4 space-y-3">
                  <Link
                    href="/services/ai-transformation"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
                    role="menuitem"
                    onKeyDown={handleDropdownItemKeyDown}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <div className="font-medium">AI Automation</div>
                    <div className="text-sm text-sm-text-muted">Intelligent automation & process optimization</div>
                  </Link>
                  <Link
                    href="/services/custom-development"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
                    role="menuitem"
                    onKeyDown={handleDropdownItemKeyDown}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <div className="font-medium">Custom Development</div>
                    <div className="text-sm text-sm-text-muted">Web applications, APIs, and internal tools</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative" ref={portfolioRef}>
              <Link
                href="/portfolio"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'portfolio')}
                onMouseEnter={() => setOpenDropdown('portfolio')}
                onMouseLeave={() => setOpenDropdown(null)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen('portfolio')}
                className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium"
              >
                Portfolio
              </Link>
              {/* Dropdown menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-sm-surface-elevated border border-sm-border-default rounded-lg transition-all duration-300 ${
                  isDropdownOpen('portfolio')
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible'
                }`}
                style={{ boxShadow: 'var(--sm-shadow-lg)' }}
                role="menu"
                onMouseEnter={() => setOpenDropdown('portfolio')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="p-4 space-y-3">
                  <Link
                    href="/portfolio/software"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
                    role="menuitem"
                    onKeyDown={handleDropdownItemKeyDown}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <div className="font-medium">Software</div>
                    <div className="text-sm text-sm-text-muted">SaaS products we build and operate</div>
                  </Link>
                  <Link
                    href="/portfolio/creative"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
                    role="menuitem"
                    onKeyDown={handleDropdownItemKeyDown}
                    onClick={() => setOpenDropdown(null)}
                  >
                    <div className="font-medium">Creative</div>
                    <div className="text-sm text-sm-text-muted">AI-assisted music production</div>
                  </Link>
                </div>
              </div>
            </div>
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
            <Link
              href="/articles"
              className="text-sm-text-secondary hover:text-sm-accent-primary transition-colors duration-300 font-medium"
            >
              Articles
            </Link>
            <Button asChild className="bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white px-6 py-2 transition-all duration-300 font-semibold">
              <Link href="/#contact">Get Started</Link>
            </Button>
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
                    AI Automation
                  </Link>
                  <Link
                    href="/services/custom-development"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors text-sm py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Custom Development
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  href="/portfolio"
                  className="block w-full text-left text-sm-text-primary font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio
                </Link>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/portfolio/software"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors text-sm py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Software
                  </Link>
                  <Link
                    href="/portfolio/creative"
                    className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors text-sm py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Creative
                  </Link>
                </div>
              </div>
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
              <Link
                href="/articles"
                className="block w-full text-left text-sm-text-secondary hover:text-sm-accent-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                Articles
              </Link>
              <Button asChild className="w-full bg-sm-accent-primary hover:bg-sm-accent-primary-hover text-white py-3 transition-all duration-300 font-semibold">
                <Link href="/#contact" onClick={() => setIsOpen(false)}>Get Started</Link>
              </Button>
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
