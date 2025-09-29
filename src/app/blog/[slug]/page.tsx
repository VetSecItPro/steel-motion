import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Navbar from "@/components/navigation/navbar"
import Footer from "@/components/sections/footer"
import BlogPostContent from "@/components/blog/blog-post-content"
import { client } from "@/lib/sanity"
import { postQuery } from "@/lib/sanity-queries"

// Revalidate every 60 seconds to ensure fresh content
export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPost(slug: string) {
  const post = await client.fetch(postQuery, { slug })
  return post
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found | Steel Motion Blog",
      description: "The requested blog post could not be found."
    }
  }

  const metaTitle = post.seo?.metaTitle || `${post.title} | Steel Motion Blog`
  const metaDescription = post.seo?.metaDescription || post.excerpt
  const keywords = post.seo?.keywords || []

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [...keywords, "Steel Motion", "veteran-led technology", "AI", "cybersecurity"],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://steelmotionllc.com/blog/${post.slug.current}`,
      siteName: "Steel Motion LLC",
      images: post.mainImage ? [
        {
          url: post.mainImage.asset.url,
          width: 1200,
          height: 630,
          alt: post.mainImage.alt || post.title
        }
      ] : [],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: post.mainImage ? [post.mainImage.asset.url] : [],
      creator: `@${post.author.name.replace(' ', '')}`,
    },
    alternates: {
      canonical: `https://steelmotionllc.com/blog/${post.slug.current}`
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <BlogPostContent post={post} />
      <Footer />
    </main>
  )
}