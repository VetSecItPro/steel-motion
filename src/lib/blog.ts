import { posts } from '#content'

export type Post = (typeof posts)[number]

export function getAllPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts() {
  return getAllPosts().filter((post) => post.featured).slice(0, 3)
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug && post.published)
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export function searchPosts(query: string) {
  const q = query.toLowerCase()
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

export function getCategories() {
  const categoryMap = new Map<string, { name: string; color: string; count: number }>()
  for (const post of getAllPosts()) {
    const existing = categoryMap.get(post.category)
    if (existing) {
      existing.count++
    } else {
      categoryMap.set(post.category, {
        name: post.category,
        color: post.categoryColor,
        count: 1,
      })
    }
  }
  return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count)
}

export function getPaginatedPosts(page: number, perPage: number, search?: string) {
  const all = search ? searchPosts(search) : getAllPosts()
  const start = (page - 1) * perPage
  return {
    posts: all.slice(start, start + perPage),
    totalCount: all.length,
    totalPages: Math.ceil(all.length / perPage),
    currentPage: page,
  }
}

export function getRelatedPosts(slug: string, limit = 3) {
  const current = getPostBySlug(slug)
  if (!current) return []
  return getAllPosts()
    .filter(
      (post) =>
        post.slug !== slug &&
        (post.category === current.category ||
          post.tags.some((tag) => current.tags.includes(tag)))
    )
    .slice(0, limit)
}

const CATEGORY_COLORS: Record<string, string> = {
  cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  red: 'bg-red-100 text-red-800 border-red-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200',
  green: 'bg-green-100 text-green-800 border-green-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
}

export function getCategoryColor(color: string) {
  return CATEGORY_COLORS[color] || CATEGORY_COLORS.cyan
}
