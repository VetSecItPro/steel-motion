'use client'

import { motion } from "framer-motion"
import { Linkedin, Github, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
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
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">AI Consulting</a></li>
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">App Development</a></li>
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">Veteran Partnerships</a></li>
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">Cybersecurity (Soon)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#00F2FF] transition-colors">Blog (Coming Soon)</a></li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-6 pt-6 border-t border-slate-800"
        >
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 text-sm font-medium">VETERAN OWNED BUSINESS</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}