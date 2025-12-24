import { groq } from 'next-sanity'

// Get all posts with author and category info
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset,
      alt
    },
    readTime,
    featured,
    tags,
    author->{
      name,
      slug,
      image {
        asset,
        alt
      },
      veteranBranch,
      rank
    },
    categories[]->{
      title,
      slug,
      color
    }
  }
`

// Get featured posts
export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset,
      alt
    },
    readTime,
    author->{
      name,
      slug,
      image {
        asset,
        alt
      },
      veteranBranch,
      rank
    },
    categories[]->{
      title,
      slug,
      color
    }
  }
`

// Get single post by slug
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset,
      alt
    },
    body,
    readTime,
    tags,
    seo,
    author->{
      name,
      slug,
      image {
        asset,
        alt
      },
      bio,
      veteranBranch,
      rank,
      yearsOfService,
      expertise
    },
    categories[]->{
      title,
      slug,
      color,
      description
    },
    "relatedPosts": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.categories[]._ref]) > 0] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      excerpt,
      mainImage {
        asset,
        alt
      },
      publishedAt,
      readTime,
      author->{
        name,
        slug
      }
    }
  }
`

// Get posts by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset,
      alt
    },
    readTime,
    author->{
      name,
      slug,
      image {
        asset,
        alt
      }
    },
    categories[]->{
      title,
      slug,
      color
    }
  }
`

// Get all categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// Get all authors
export const authorsQuery = groq`
  *[_type == "author"] | order(name asc) {
    _id,
    name,
    slug,
    image {
      asset,
      alt
    },
    bio,
    veteranBranch,
    rank,
    expertise,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`

// Get posts by author
export const postsByAuthorQuery = groq`
  *[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset,
      alt
    },
    readTime,
    categories[]->{
      title,
      slug,
      color
    }
  }
`

// Paginated posts with optional search
export const paginatedPostsQuery = groq`
  *[_type == "post" && (
    $search == "" ||
    title match $search + "*" ||
    excerpt match $search + "*" ||
    pt::text(body) match $search + "*"
  )] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset,
      alt
    },
    readTime,
    featured,
    tags,
    author->{
      name,
      slug,
      image {
        asset,
        alt
      },
      veteranBranch,
      rank
    },
    categories[]->{
      title,
      slug,
      color
    }
  }
`

// Count posts for pagination
export const postsCountQuery = groq`
  count(*[_type == "post" && (
    $search == "" ||
    title match $search + "*" ||
    excerpt match $search + "*" ||
    pt::text(body) match $search + "*"
  )])
`