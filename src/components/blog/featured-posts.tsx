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
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-[#00F2FF]/50 group">
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
                {post.categories.length > 0 && (
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
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#00F2FF] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
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