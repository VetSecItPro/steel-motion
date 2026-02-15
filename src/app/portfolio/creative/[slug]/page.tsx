import type { Metadata } from "next"
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

  return {
    title: `${band.name} Albums | Steel Motion LLC`,
    description: `${band.description} Listen on Spotify and Apple Music.`,
  }
}

export default async function BandDetailPage({ params }: PageProps) {
  const { slug } = await params
  const band = getBandBySlug(slug)
  if (!band) notFound()

  return <BandDetailClient band={band} />
}
