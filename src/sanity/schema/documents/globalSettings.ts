import { defineType, defineField } from 'sanity'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'primaryColor',
      title: 'Primary Background Color (Obsidian)',
      type: 'string',
      description: 'Hex code for the primary background. Default: #050505',
      validation: (rule) => rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Must be a valid hex color code'),
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Background Color (Charcoal)',
      type: 'string',
      description: 'Hex code for secondary sections. Default: #121212',
      validation: (rule) => rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Must be a valid hex color code'),
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color (Silver)',
      type: 'string',
      description: 'Hex code for text and accents. Default: #e5e5e5',
      validation: (rule) => rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).error('Must be a valid hex color code'),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
  ],
})
