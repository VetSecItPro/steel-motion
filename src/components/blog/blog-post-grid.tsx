'use client'

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar } from "lucide-react"
import { urlForImage } from "@/lib/sanity"

interface Author {
  name: string
  slug: { current: string }
  image?: any
  veteranBranch?: string
  rank?: string
}

interface Category {
  title: string
  slug: { current: string }
  color: string
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  mainImage?: any
  readTime?: number
  featured?: boolean
  tags?: string[]
  author: Author
  categories: Category[]
}

interface BlogPostGridProps {
  posts: BlogPost[]
}

const getCategoryColor = (color: string) => {
  const colors = {
    cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
    red: "bg-red-100 text-red-800 border-red-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    green: "bg-green-100 text-green-800 border-green-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
  }
  return colors[color as keyof typeof colors] || colors.cyan
}

export default function BlogPostGrid({ posts }: BlogPostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-sm-text-primary mb-4">No posts found</h3>
        <p className="text-sm-text-secondary">Check back soon for new insights from our team.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post._id}>
          <Link href={`/articles/${post.slug.current}`}>
            <Card className="hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 bg-sm-surface-elevated border border-sm-border-default hover:border-sm-accent-primary/30 group" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3 gap-0">
                  {/* Image */}
                  {post.mainImage && (() => {
                    const imageUrl = urlForImage(post.mainImage)
                    return imageUrl ? (
                      <div className="relative h-48 md:h-full overflow-hidden md:rounded-l-lg">
                        <Image
                          src={imageUrl.width(300).height(200).url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {post.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-sm-accent-primary text-white hover:bg-sm-accent-primary/90">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                    ) : null
                  })()}

                  {/* Content */}
                  <div className={`p-6 ${post.mainImage ? 'md:col-span-2' : 'md:col-span-3'}`}>
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.slice(0, 3).map((category) => (
                          <Badge
                            key={category.slug.current}
                            variant="outline"
                            className={getCategoryColor(category.color)}
                          >
                            {category.title}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-sm-text-primary mb-3 group-hover:text-sm-accent-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm-text-secondary mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-sm-surface-secondary text-sm-text-muted px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-sm-text-muted">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author.name}</span>
                        {post.author.veteranBranch && (
                          <span className="text-sm-accent-primary">
                            ({post.author.rank || 'Veteran'})
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      {post.readTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
    </div>
  )
}