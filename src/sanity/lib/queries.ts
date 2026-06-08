import { groq } from 'next-sanity'

export const globalSettingsQuery = groq`
  *[_type == "globalSettings"][0] {
    primaryColor,
    secondaryColor,
    accentColor,
    email,
    socialLinks
  }
`

export const heroSectionQuery = groq`
  *[_type == "heroSection"][0] {
    title,
    roles,
    videoUrl,
    poster
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(sortOrder asc) {
    _id,
    title,
    role,
    year,
    videoUrl,
    poster
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
