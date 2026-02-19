import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"
import { bands, getBandBySlug } from "@/lib/data/bands"
import BandDetailClient from "./band-detail-client"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return bands.map((band) => ({ slug: band.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const band = getBandBySlug(slug)
  if (!band) return {}

  const title = `${band.name} — ${band.genre} | Steel Motion LLC`
  const description = `${band.description.slice(0, 155).trimEnd()}…`
  const url = `https://steelmotionllc.com/portfolio/creative/${band.slug}`
  const image = band.image
    ? `https://steelmotionllc.com${band.image}`
    : band.albums[0]?.coverImage
      ? `https://steelmotionllc.com${band.albums[0].coverImage}`
      : undefined

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'profile',
      ...(image && { images: [{ url: image, width: 480, height: 720, alt: band.name }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image] }),
    },
  }
}

export default async function BandDetailPage({ params }: PageProps) {
  const { slug } = await params
  const band = getBandBySlug(slug)
  if (!band) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: band.name,
    genre: band.genre,
    description: band.description.split('\n')[0],
    url: `https://steelmotionllc.com/portfolio/creative/${band.slug}`,
    ...(band.image && {
      image: `https://steelmotionllc.com${band.image}`,
    }),
    album: band.albums.map((album) => ({
      '@type': 'MusicAlbum',
      name: album.name,
      image: `https://steelmotionllc.com${album.coverImage}`,
      url: album.spotifyUrl || album.appleMusicUrl || undefined,
    })),
  }

  return (
    <>
      <Script
        id={`music-group-${band.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BandDetailClient band={band} />
    </>
  )
}
