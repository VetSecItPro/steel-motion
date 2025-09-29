import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'AI & Automation (Cyan)', value: 'cyan' },
          { title: 'Cybersecurity (Red)', value: 'red' },
          { title: 'Cloud Infrastructure (Blue)', value: 'blue' },
          { title: 'Development (Purple)', value: 'purple' },
          { title: 'Data Analytics (Green)', value: 'green' },
          { title: 'Industry Insights (Orange)', value: 'orange' },
          { title: 'Case Studies (Indigo)', value: 'indigo' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})