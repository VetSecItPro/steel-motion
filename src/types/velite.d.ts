declare module '#content' {
  interface Post {
    title: string
    slug: string
    description: string
    date: string
    updated?: string
    author: string
    category: string
    categoryColor: 'cyan' | 'red' | 'blue' | 'purple' | 'green' | 'orange' | 'indigo'
    tags: string[]
    image?: string
    imageAlt?: string
    readTime?: number
    featured: boolean
    published: boolean
    body: string
  }

  export const posts: Post[]
}
