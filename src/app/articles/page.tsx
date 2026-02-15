import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Clock, ArrowRight } from "lucide-react"
import Navbar from "@/components/navigation/navbar"
import { getPaginatedPosts, getPostsByCategory, getCategories, getCategoryColor } from "@/lib/blog"
import type { Post } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Steel Motion Blog | Tech Insights from Veteran Leaders",
  description: "Discover insights on AI transformation, cybersecurity, cloud infrastructure, and technology leadership from Steel Motion's veteran team.",
  openGraph: {
    title: "Steel Motion Blog | Tech Insights from Veteran Leaders",
    description: "Discover insights on AI transformation, cybersecurity, cloud infrastructure, and technology leadership from Steel Motion's veteran team.",
    url: "https://steelmotionllc.com/articles",
    siteName: "Steel Motion LLC",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://steelmotionllc.com/articles"
  }
}

const POSTS_PER_PAGE = 6

interface BlogPageProps {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>
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

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const searchQuery = params.q?.slice(0, 200) || ''
  const categoryFilter = params.category || ''

  const categories = getCategories()

  // Get posts with optional category filter
  let result
  if (categoryFilter) {
    const filtered = getPostsByCategory(categoryFilter)
    const start = (page - 1) * POSTS_PER_PAGE
    result = {
      posts: filtered.slice(start, start + POSTS_PER_PAGE),
      totalCount: filtered.length,
      totalPages: Math.ceil(filtered.length / POSTS_PER_PAGE),
      currentPage: page,
    }
  } else {
    result = getPaginatedPosts(page, POSTS_PER_PAGE, searchQuery)
  }

  const { posts, totalCount, totalPages, currentPage } = result

  return (
    <main className="min-h-screen bg-sm-surface-primary">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-sm-surface-inverse" style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-sm-text-inverse mb-4">
            Steel Motion <span className="text-sm-accent-inverse">Insights</span>
          </h1>
          <p className="text-lg text-sm-text-inverse-muted max-w-2xl mx-auto">
            Technology leadership, AI transformation, and veteran expertise
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Link
                href="/articles"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !categoryFilter
                    ? 'bg-sm-accent-primary text-white'
                    : 'bg-sm-surface-secondary text-sm-text-secondary hover:bg-sm-surface-elevated border border-sm-border-default'
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/articles?category=${encodeURIComponent(cat.name)}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    categoryFilter === cat.name
                      ? 'bg-sm-accent-primary text-white'
                      : 'bg-sm-surface-secondary text-sm-text-secondary hover:bg-sm-surface-elevated border border-sm-border-default'
                  }`}
                >
                  {cat.name}
                  <span className="ml-1 text-xs opacity-70">({cat.count})</span>
                </Link>
              ))}
            </div>

            {/* Post count */}
            <p className="text-sm text-sm-text-muted mb-6">
              {searchQuery
                ? `${totalCount} article${totalCount !== 1 ? 's' : ''} for "${searchQuery}"`
                : categoryFilter
                ? `${totalCount} article${totalCount !== 1 ? 's' : ''} in ${categoryFilter}`
                : `${totalCount} article${totalCount !== 1 ? 's' : ''}`
              }
            </p>
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="pb-16 bg-sm-surface-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {posts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="flex justify-center gap-2 mt-12" aria-label="Blog pagination">
                    {currentPage > 1 && (
                      <Link
                        href={`/articles?page=${currentPage - 1}${categoryFilter ? `&category=${encodeURIComponent(categoryFilter)}` : ''}`}
                        className="px-4 py-2 rounded-lg border border-sm-border-default text-sm text-sm-text-secondary hover:bg-sm-surface-elevated transition-colors"
                      >
                        Previous
                      </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/articles?page=${p}${categoryFilter ? `&category=${encodeURIComponent(categoryFilter)}` : ''}`}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          p === currentPage
                            ? 'bg-sm-accent-primary text-white'
                            : 'border border-sm-border-default text-sm-text-secondary hover:bg-sm-surface-elevated'
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                    {currentPage < totalPages && (
                      <Link
                        href={`/articles?page=${currentPage + 1}${categoryFilter ? `&category=${encodeURIComponent(categoryFilter)}` : ''}`}
                        className="px-4 py-2 rounded-lg border border-sm-border-default text-sm text-sm-text-secondary hover:bg-sm-surface-elevated transition-colors"
                      >
                        Next
                      </Link>
                    )}
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-sm-surface-secondary rounded-lg border border-sm-border-default">
                <h3 className="text-xl font-semibold text-sm-text-primary mb-2">
                  No articles found
                </h3>
                <p className="text-sm-text-secondary">
                  {searchQuery
                    ? `No articles match "${searchQuery}". Try a different search term.`
                    : 'Check back soon for new content.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
