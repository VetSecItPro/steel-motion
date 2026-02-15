import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import Navbar from "@/components/navigation/navbar"
import { getPostBySlug, getAllPosts, getRelatedPosts, getCategoryColor } from "@/lib/blog"
import { MDXContent } from "@/components/blog/mdx-content"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Article Not Found' }

  return {
    title: `${post.title} | Steel Motion Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      ...(post.updated && { modifiedTime: post.updated }),
      authors: [post.author],
      tags: post.tags,
      ...(post.image && { images: [{ url: post.image, alt: post.imageAlt || post.title }] }),
    },
    alternates: {
      canonical: `https://steelmotionllc.com/articles/${slug}`,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)

  return (
    <main className="min-h-screen bg-sm-surface-primary">
      <Navbar />

      {/* Article Header */}
      <section className="pt-24 pb-8 bg-sm-surface-inverse" style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1 text-sm text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to articles
            </Link>

            <div className="flex items-center gap-2 mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(post.categoryColor)}`}>
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-sm-text-inverse mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-sm-text-inverse-muted mb-6">
              {post.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-sm-text-inverse-muted">
              <span>{post.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} min read
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <div className="container mx-auto px-4 -mt-0">
          <div className="max-w-3xl mx-auto">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mt-8" style={{ boxShadow: 'var(--sm-shadow-lg)' }}>
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Body */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto prose-sm">
            <MDXContent code={post.body} />
          </article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="max-w-3xl mx-auto mt-8 pt-6 border-t border-sm-border-default">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-sm-surface-secondary text-sm-text-secondary rounded-full border border-sm-border-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-12 bg-sm-surface-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-sm-text-primary mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/articles/${r.slug}`}
                    className="block bg-sm-surface-elevated border border-sm-border-default rounded-lg p-4 hover:border-sm-accent-primary/30 transition-all"
                  >
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border mb-2 ${getCategoryColor(r.categoryColor)}`}>
                      {r.category}
                    </span>
                    <h3 className="font-semibold text-sm text-sm-text-primary line-clamp-2">
                      {r.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
