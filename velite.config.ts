import { defineConfig, defineCollection, s } from 'velite'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s.object({
    title: s.string().max(120),
    slug: s.slug('posts'),
    description: s.string().max(300),
    date: s.isodate(),
    updated: s.isodate().optional(),
    author: s.string().default('Steel Motion'),
    category: s.string(),
    categoryColor: s.enum([
      'cyan', 'red', 'blue', 'purple', 'green', 'orange', 'indigo',
    ]),
    tags: s.array(s.string()).default([]),
    image: s.string().optional(),
    imageAlt: s.string().optional(),
    readTime: s.number().optional(),
    featured: s.boolean().default(false),
    published: s.boolean().default(true),
    body: s.mdx(),
  }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, {
        theme: 'one-dark-pro',
        defaultLang: 'plaintext',
      }],
    ],
  },
})
