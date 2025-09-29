import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  if (!source) {
    console.warn('No image source provided')
    return builder.image('')
  }

  // Handle different Sanity image formats
  if (source.asset) {
    return builder.image(source.asset)
  }

  // If source has _ref or _id directly
  if (source._ref || source._id) {
    return builder.image(source)
  }

  // If source is the image reference string itself
  if (typeof source === 'string') {
    return builder.image(source)
  }

  console.warn('Invalid image source format:', source)
  return builder.image('')
}