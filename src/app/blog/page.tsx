import type { Metadata } from "next"
import { Suspense } from "react"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import BlogHero from "@/components/blog/blog-hero"
import FeaturedPosts from "@/components/blog/featured-posts"
import BlogPostGrid from "@/components/blog/blog-post-grid"
import BlogSidebar from "@/components/blog/blog-sidebar"
import { client } from "@/lib/sanity"
import { postsQuery, featuredPostsQuery, categoriesQuery } from "@/lib/sanity-queries"

// Revalidate every 60 seconds to ensure fresh content
export const revalidate = 60

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
    url: "https://steelmotionllc.com/blog",
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
    canonical: "https://steelmotionllc.com/blog"
  }
}

async function getBlogData() {
  const [posts, featuredPosts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(featuredPostsQuery),
    client.fetch(categoriesQuery)
  ])

  return { posts, featuredPosts, categories }
}

export default async function BlogPage() {
  const { posts, featuredPosts, categories } = await getBlogData()

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Blog Hero Section */}
      <BlogHero />

      <div className="container mx-auto px-4 py-12">
        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Featured Insights
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our latest thought leadership on technology transformation and veteran expertise
              </p>
            </div>
            <Suspense fallback={<div>Loading featured posts...</div>}>
              <FeaturedPosts posts={featuredPosts} />
            </Suspense>
          </section>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Latest Articles
              </h2>
              <p className="text-slate-600">
                Insights and analysis from our veteran technology team
              </p>
            </div>
            <Suspense fallback={<div>Loading blog posts...</div>}>
              <BlogPostGrid posts={posts} />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading sidebar...</div>}>
              <BlogSidebar categories={categories} />
            </Suspense>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}