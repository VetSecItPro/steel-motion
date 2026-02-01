'use client'

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { slideInUp } from "@/lib/animations"

const products = [
  {
    name: "Kaulby",
    tagline: "Community Intelligence Platform",
    description: "Monitor online communities across Reddit, Hacker News, forums, and more. AI-powered analysis categorizes discussions into actionable insights for product teams, marketers, and founders.",
    status: "In Development",
    statusBg: "bg-sm-status-warning-light",
    statusText: "text-sm-status-warning",
    href: "#",
  },
  {
    name: "Clarus",
    tagline: "Content Analysis Tool",
    description: "Analyze and extract insights from content at scale. Built for teams that need structured data from unstructured sources.",
    status: "Early Access",
    statusBg: "bg-sm-status-info-light",
    statusText: "text-sm-status-info",
    href: "https://www.clarusapp.io",
  },
  {
    name: "Rowan",
    tagline: "Household Organization App",
    description: "Task management, shared lists, and household coordination for couples, roommates, and families. Built to reduce the mental load of running a home.",
    status: "Beta",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    href: "https://rowanapp.com",
  },
]

export default function Products() {
  return (
    <section id="products" className="py-24 bg-sm-surface-primary">
      <div className="container mx-auto px-4">
        <motion.div
          {...slideInUp}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-sm-accent-primary-light text-sm-accent-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            Our Products
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-sm-text-primary">
            Software We Build <span className="text-sm-accent-primary">and Run</span>
          </h2>
          <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto leading-relaxed">
            Steel Motion is not only a consultancy. We build and operate our own SaaS products, which means we practice what we advise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              {...slideInUp}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <a
                href={product.href}
                target={product.href !== "#" ? "_blank" : undefined}
                rel={product.href !== "#" ? "noopener noreferrer" : undefined}
                className="block group h-full"
              >
                <div className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl p-8 hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 h-full relative" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${product.statusBg} ${product.statusText}`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-sm-text-primary mb-1 group-hover:text-sm-accent-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm-accent-primary text-sm font-medium mb-4">
                    {product.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm-text-secondary leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Link indicator */}
                  {product.href !== "#" && (
                    <div className="flex items-center gap-1 text-sm-accent-secondary group-hover:underline transition-colors text-sm">
                      <span>Visit</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
