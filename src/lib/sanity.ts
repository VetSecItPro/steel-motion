import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // Disable CDN to get fresh data immediately
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  if (!source) {
    return null
  }

  try {
    // Handle different Sanity image reference formats
    if (source.asset) {
      // New format: { asset: { _ref: "..." }, alt: "..." }
      return builder.image(source.asset)
    } else if (source._ref || source._id) {
      // Direct asset reference
      return builder.image(source)
    } else {
      // Fallback: try processing the source directly
      return builder.image(source)
    }
  } catch (error) {
    console.error('Error generating image URL:', error, 'Source:', source)
    return null
  }
}