export interface Album {
  name: string
  slug: string
  coverImage: string
  spotifyUrl: string
  appleMusicUrl: string
}

export interface Band {
  name: string
  slug: string
  genre: string
  description: string
  aiTools: string
  status: string
  statusBg: string
  statusText: string
  gradient: string
  features: string[]
  albums: Album[]
}

export const bands: Band[] = [
  {
    name: "Iron Pulse",
    slug: "iron-pulse",
    genre: "Hard Rock",
    description:
      "Original hard rock compositions produced with AI-assisted tools. Multiple albums available on streaming platforms.",
    aiTools: "Suno (composition and production)",
    status: "Live",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    gradient: "from-orange-500 via-red-500 to-red-600",
    features: [
      "AI-assisted composition (Suno)",
      "Hard rock genre focus",
      "Full-length albums",
      "Available on Spotify, Apple Music",
    ],
    albums: [
      {
        name: "Voltage Rising",
        slug: "voltage-rising",
        coverImage: "/images/albums/iron-pulse-voltage-rising.jpg",
        spotifyUrl: "https://open.spotify.com/album/placeholder",
        appleMusicUrl: "https://music.apple.com/album/placeholder",
      },
      {
        name: "Steel Thunder",
        slug: "steel-thunder",
        coverImage: "/images/albums/iron-pulse-steel-thunder.jpg",
        spotifyUrl: "https://open.spotify.com/album/placeholder",
        appleMusicUrl: "https://music.apple.com/album/placeholder",
      },
      {
        name: "Burn Circuit",
        slug: "burn-circuit",
        coverImage: "/images/albums/iron-pulse-burn-circuit.jpg",
        spotifyUrl: "https://open.spotify.com/album/placeholder",
        appleMusicUrl: "https://music.apple.com/album/placeholder",
      },
    ],
  },
  {
    name: "Other Life",
    slug: "other-life",
    genre: "Hard Rock",
    description:
      "Second band project. Different sonic direction within the hard rock spectrum. AI-assisted production and composition.",
    aiTools: "Suno (composition and production)",
    status: "Live",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    gradient: "from-red-500 via-purple-500 to-violet-600",
    features: [
      "AI-assisted composition (Suno)",
      "Hard rock genre focus",
      "Full-length albums",
      "Available on Spotify, Apple Music",
    ],
    albums: [
      {
        name: "Parallel Worlds",
        slug: "parallel-worlds",
        coverImage: "/images/albums/other-life-parallel-worlds.jpg",
        spotifyUrl: "https://open.spotify.com/album/placeholder",
        appleMusicUrl: "https://music.apple.com/album/placeholder",
      },
      {
        name: "Echoes of Tomorrow",
        slug: "echoes-of-tomorrow",
        coverImage: "/images/albums/other-life-echoes-of-tomorrow.jpg",
        spotifyUrl: "https://open.spotify.com/album/placeholder",
        appleMusicUrl: "https://music.apple.com/album/placeholder",
      },
      {
        name: "Fractured Light",
        slug: "fractured-light",
        coverImage: "/images/albums/other-life-fractured-light.jpg",
        spotifyUrl: "https://open.spotify.com/album/placeholder",
        appleMusicUrl: "https://music.apple.com/album/placeholder",
      },
    ],
  },
]

export function getBandBySlug(slug: string): Band | undefined {
  return bands.find((b) => b.slug === slug)
}
