import type { Metadata } from "next"
import { Suspense } from "react"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import BlogHero from "@/components/blog/blog-hero"
import FeaturedPosts from "@/components/blog/featured-posts"
import BlogPostGrid from "@/components/blog/blog-post-grid"
import BlogSidebar from "@/components/blog/blog-sidebar"
import { BlogSearch } from "@/components/blog/blog-search"
import { BlogPagination } from "@/components/blog/blog-pagination"
import { SkeletonCard, SkeletonFeaturedPost, SkeletonSidebar } from "@/components/ui/skeleton"
import { client } from "@/lib/sanity"
import {
  featuredPostsQuery,
  categoriesQuery,
  paginatedPostsQuery,
  postsCountQuery
} from "@/lib/sanity-queries"
import { revalidationManager } from "@/lib/revalidation-manager"

export const metadata: Metadata = {
  title: "Steel Motion Blog | Tech Insights from Veteran Leaders",
  description: "Discover insights on AI transformation, cybersecurity, cloud infrastructure, and technology leadership from Steel Motion's veteran team.",
  keywords: [
    "technology blog",
    "AI insights",
    "cybersecurity",
    "cloud infrastructure",
    "veteran-led technology",
    "business transformation",
    "tech leadership"
  ],
  openGraph: {
    title: "Steel Motion Blog | Tech Insights from Veteran Leaders",
    description: "Discover insights on AI transformation, cybersecurity, cloud infrastructure, and technology leadership from Steel Motion's veteran team.",
    url: "https://steelmotionllc.com/articles",
    siteName: "Steel Motion LLC",
    images: [
      {
        url: "/images/steel-motion-blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Motion Blog - Tech Insights from Veteran Leaders"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Motion Blog | Tech Insights from Veteran Leaders",
    description: "Discover insights on AI transformation, cybersecurity, cloud infrastructure, and technology leadership from Steel Motion's veteran team.",
    images: ["/images/steel-motion-blog-og.jpg"],
  },
  alternates: {
    canonical: "https://steelmotionllc.com/articles"
  }
}

// Use shorter base interval for smart revalidation
export const revalidate = 60

const POSTS_PER_PAGE = 6

interface BlogPageProps {
  searchParams: Promise<{ page?: string; search?: string }>
}

async function getBlogData(page: number, search: string) {
  // Check if we should actually fetch new data
  const shouldUpdate = await revalidationManager.getBlogRevalidation()
  console.log(`Blog data fetch - should update in ${shouldUpdate}s`)

  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const [posts, totalCount, featuredPosts, categories] = await Promise.all([
    client.fetch(paginatedPostsQuery, { search, start, end }),
    client.fetch(postsCountQuery, { search }),
    client.fetch(featuredPostsQuery),
    client.fetch(categoriesQuery)
  ])

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

  return { posts, featuredPosts, categories, totalCount, totalPages, currentPage: page }
}

// Skeleton loaders
function FeaturedPostsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonFeaturedPost className="md:col-span-2 lg:col-span-2" />
      <SkeletonCard />
    </div>
  )
}

function BlogPostsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const search = params.search || ''

  const { posts, featuredPosts, categories, totalCount, totalPages, currentPage } = await getBlogData(page, search)

  const showFeatured = !search && page === 1 && featuredPosts.length > 0

  return (
    <main id="main-content" className="min-h-screen bg-sm-surface-primary">
      <Navbar />

      {/* Blog Hero Section */}
      <BlogHero />

      <div className="container mx-auto px-4 py-12">
        {/* Featured Posts Section - only show on first page with no search */}
        {showFeatured && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-sm-text-primary mb-4">
                Featured Insights
              </h2>
              <p className="text-lg text-sm-text-secondary max-w-2xl mx-auto">
                Our latest thought leadership on technology transformation and veteran expertise
              </p>
            </div>
            <Suspense fallback={<FeaturedPostsSkeleton />}>
              <FeaturedPosts posts={featuredPosts} />
            </Suspense>
          </section>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-sm-text-primary mb-2">
                {search ? `Search Results` : 'Latest Articles'}
              </h2>
              <p className="text-sm-text-secondary">
                {search
                  ? `${totalCount} article${totalCount !== 1 ? 's' : ''} found for "${search}"`
                  : 'Insights and analysis from our veteran technology team'
                }
              </p>
            </div>

            <Suspense fallback={<BlogPostsSkeleton />}>
              {posts.length > 0 ? (
                <>
                  <BlogPostGrid posts={posts} />
                  {totalPages > 1 && (
                    <BlogPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      className="mt-12"
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-sm-surface-secondary rounded-lg border border-sm-border-default">
                  <h3 className="text-xl font-semibold text-sm-text-primary mb-2">
                    No articles found
                  </h3>
                  <p className="text-sm-text-secondary">
                    {search
                      ? `No articles match "${search}". Try a different search term.`
                      : 'Check back soon for new content.'
                    }
                  </p>
                </div>
              )}
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="bg-sm-surface-elevated border border-sm-border-default rounded-xl p-6" style={{ boxShadow: 'var(--sm-shadow-sm)' }}>
                <Suspense fallback={<SkeletonSidebar />}>
                  <BlogSearch />
                </Suspense>
              </div>

              {/* Categories */}
              <Suspense fallback={<SkeletonSidebar />}>
                <BlogSidebar categories={categories} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
