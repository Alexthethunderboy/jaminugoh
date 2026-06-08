import { defineType, defineField } from 'sanity'

export const audioTrack = defineType({
  name: 'audioTrack',
  title: 'Audio Track',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., Film Score, Experimental',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 03:42',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: { accept: 'audio/*' },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
