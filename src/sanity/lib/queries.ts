import { groq } from 'next-sanity'

export const globalSettingsQuery = groq`
  *[_type == "globalSettings"][0] {
    primaryColor,
    secondaryColor,
    accentColor,
    email,
    socialLinks,
    headshot,
    bio,
    clientRoster
  }
`

export const heroSectionQuery = groq`
  *[_type == "heroSection"][0] {
    title,
    roles,
    "videoFileUrl": videoFile.asset->url,
    videoUrl,
    poster,
    posterUrl
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    role,
    year,
    "videoFileUrl": videoFile.asset->url,
    videoUrl,
    poster,
    posterUrl
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    role,
    year,
    description,
    "videoFileUrl": videoFile.asset->url,
    videoUrl,
    poster,
    posterUrl,
    "scriptFileUrl": scriptFile.asset->url,
    scriptUrl,
    expandedGallery[] {
      mediaType,
      imageFile,
      imageUrl,
      "videoFileUrl": videoFile.asset->url,
      videoUrl
    }
  }
`

export const screenplaysQuery = groq`
  *[_type == "screenplay"] | order(sortOrder asc) {
    _id,
    title,
    type,
    status,
    logline
  }
`

export const audioTracksQuery = groq`
  *[_type == "audioTrack"] | order(sortOrder asc) {
    _id,
    title,
    category,
    duration,
    audioFile
  }
`
