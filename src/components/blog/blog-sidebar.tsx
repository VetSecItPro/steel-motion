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
    cyan: "bg-cyan-900/50 text-cyan-300 border-cyan-500/30 hover:bg-cyan-800/50",
    red: "bg-red-900/50 text-red-300 border-red-500/30 hover:bg-red-800/50",
    blue: "bg-blue-900/50 text-blue-300 border-blue-500/30 hover:bg-blue-800/50",
    purple: "bg-purple-900/50 text-purple-300 border-purple-500/30 hover:bg-purple-800/50",
    green: "bg-green-900/50 text-green-300 border-green-500/30 hover:bg-green-800/50",
    orange: "bg-orange-900/50 text-orange-300 border-orange-500/30 hover:bg-orange-800/50",
    indigo: "bg-indigo-900/50 text-indigo-300 border-indigo-500/30 hover:bg-indigo-800/50",
  }
  return colors[color as keyof typeof colors] || colors.cyan
}

export default function BlogSidebar({ categories }: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <Card className="bg-[#1a3a5c]/50 border-[#00F2FF]/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BookOpen className="w-5 h-5 text-[#00F2FF]" />
            Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/blog/category/${category.slug.current}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg border border-[#00F2FF]/20 hover:border-[#00F2FF]/50 transition-all duration-300 group">
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
                      <p className="text-sm text-[#B3B3B3] line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-3">
                    <div className="text-sm font-medium text-white">
                      {category.postCount}
                    </div>
                    <div className="text-xs text-[#B3B3B3]">
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
      <Card className="bg-[#1a3a5c]/50 border-[#00F2FF]/20">
        <CardHeader>
          <CardTitle className="text-white">About Steel Motion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[#B3B3B3] text-sm leading-relaxed mb-4">
            Steel Motion LLC is a veteran-led technology consulting company specializing in
            AI transformation, cybersecurity, and cloud infrastructure solutions.
          </p>
          <Link href="/about">
            <Button variant="outline" className="w-full border-[#00F2FF] text-[#00F2FF] hover:bg-[#00F2FF] hover:text-slate-900">
              Learn More About Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="bg-[#1a3a5c]/50 border-[#00F2FF]/20">
        <CardHeader>
          <CardTitle className="text-white">Our Services</CardTitle>
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
                className="block text-sm text-[#B3B3B3] hover:text-[#00F2FF] transition-colors py-1"
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