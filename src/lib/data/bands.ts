export interface Album {
  name: string
  slug: string
  coverImage: string
  spotifyUrl?: string
  appleMusicUrl?: string
}

export interface Band {
  name: string
  slug: string
  genre: string
  description: string
  aiTools?: string
  status: string
  statusBg: string
  statusText: string
  gradient: string
  image?: string
  features?: string[]
  albums: Album[]
}

export const bands: Band[] = [
  {
    name: "Iron Pulse",
    slug: "iron-pulse",
    genre: "American Hard Rock",
    description:
      "Iron Pulse is a cinematic American rock project built on tension, release, and emotional truth. Fronted by dual lead vocalists, Elias Vale and Ari Solenne, whose voices collide and complement with grit and clarity, the band blends modern hard rock weight with melodic depth and atmospheric texture. Their sound moves between intimate confession and arena-level power, driven by layered guitars, grounded rhythm sections, and hooks that stay with you long after the last note fades.\n\nEach album is crafted as a full narrative arc, not just a collection of songs, exploring identity, resilience, memory, and the cost of becoming who you are. Iron Pulse is not nostalgia rock and it is not radio filler. It is deliberate, structured, emotionally charged music designed to feel lived in, not manufactured.",
    status: "Live",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    gradient: "from-orange-500 via-red-500 to-red-600",
    image: "/images/bands/iron-pulse.webp",
    albums: [
      {
        name: "Rise & Break",
        slug: "rise-and-break",
        coverImage: "/images/albums/iron-pulse-rise-and-break.webp",
        spotifyUrl: "https://open.spotify.com/album/5lIw6K2ZEqPnCqGDpZGNWq",
        appleMusicUrl: "https://music.apple.com/us/album/rise-break/1861190036",
      },
      {
        name: "Echoes of the Fall",
        slug: "echoes-of-the-fall",
        coverImage: "/images/albums/iron-pulse-echoes-of-the-fall.webp",
        spotifyUrl: "https://open.spotify.com/album/188O4ZVKNGan4qJfBrLTaN",
        appleMusicUrl: "https://music.apple.com/us/album/echoes-of-the-fall/1861200553",
      },
      {
        name: "Sang-Froid",
        slug: "sang-froid",
        coverImage: "/images/albums/iron-pulse-sang-froid.webp",
        spotifyUrl: "https://open.spotify.com/album/5xNylyGXqvzVcwimFMYDFC",
        appleMusicUrl: "https://music.apple.com/us/album/sang-froid/1861200910",
      },
      {
        name: "HeartSteel",
        slug: "heartsteel",
        coverImage: "/images/albums/iron-pulse-heartsteel.webp",
        spotifyUrl: "https://open.spotify.com/album/1qzwJZfyWlpUS0BQyDgF46",
        appleMusicUrl: "https://music.apple.com/us/album/heartsteel/1865223571",
      },
      {
        name: "Glass Veins",
        slug: "glass-veins",
        coverImage: "/images/albums/iron-pulse-glass-veins.webp",
        spotifyUrl: "https://open.spotify.com/album/0Isio2yKcIMVtQNxG8J7MI",
        appleMusicUrl: "https://music.apple.com/us/album/glass-veins/1865364903",
      },
      {
        name: "Crimson Drive",
        slug: "crimson-drive",
        coverImage: "/images/albums/iron-pulse-crimson-drive.webp",
        spotifyUrl: "https://open.spotify.com/album/48V9dPM0zZ5RpluufYBNKK",
        appleMusicUrl: "https://music.apple.com/us/album/crimson-drive/1865323454",
      },
      {
        name: "The Long Midnight Run",
        slug: "the-long-midnight-run",
        coverImage: "/images/albums/iron-pulse-the-long-midnight-run.webp",
        spotifyUrl: "https://open.spotify.com/album/6NgT1OR3bfygS3nLqarwsZ",
        appleMusicUrl: "https://music.apple.com/us/album/the-long-midnight-run/1865413435",
      },
      {
        name: "Faint Maps of Fire",
        slug: "faint-maps-of-fire",
        coverImage: "/images/albums/iron-pulse-faint-maps-of-fire.webp",
        spotifyUrl: "https://open.spotify.com/album/5k8JwXX7mYAb1qVvlZDUWH",
        appleMusicUrl: "https://music.apple.com/us/album/faint-maps-of-fire/1865856428",
      },
      {
        name: "The Far Rooms",
        slug: "the-far-rooms",
        coverImage: "/images/albums/iron-pulse-the-far-rooms.webp",
        spotifyUrl: "https://open.spotify.com/album/2fyx0bRYFEXvwmGOFRv556",
        appleMusicUrl: "https://music.apple.com/us/album/the-far-rooms/1865880906",
      },
      {
        name: "The Known Stranger",
        slug: "the-known-stranger",
        coverImage: "/images/albums/iron-pulse-the-known-stranger.webp",
        spotifyUrl: "https://open.spotify.com/album/3KezECQqoabS7LuQmrnUSo",
        appleMusicUrl: "https://music.apple.com/us/album/the-known-stranger/1866020241",
      },
      {
        name: "After the Last Mask Falls",
        slug: "after-the-last-mask-falls",
        coverImage: "/images/albums/iron-pulse-after-the-last-mask-falls.webp",
        spotifyUrl: "https://open.spotify.com/album/3pmlYtz3jIDpZXHmKlW77A",
        appleMusicUrl: "https://music.apple.com/us/album/after-the-last-mak-falls/1866163316",
      },
      {
        name: "The Four Seasons",
        slug: "the-four-seasons",
        coverImage: "/images/albums/iron-pulse-the-four-seasons.webp",
        spotifyUrl: "https://open.spotify.com/album/6aRqBxQR63JOAn2GsKwPRI",
        appleMusicUrl: "https://music.apple.com/us/album/the-four-seasons/1866193379",
      },
      {
        name: "A Quiet Kind of Gravity",
        slug: "a-quiet-kind-of-gravity",
        coverImage: "/images/albums/iron-pulse-a-quiet-kind-of-gravity.webp",
        spotifyUrl: "https://open.spotify.com/album/0D7FlkNrd59MeSEi9OXvLf",
        appleMusicUrl: "https://music.apple.com/us/album/a-quiet-kind-of-gravity/1866486504",
      },
    ],
  },
  {
    name: "Other Life",
    slug: "other-life",
    genre: "French Hard Rock",
    description:
      "Other Life is a French hard rock project driven by intensity, atmosphere, and emotional weight. Fronted by Adrien Corren and Anaïs Ardent, the band blends cinematic textures with heavy, riff-forward energy and dual-vocal dynamics that move between restraint and eruption. Each album explores identity, fracture, and survival through long-form compositions built for impact rather than trends.\n\nOther Life stands at the intersection of modern production and raw performance, delivering full-length records that feel deliberate, immersive, and unapologetically alive.",
    status: "Live",
    statusBg: "bg-sm-status-success-light",
    statusText: "text-sm-status-success",
    gradient: "from-red-500 via-purple-500 to-violet-600",
    image: "/images/bands/other-life.webp",
    albums: [
      {
        name: "Les Miracles Sauvages",
        slug: "les-miracles-sauvages",
        coverImage: "/images/albums/other-life-les-miracles-sauvages.webp",
        appleMusicUrl: "https://music.apple.com/us/album/les-miracles-sauvages/1861239352",
      },
      {
        name: "Sans Retour",
        slug: "sans-retour",
        coverImage: "/images/albums/other-life-sans-retour.webp",
        spotifyUrl: "https://open.spotify.com/album/3IUzLk5wxAxABKQS9mmKEG",
        appleMusicUrl: "https://music.apple.com/us/album/sans-retour/1861239960",
      },
      {
        name: "Sous La Peau Du Monde",
        slug: "sous-la-peau-du-monde",
        coverImage: "/images/albums/other-life-sous-la-peau-du-monde.webp",
        spotifyUrl: "https://open.spotify.com/album/2iurS6LMJoGgDnbxqRge2j",
        appleMusicUrl: "https://music.apple.com/us/album/sous-la-peau-du-monde/1877596779",
      },
    ],
  },
]

export function getBandBySlug(slug: string): Band | undefined {
  return bands.find((b) => b.slug === slug)
}
