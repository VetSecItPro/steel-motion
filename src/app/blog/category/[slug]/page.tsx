import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import BlogPostGrid from "@/components/blog/blog-post-grid"
import BlogSidebar from "@/components/blog/blog-sidebar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { client } from "@/lib/sanity"
import { postsByCategoryQuery, categoriesQuery } from "@/lib/sanity-queries"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getCategoryData(slug: string) {
  const [posts, categories] = await Promise.all([
    client.fetch(postsByCategoryQuery, { categorySlug: slug }),
    client.fetch(categoriesQuery)
  ])

  const currentCategory = categories.find((cat: any) => cat.slug.current === slug)

  return { posts, categories, currentCategory }
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

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const { currentCategory } = await getCategoryData(slug)

  if (!currentCategory) {
    return {
      title: "Category Not Found | Steel Motion Blog",
      description: "The requested category could not be found."
    }
  }

  return {
    title: `${currentCategory.title} Articles | Steel Motion Blog`,
    description: currentCategory.description || `Read the latest articles about ${currentCategory.title} from Steel Motion's veteran technology team.`,
    keywords: [currentCategory.title.toLowerCase(), "Steel Motion", "veteran-led technology"],
    openGraph: {
      title: `${currentCategory.title} Articles | Steel Motion Blog`,
      description: currentCategory.description || `Read the latest articles about ${currentCategory.title} from Steel Motion's veteran technology team.`,
      url: `https://steelmotionllc.com/blog/category/${currentCategory.slug.current}`,
      siteName: "Steel Motion LLC",
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://steelmotionllc.com/blog/category/${currentCategory.slug.current}`
    }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const { posts, categories, currentCategory } = await getCategoryData(slug)

  if (!currentCategory) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Category Hero */}
      <section className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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

            <div className="text-center">
              <Badge
                variant="outline"
                className={`mb-6 text-lg px-4 py-2 ${getCategoryColor(currentCategory.color)} border-white/30`}
              >
                {currentCategory.title}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {currentCategory.title} Articles
              </h1>

              {currentCategory.description && (
                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  {currentCategory.description}
                </p>
              )}

              <div className="mt-8">
                <span className="text-[#00F2FF] font-semibold">
                  {posts.length} {posts.length === 1 ? 'article' : 'articles'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <Suspense fallback={<div>Loading articles...</div>}>
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