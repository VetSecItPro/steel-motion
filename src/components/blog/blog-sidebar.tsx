'use client'

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  color: string
  postCount: number
}

interface BlogSidebarProps {
  categories: Category[]
}

const getCategoryColor = (color: string) => {
  const colors = {
    cyan: "bg-cyan-100 text-cyan-800 border-cyan-200 hover:bg-cyan-200",
    red: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200",
    green: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200",
  }
  return colors[color as keyof typeof colors] || colors.cyan
}

export default function BlogSidebar({ categories }: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <Card className="bg-sm-surface-elevated border border-sm-border-default" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm-text-primary">
            <BookOpen className="w-5 h-5 text-sm-accent-primary" />
            Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/articles/category/${category.slug.current}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg border border-sm-border-default hover:border-sm-accent-primary/30 transition-all duration-300 group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={getCategoryColor(category.color)}
                      >
                        {category.title}
                      </Badge>
                    </div>
                    {category.description && (
                      <p className="text-sm text-sm-text-secondary line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-3">
                    <div className="text-sm font-medium text-sm-text-primary">
                      {category.postCount}
                    </div>
                    <div className="text-xs text-sm-text-muted">
                      {category.postCount === 1 ? 'post' : 'posts'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* About Steel Motion */}
      <Card className="bg-sm-surface-elevated border border-sm-border-default" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
        <CardHeader>
          <CardTitle className="text-sm-text-primary">About Steel Motion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm-text-secondary text-sm leading-relaxed mb-4">
            Steel Motion LLC is a veteran-led technology consulting company specializing in
            AI transformation, cybersecurity, and cloud infrastructure solutions.
          </p>
          <Button asChild variant="outline" className="w-full border-sm-accent-primary text-sm-accent-primary hover:bg-sm-accent-primary hover:text-white">
            <Link href="/about">
              Learn More About Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="bg-sm-surface-elevated border border-sm-border-default" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
        <CardHeader>
          <CardTitle className="text-sm-text-primary">Our Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { title: "AI Transformation", href: "/services/ai-transformation" },
              { title: "Cloud Infrastructure", href: "/services/cloud-infrastructure" },
              { title: "Cybersecurity", href: "/services/cybersecurity" },
              { title: "Custom Development", href: "/services/custom-development" },
              { title: "Data Analytics", href: "/services/data-analytics" },
            ].map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="block text-sm text-sm-text-secondary hover:text-sm-accent-primary transition-colors py-1"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}