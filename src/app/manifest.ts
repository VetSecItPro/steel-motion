import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Steel Motion LLC',
    short_name: 'Steel Motion',
    description: 'AI automation systems and custom software development. Veteran-owned. Based in Texas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1A2B',
    theme_color: '#2DD4BF',
    icons: [
      {
        src: '/images/steel-motion-hero-logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
