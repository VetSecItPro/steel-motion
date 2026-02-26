import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Music } from "lucide-react"
import { bands, getAlbumBySlug } from "@/lib/data/bands"
import { SpotifyIcon } from "@/components/icons/spotify"
import { AppleMusicIcon } from "@/components/icons/apple-music"
import Navbar from "@/components/navigation/navbar"

interface PageProps {
  params: Promise<{ slug: string; albumSlug: string }>
}

export function generateStaticParams() {
  return bands.flatMap((band) =>
    band.albums.map((album) => ({
      slug: band.slug,
      albumSlug: album.slug,
    }))
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, albumSlug } = await params
  const result = getAlbumBySlug(slug, albumSlug)
  if (!result) return {}

  const { band, album } = result
  const title = `${album.name} — ${band.name} | Steel Motion LLC`
  const description = album.description
    ? `${album.description.slice(0, 155).trimEnd()}…`
    : `${album.name} by ${band.name}. ${band.genre} album available on streaming platforms.`
  const url = `https://steelmotionllc.com/portfolio/creative/${band.slug}/${album.slug}`
  const image = `https://steelmotionllc.com${album.coverImage}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'music.album',
      images: [{ url: image, width: 600, height: 600, alt: `${album.name} album cover` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

export default async function AlbumDetailPage({ params }: PageProps) {
  const { slug, albumSlug } = await params
  const result = getAlbumBySlug(slug, albumSlug)
  if (!result) notFound()

  const { band, album } = result
  const otherBand = bands.find((b) => b.slug !== band.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicAlbum',
    name: album.name,
    image: `https://steelmotionllc.com${album.coverImage}`,
    url: `https://steelmotionllc.com/portfolio/creative/${band.slug}/${album.slug}`,
    byArtist: {
      '@type': 'MusicGroup',
      name: band.name,
      url: `https://steelmotionllc.com/portfolio/creative/${band.slug}`,
    },
    ...(album.tracks && {
      numTracks: album.tracks.length,
      track: album.tracks.map((t, i) => ({
        '@type': 'MusicRecording',
        name: t.name,
        position: i + 1,
        ...(t.spotifyUrl && { url: t.spotifyUrl }),
      })),
    }),
  }

  return (
    <>
      <Script
        id={`music-album-${album.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-sm-surface-primary">
        <Navbar />

        {/* Breadcrumb */}
        <section className="bg-sm-surface-inverse pt-20 pb-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <Link
                href="/portfolio"
                className="text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors"
              >
                Portfolio
              </Link>
              <span className="text-sm-text-inverse-muted">/</span>
              <Link
                href="/portfolio/creative"
                className="text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors"
              >
                Creative
              </Link>
              <span className="text-sm-text-inverse-muted">/</span>
              <Link
                href={`/portfolio/creative/${band.slug}`}
                className="text-sm-text-inverse-muted hover:text-sm-accent-inverse transition-colors"
              >
                {band.name}
              </Link>
              <span className="text-sm-text-inverse-muted">/</span>
              <span className="text-sm-accent-inverse font-medium">{album.name}</span>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section
          className="pb-16 pt-8 bg-sm-surface-inverse"
          style={{ background: 'linear-gradient(135deg, #0B1A2B 0%, #112240 50%, #0B1A2B 100%)' }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[400px_1fr] gap-10 items-start">
              {/* Album Cover */}
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={album.coverImage}
                  alt={`${album.name} album cover`}
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Album Info */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-sm-text-inverse">
                  {album.name}
                </h1>

                <Link
                  href={`/portfolio/creative/${band.slug}`}
                  className="text-lg text-sm-accent-inverse hover:underline font-medium"
                >
                  {band.name}
                </Link>

                <p className="text-sm text-sm-text-inverse-muted mt-1">{band.genre}</p>

                {album.description && (
                  <p className="text-sm-text-inverse-muted leading-relaxed mt-6 whitespace-pre-line">
                    {album.description}
                  </p>
                )}

                {album.tracks && (
                  <p className="text-sm text-sm-text-inverse-muted mt-4">
                    {album.tracks.length} {album.tracks.length === 1 ? 'track' : 'tracks'}
                  </p>
                )}

                {/* Streaming Badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {album.spotifyUrl && (
                    <a
                      href={album.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-black hover:bg-neutral-800 text-white rounded-lg px-4 py-2 transition-colors"
                    >
                      <SpotifyIcon className="w-6 h-6 text-[#1DB954]" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[9px] font-normal tracking-wide opacity-80">Listen on</span>
                        <span className="text-sm font-semibold -mt-0.5">Spotify</span>
                      </div>
                    </a>
                  )}
                  {album.appleMusicUrl && (
                    <a
                      href={album.appleMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-black hover:bg-neutral-800 text-white rounded-lg px-4 py-2 transition-colors"
                    >
                      <AppleMusicIcon className="w-6 h-6" />
                      <div className="flex flex-col leading-tight">
                        <span className="text-[9px] font-normal tracking-wide opacity-80">Listen on</span>
                        <span className="text-sm font-semibold -mt-0.5">Apple Music</span>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Track Listing */}
        <section className="py-24 bg-sm-surface-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-sm-text-primary mb-10">
                Track Listing
              </h2>

              {album.tracks && album.tracks.length > 0 ? (
                <ol className="space-y-0 divide-y divide-sm-border-default">
                  {album.tracks.map((track, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 py-4 px-4 hover:bg-sm-surface-elevated rounded-lg transition-colors"
                    >
                      <span className="text-sm text-sm-text-muted w-8 text-right font-mono tabular-nums shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm-text-primary font-medium flex-1 min-w-0 truncate">
                        {track.name}
                      </span>
                      <span className="flex items-center gap-2 shrink-0">
                        {track.spotifyUrl && (
                          <a
                            href={track.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Listen to ${track.name} on Spotify`}
                            className="text-sm-text-muted opacity-60 hover:opacity-100 hover:text-[#1DB954] transition-all"
                          >
                            <SpotifyIcon className="w-[18px] h-[18px]" />
                          </a>
                        )}
                        {track.appleMusicUrl && (
                          <a
                            href={track.appleMusicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Listen to ${track.name} on Apple Music`}
                            className="text-sm-text-muted opacity-60 hover:opacity-100 hover:text-[#FA243C] transition-all"
                          >
                            <AppleMusicIcon className="w-[18px] h-[18px]" />
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="flex items-center gap-3 py-12 justify-center text-sm-text-secondary">
                  <Music className="w-5 h-5" />
                  <p>Track listing coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-8 bg-sm-surface-primary border-t border-sm-border-default">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <Link
                href={`/portfolio/creative/${band.slug}`}
                className="flex items-center gap-1 text-sm-text-secondary hover:text-sm-accent-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {band.name} discography
              </Link>
              {otherBand && (
                <>
                  <span className="hidden sm:inline text-sm-text-muted">|</span>
                  <Link
                    href={`/portfolio/creative/${otherBand.slug}`}
                    className="text-sm-accent-secondary hover:underline font-medium"
                  >
                    Listen to {otherBand.name} →
                  </Link>
                </>
              )}
              <span className="hidden sm:inline text-sm-text-muted">|</span>
              <Link
                href="/portfolio/software"
                className="text-sm-accent-secondary hover:underline font-medium"
              >
                See software portfolio →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
