import { defineType, defineField } from 'sanity'

export const screenplay = defineType({
  name: 'screenplay',
  title: 'Screenplay',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'e.g., Feature, Short Film, Pilot',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'e.g., Produced, In Development',
    }),
    defineField({
      name: 'logline',
      title: 'Logline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
