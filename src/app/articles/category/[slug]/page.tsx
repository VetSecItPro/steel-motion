import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, ArrowRight } from "lucide-react"
import Navbar from "@/components/navigation/navbar"
import { getPostsByCategory, getCategories, getCategoryColor } from "@/lib/blog"
import type { Post } from "@/lib/blog"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((cat) => ({ slug: cat.name }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const categories = getCategories()
  const current = categories.find((c) => c.name.toLowerCase() === decoded.toLowerCase())

  if (!current) return { title: "Category Not Found | Steel Motion Blog" }

  return {
    title: `${current.name} Articles | Steel Motion Blog`,
    description: `Read the latest articles about ${current.name} from Steel Motion's veteran technology team.`,
    openGraph: {
      title: `${current.name} Articles | Steel Motion Blog`,
      description: `Read the latest articles about ${current.name} from Steel Motion's veteran technology team.`,
      url: `https://steelmotionllc.com/articles/category/${encodeURIComponent(current.name)}`,
      siteName: "Steel Motion LLC",
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://steelmotionllc.com/articles/category/${encodeURIComponent(current.name)}`,
    },
  }
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/articles/${post.slug}`} className="group block">
      <article className="bg-sm-surface-elevated border border-sm-border-default rounded-xl overflow-hidden hover:border-sm-accent-primary/30 transition-all duration-300 hover:shadow-[var(--sm-shadow-md)]" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
        {post.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(post.categoryColor)}`}>
              {post.category}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1 text-xs text-sm-text-muted">
                <Clock className="w-3 h-3" />
                {post.readTime} min
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-sm-text-primary mb-2 group-hover:text-sm-accent-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-sm-text-secondary line-clamp-2 mb-3">
            {post.description}
          </p>
          <div className="flex items-center justify-between">
            <time className="text-xs text-sm-text-muted" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </time>
            <span className="text-sm text-sm-accent-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const categories = getCategories()
  const current = categories.find((c) => c.name.toLowerCase() === decoded.toLowerCase())

  if (!current) notFound()

  const posts = getPostsByCategory(current.name)

  return (
    <main className="min-h-screen bg-sm-surface-primary">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-sm-surface-inverse" style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1 text-sm text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to articles
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-sm-text-inverse mb-4">
              {current.name}
            </h1>
            <p className="text-lg text-sm-text-inverse-muted">
              {posts.length} article{posts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Link
                href="/articles"
                className="px-4 py-2 rounded-full text-sm font-medium transition-all bg-sm-surface-secondary text-sm-text-secondary hover:bg-sm-surface-elevated border border-sm-border-default"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/articles/category/${encodeURIComponent(cat.name)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    cat.name === current.name
                      ? 'bg-sm-accent-primary text-white'
                      : 'bg-sm-surface-secondary text-sm-text-secondary hover:bg-sm-surface-elevated border border-sm-border-default'
                  }`}
                >
                  {cat.name}
                  <span className="ml-1 text-xs opacity-70">({cat.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="pb-16 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-sm-surface-secondary rounded-lg border border-sm-border-default">
                <h3 className="text-xl font-semibold text-sm-text-primary mb-2">
                  No articles yet
                </h3>
                <p className="text-sm-text-secondary">
                  Check back soon for new content in {current.name}.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
