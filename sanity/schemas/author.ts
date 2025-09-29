import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
    defineField({
      name: 'veteranBranch',
      title: 'Military Branch',
      type: 'string',
      options: {
        list: [
          { title: 'Army', value: 'army' },
          { title: 'Navy', value: 'navy' },
          { title: 'Air Force', value: 'airforce' },
          { title: 'Marines', value: 'marines' },
          { title: 'Coast Guard', value: 'coastguard' },
          { title: 'Space Force', value: 'spaceforce' },
        ],
      },
    }),
    defineField({
      name: 'rank',
      title: 'Military Rank',
      type: 'string',
    }),
    defineField({
      name: 'yearsOfService',
      title: 'Years of Service',
      type: 'string',
    }),
    defineField({
      name: 'expertise',
      title: 'Technical Expertise',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})