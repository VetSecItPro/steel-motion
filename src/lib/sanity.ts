import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  console.warn('Sanity environment variables not configured. CMS features will be unavailable.')
}

export const client = createClient({
  projectId: projectId || '',
  dataset: dataset || 'production',
  apiVersion: '2024-01-01',
  // FIX-209: Use Sanity CDN in production for edge caching
  // PERF: CDN enabled in production for better performance
  useCdn: process.env.NODE_ENV === 'production',
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
