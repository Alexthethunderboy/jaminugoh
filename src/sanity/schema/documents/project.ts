import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (mp4)',
      type: 'url',
      description: 'A direct link to an mp4 video file. e.g. a CDN link.',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'A direct link to a YouTube video. Used for full video preview.',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload an mp4 video file directly.',
    }),
    defineField({
      name: 'trailerVideoUrl',
      title: 'Trailer Video URL (mp4)',
      type: 'url',
      description: 'A direct link to an mp4 trailer video file.',
    }),
    defineField({
      name: 'trailerYoutubeUrl',
      title: 'Trailer YouTube URL',
      type: 'url',
      description: 'A direct link to a YouTube trailer video.',
    }),
    defineField({
      name: 'trailerVideoFile',
      title: 'Trailer Video File',
      type: 'file',
      options: { accept: 'video/*' },
      description: 'Upload an mp4 trailer video file directly.',
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Used for the WebGL distortion effect and video fallback.',
    }),
    defineField({
      name: 'posterUrl',
      title: 'Poster Image URL',
      type: 'url',
      description: 'A direct link to an image. Used if no file is uploaded.',
    }),
    defineField({
      name: 'scriptFile',
      title: 'Script File (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Upload a PDF script/screenplay.',
    }),
    defineField({
      name: 'scriptUrl',
      title: 'Script URL (PDF)',
      type: 'url',
      description: 'A direct link to a PDF script.',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers show up first in the gallery.',
      initialValue: 0,
    }),
    defineField({
      name: 'expandedGallery',
      title: 'Gallery & Behind the Scenes',
      type: 'array',
      description: 'Additional images or videos to display on the project detail page. Great for behind the scenes content!',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'mediaType',
              title: 'Media Type',
              type: 'string',
              options: { list: ['image', 'video'] },
              initialValue: 'image',
            }),
            defineField({
              name: 'imageFile',
              title: 'Image File',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.mediaType !== 'image',
            }),
            defineField({
              name: 'imageUrl',
              title: 'Image URL',
              type: 'url',
              hidden: ({ parent }) => parent?.mediaType !== 'image',
            }),
            defineField({
              name: 'videoFile',
              title: 'Video File',
              type: 'file',
              options: { accept: 'video/*' },
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }) => parent?.mediaType !== 'video',
            }),
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'role',
      media: 'poster',
    },
  },
})
