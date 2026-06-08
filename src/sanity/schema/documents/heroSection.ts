import { defineType, defineField } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      description: 'e.g., Jamin Ugoh',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g., ["Director", "Cinematographer", "Writer"]',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Background Video URL',
      type: 'url',
      description: 'Direct link to mp4 video for the hero background.',
    }),
    defineField({
      name: 'poster',
      title: 'Video Poster / Fallback Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
