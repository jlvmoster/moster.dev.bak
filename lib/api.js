import { createClient } from 'contentful';

const clientFactory = preview =>
  createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN,
    host: `${preview ? 'preview' : 'cdn'}.contentful.com`,
  });

export const getAllBlogPosts = async (page = 0, preview = false) => {
  const client = clientFactory(preview);
  const res = await client.getEntries({
    skip: page * 10,
    limit: 10,
    order: '-fields.publishDate',
    content_type: 'blogPost',
  });
  return res.items;
};

export const getBlogPostBySlug = async (slug, preview = false) => {
  const client = clientFactory(preview);
  const res = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
  });
  return res.items[0];
};

export const getAllBlogPostSlugs = async () => {
  const client = clientFactory(true);
  const res = await client.getEntries({
    content_type: 'blogPost',
    select: 'fields.slug',
  });
  return res.items;
};
