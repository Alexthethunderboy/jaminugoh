export const FALLBACK_HERO = {
  title: "Jamin Ugoh",
  roles: ["Director", "Cinematographer", "Writer"],
  videoUrl: "",
  poster: ""
};

export const FALLBACK_PROJECTS = [
  {
    _id: "1",
    title: "KAIROS",
    slug: "kairos",
    role: "Director",
    year: "2023",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-view-of-a-mountain-valley-during-sunset-34504-large.mp4",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
  },
  {
    _id: "2",
    title: "ELCA TALES",
    slug: "elca-tales",
    role: "Cinematographer",
    year: "2022",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-underwater-view-of-a-man-swimming-in-the-sea-42037-large.mp4",
    poster: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
  },
  {
    _id: "3",
    title: "NOIR ECHO",
    slug: "noir-echo",
    role: "Director",
    year: "2024",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-driving-through-the-city-at-night-4240-large.mp4",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop"
  },
  {
    _id: "4",
    title: "URBAN RHYTHM",
    slug: "urban-rhythm",
    role: "Writer",
    year: "2021",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-dense-city-at-night-42484-large.mp4",
    poster: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop"
  }
];

export const FALLBACK_SCRIPTS = [
  {
    _id: "1",
    title: "KAIROS",
    type: "Short Film",
    logline: "In a world where time is a currency, one man risks everything to buy a single hour with his past.",
    status: "Produced"
  },
  {
    _id: "2",
    title: "MIDNIGHT IN LAGOS",
    type: "Feature",
    logline: "An aspiring jazz musician uncovers a high-stakes conspiracy in the heart of Lagos.",
    status: "In Development"
  }
];

export const FALLBACK_TRACKS = [
  { _id: "1", title: "KAIROS SCORE", duration: "03:42", category: "Film Score" },
  { _id: "2", title: "URBAN ECHOES", duration: "02:15", category: "Experimental" },
  { _id: "3", title: "LAGOS NIGHTS", duration: "04:10", category: "Atmospheric" }
];

export const FALLBACK_INFO = {
  headshotUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
  bio: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'Jamin Ugoh is an award-winning Director, Writer, and Cinematographer based in the UK. With a passion for visual storytelling, his work spans across short films, commercials, and music videos. He is currently developing his debut feature film.'
        }
      ]
    }
  ],
  clientRoster: [
    "Sony Music",
    "Nike",
    "Vogue",
    "Universal"
  ],
  email: "Benjaminugoh@gmail.com",
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "Vimeo", url: "https://vimeo.com" }
  ]
};
