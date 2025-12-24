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

interface FeaturedPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  mainImage?: any
  readTime?: number
  author: Author
  categories: Category[]
}

interface FeaturedPostsProps {
  posts: FeaturedPost[]
}

const getCategoryColor = (color: string) => {
  const colors = {
    cyan: "bg-cyan-900/50 text-cyan-300 border-cyan-500/30",
    red: "bg-red-900/50 text-red-300 border-red-500/30",
    blue: "bg-blue-900/50 text-blue-300 border-blue-500/30",
    purple: "bg-purple-900/50 text-purple-300 border-purple-500/30",
    green: "bg-green-900/50 text-green-300 border-green-500/30",
    orange: "bg-orange-900/50 text-orange-300 border-orange-500/30",
    indigo: "bg-indigo-900/50 text-indigo-300 border-indigo-500/30",
  }
  return colors[color as keyof typeof colors] || colors.cyan
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div
            key={post._id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Link href={`/blog/${post.slug.current}`}>
            <Card className="h-full hover:shadow-lg hover:shadow-[#00F2FF]/10 transition-all duration-300 bg-[#1a3a5c]/50 border-[#00F2FF]/20 hover:border-[#00F2FF]/50 group">
              {/* Featured Image */}
              {post.mainImage && (() => {
                const imageUrl = urlForImage(post.mainImage)
                return imageUrl ? (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={imageUrl.width(400).height(200).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#00F2FF]/90 text-slate-900 hover:bg-[#00F2FF]">
                        Featured
                      </Badge>
                    </div>
                  </div>
                ) : null
              })()}

              <CardContent className="p-6">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.slice(0, 2).map((category) => (
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
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00F2FF] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#B3B3B3] mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#B3B3B3]/70">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author.name}</span>
                    {post.author.veteranBranch && (
                      <span className="text-[#00F2FF]">
                        ({post.author.rank || 'Veteran'})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
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
              </CardContent>
            </Card>
          </Link>
        </div>
      ))}
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

      :global(.animate-fade-in-up) {
        animation: fadeInUp 0.8s ease-out forwards;
        opacity: 0;
      }
    `}</style>
    </>
  )
}