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
  console.log('urlForImage called with source:', JSON.stringify(source, null, 2))

  if (!source) {
    console.warn('No image source provided')
    return null
  }

  try {
    // Try the direct approach first
    const imageUrl = builder.image(source)
    console.log('Generated image URL:', imageUrl.url())
    return imageUrl
  } catch (error) {
    console.error('Error generating image URL:', error)
    console.log('Falling back to asset-based approach')

    try {
      if (source.asset) {
        const assetUrl = builder.image(source.asset)
        console.log('Asset-based URL:', assetUrl.url())
        return assetUrl
      }
    } catch (assetError) {
      console.error('Asset-based approach also failed:', assetError)
    }

    return null
  }
}