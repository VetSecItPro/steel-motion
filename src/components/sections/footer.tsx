'use client'

import { Linkedin, Github, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 animate-fade-in-up">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00F2FF] to-[#33CCFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SM</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Steel Motion LLC</h3>
                <p className="text-slate-400 text-sm">Veteran-Led Technology Solutions</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6 max-w-md">
              Transforming businesses through AI innovation with military precision and commitment to excellence.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#00F2FF] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#00F2FF] transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#00F2FF] transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/#services" className="hover:text-[#00F2FF] transition-colors">AI Consulting</Link></li>
              <li><Link href="/#services" className="hover:text-[#00F2FF] transition-colors">App Development</Link></li>
              <li><Link href="/partnerships" className="hover:text-[#00F2FF] transition-colors">Veteran Partnerships</Link></li>
              <li><Link href="/#services" className="hover:text-[#00F2FF] transition-colors">Cybersecurity (Soon)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/about" className="hover:text-[#00F2FF] transition-colors">About Us</Link></li>
              <li><Link href="/#hero" className="hover:text-[#00F2FF] transition-colors">Our Mission</Link></li>
              <li><Link href="/#contact" className="hover:text-[#00F2FF] transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">Blog (Coming Soon)</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-delay-1">
          <p className="text-slate-400 text-sm">
            © 2025 Steel Motion LLC. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-[#00F2FF] text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-400 hover:text-[#00F2FF] text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        <div className="text-center mt-6 pt-6 border-t border-slate-800 animate-fade-in-delay-2">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm font-medium">VETERAN OWNED BUSINESS</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fadeIn 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>
    </footer>
  )
}