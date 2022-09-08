const CONTENTFUL_GRAPHQL_API = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

const BLOG_POST_FIELDS = `
title
excerpt
content {
  json
}
heroImage {
  title
  url(transform: { format: WEBP })
  width
  height
}
publishDate
slug
`;

const graphql = async (query, preview = false) => {
  return fetch(CONTENTFUL_GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
    body: JSON.stringify({ query }),
  }).then(res => res.json());
};

const extractBlogPost = res => res?.data?.blogPostCollection?.items?.[0];

const extractAllBlogPosts = res => res?.data?.blogPostCollection?.items;

export const getBlogPostBySlug = async (slug, preview = false) => {
  const res = await graphql(
    `
    query {
      blogPostCollection(where: { slug: "${slug}" }, preview: ${preview}) {
        items {
          ${BLOG_POST_FIELDS}
        }
      }
    }
  `,
    preview
  );
  return extractBlogPost(res);
};

export const getAllBlogPosts = async (page = 0, preview = false) => {
  const res = await graphql(
    `
    query {
      blogPostCollection(skip: ${page * 10}, limit: 10, order: publishDate_DESC, preview: ${preview}) {
        items {
          ${BLOG_POST_FIELDS}
        }
      }
    }
  `,
    preview
  );
  return extractAllBlogPosts(res);
};

export const getAllBlogPostSlugs = async () => {
  const res = await graphql(
    `
      query {
        blogPostCollection(preview: true) {
          items {
            slug
          }
        }
      }
    `,
    true
  );
  return extractAllBlogPosts(res);
};
