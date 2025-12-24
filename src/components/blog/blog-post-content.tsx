'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from '@portabletext/react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  User,
  Calendar,
  ArrowLeft,
  Share2
} from "lucide-react"
import { urlForImage } from "@/lib/sanity"

interface Author {
  name: string
  slug: { current: string }
  image?: any
  bio?: any[]
  veteranBranch?: string
  rank?: string
  yearsOfService?: string
  expertise?: string[]
}

interface Category {
  title: string
  slug: { current: string }
  color: string
  description?: string
}

interface RelatedPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  mainImage?: any
  publishedAt: string
  readTime?: number
  author: {
    name: string
    slug: { current: string }
  }
}

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  mainImage?: any
  body: any[]
  readTime?: number
  tags?: string[]
  author: Author
  categories: Category[]
  relatedPosts: RelatedPost[]
}

interface BlogPostContentProps {
  post: BlogPost
}


// Portable Text components for rich content rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlForImage(value)
      return imageUrl ? (
        <div className="my-8">
          <Image
            src={imageUrl.width(800).height(600).url()}
            alt={value.alt || ''}
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
          {value.caption && (
            <p className="text-sm text-[#B3B3B3] text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      ) : null
    },
    codeBlock: ({ value }: any) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-slate-800 text-white px-4 py-2 rounded-t-lg text-sm font-mono">
            {value.filename}
          </div>
        )}
        <pre className={`bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto ${value.filename ? 'rounded-t-none' : ''}`}>
          <code className={`language-${value.language || 'text'}`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
    callout: ({ value }: any) => {
      const typeStyles = {
        info: "border-blue-400 bg-blue-900/30 text-blue-200",
        warning: "border-yellow-400 bg-yellow-900/30 text-yellow-200",
        success: "border-green-400 bg-green-900/30 text-green-200",
        error: "border-red-400 bg-red-900/30 text-red-200",
        tip: "border-purple-400 bg-purple-900/30 text-purple-200",
      }

      return (
        <div className={`my-6 p-4 rounded-lg border-l-4 ${typeStyles[value.type as keyof typeof typeStyles] || typeStyles.info}`}>
          {value.title && (
            <h4 className="font-semibold mb-2">{value.title}</h4>
          )}
          <p>{value.content}</p>
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 mt-6">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg md:text-xl font-semibold text-white mb-2 mt-4">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-[#B3B3B3] leading-relaxed mb-4 text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#00F2FF] pl-6 py-2 my-6 italic text-[#B3B3B3] bg-[#1a3a5c]/50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-[#00F2FF] hover:text-[#33CCFF] underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-[#1a3a5c] text-[#00F2FF] px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Navigation */}
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#B3B3B3] hover:text-[#00F2FF] transition-colors duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium">Back to Blog</span>
              </Link>
            </div>

            {/* Categories */}
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Badge
                    key={category.slug.current}
                    variant="outline"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author.name}</span>
                {post.author.veteranBranch && (
                  <span className="text-[#00F2FF]">
                    ({post.author.rank || 'Veteran'})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime} min read</span>
                </div>
              )}
              <button
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white border border-white/30 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
              >
                <Share2 className="w-4 h-4" />
                <span className="text-white">Share</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      {post.mainImage && (() => {
        const imageUrl = urlForImage(post.mainImage)
        return imageUrl ? (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <Image
                  src={imageUrl.width(1200).height(600).url()}
                  alt={post.mainImage.alt || post.title}
                  width={1200}
                  height={600}
                  className="rounded-lg shadow-xl"
                  priority
                  onError={(e) => {
                    console.error('Image failed to load:', e)
                    console.error('Image data:', post.mainImage)
                  }}
                />
              </div>
            </div>
          </section>
        ) : (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="bg-[#1a3a5c] rounded-lg shadow-xl h-96 flex items-center justify-center text-[#B3B3B3]">
                  Image could not be loaded
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div>
              <div className="prose prose-lg max-w-none">
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#00F2FF]/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-[#1a3a5c] text-[#B3B3B3] border-[#00F2FF]/30 hover:bg-[#00F2FF]/20 hover:text-white"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-16 bg-[#0a1728]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {post.relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost._id}
                    href={`/blog/${relatedPost.slug.current}`}
                    className="block"
                  >
                    <Card className="h-full hover:shadow-lg hover:shadow-[#00F2FF]/10 transition-all duration-300 bg-[#1a3a5c]/50 border-[#00F2FF]/20 hover:border-[#00F2FF]/50 group">
                      {relatedPost.mainImage && (() => {
                        const imageUrl = urlForImage(relatedPost.mainImage)
                        return imageUrl ? (
                          <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <Image
                              src={imageUrl.width(400).height(200).url()}
                              alt={relatedPost.mainImage.alt || relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : null
                      })()}
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00F2FF] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-[#B3B3B3] text-sm line-clamp-3 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-[#B3B3B3]/70">
                          <span>{relatedPost.author.name}</span>
                          {relatedPost.readTime && (
                            <span>{relatedPost.readTime} min read</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}