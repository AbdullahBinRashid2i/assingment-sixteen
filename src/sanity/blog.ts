export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
    },
    {
      name: 'publishedDate',
      type: 'datetime',
      title: 'Published Date',
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'string' }],
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',  // Automatically generate the slug from the title
        maxLength: 96,
      },
    },
  ],
};
