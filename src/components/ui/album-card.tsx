'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { slideInUp } from "@/lib/animations"
import { SpotifyIcon } from "@/components/icons/spotify"
import { AppleMusicIcon } from "@/components/icons/apple-music"
import type { Album } from "@/lib/data/bands"

interface AlbumCardProps {
  album: Album
  bandSlug: string
  index: number
}

export function AlbumCard({ album, bandSlug, index }: AlbumCardProps) {
  return (
    <motion.div
      {...slideInUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/portfolio/creative/${bandSlug}/${album.slug}`}
        className="block bg-sm-surface-elevated border border-sm-border-default rounded-2xl overflow-hidden hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 group"
        style={{ boxShadow: "var(--sm-shadow-sm)" }}
      >
        {/* Album Cover */}
        <div className="relative overflow-hidden bg-black">
          <Image
            src={album.coverImage}
            alt={`${album.name} album cover`}
            width={600}
            height={600}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Album Info */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-sm-text-primary mb-4">
            {album.name}
          </h3>

          {/* Streaming Badges */}
          <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            {album.spotifyUrl && (
              <a
                href={album.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-black hover:bg-neutral-800 text-white rounded-lg px-4 py-2 transition-colors"
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
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
      </Link>
    </motion.div>
  )
}
