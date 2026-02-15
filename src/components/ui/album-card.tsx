'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { slideInUp } from "@/lib/animations"
import { SpotifyIcon } from "@/components/icons/spotify"
import { AppleMusicIcon } from "@/components/icons/apple-music"
import type { Album } from "@/lib/data/bands"

interface AlbumCardProps {
  album: Album
  index: number
}

export function AlbumCard({ album, index }: AlbumCardProps) {
  return (
    <motion.div
      {...slideInUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="bg-sm-surface-elevated border border-sm-border-default rounded-2xl overflow-hidden hover:shadow-[var(--sm-shadow-md)] transition-all duration-300 group"
        style={{ boxShadow: "var(--sm-shadow-sm)" }}
      >
        {/* Album Cover */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={album.coverImage}
            alt={`${album.name} album cover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Album Info */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-sm-text-primary mb-4">
            {album.name}
          </h3>

          {/* Streaming Buttons */}
          <div className="flex gap-3">
            <a
              href={album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#1DB954] text-white hover:bg-[#1ed760] transition-colors"
            >
              <SpotifyIcon className="w-4 h-4" />
              Spotify
            </a>
            <a
              href={album.appleMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#FC3C44] text-white hover:bg-[#fd5b62] transition-colors"
            >
              <AppleMusicIcon className="w-4 h-4" />
              Apple Music
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
