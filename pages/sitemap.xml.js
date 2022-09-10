import { getAllBlogPostSlugs } from '@/lib/api';

const WEBSITE_URL = 'https://moster.dev';

const generateSitemap = slugs => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>${WEBSITE_URL}</loc>
</url>
<url>
  <loc>${WEBSITE_URL}/blog</loc>
</url>
<url>
  <loc>${WEBSITE_URL}/archive</loc>
</url>
${slugs.map(slug => `<url><loc>${`${WEBSITE_URL}/blog/${slug}`}</loc></url>`).join('\n')}
</urlset>
`;

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  const posts = (await getAllBlogPostSlugs()) ?? [];
  const slugs = posts.map(post => post.fields.slug);
  const sitemap = generateSitemap(slugs);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};

export default Sitemap;
