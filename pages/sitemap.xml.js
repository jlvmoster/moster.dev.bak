import { Component } from 'react';
import { getAllBlogPostSlugs } from '@/lib/api';

const WEBSITE_URL = 'https://moster.dev';

const createSitemap = slugs => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
  <loc>${WEBSITE_URL}</loc>
  <changefreq>daily</changefreq>
</url>
<url>
  <loc>${WEBSITE_URL}/blog</loc>
  <changefreq>daily</changefreq>
</url>
<url>
  <loc>${WEBSITE_URL}/archive</loc>
  <changefreq>daily</changefreq>
</url>
${slugs.map(slug => `<url><loc>${`${WEBSITE_URL}/blog/${slug}`}</loc><changefreq>daily</changefreq></url>`).join('\n')}
</urlset>
`;

class Sitemap extends Component {
  static async getInitialProps({ res }) {
    const posts = (await getAllBlogPostSlugs()) ?? [];
    const slugs = posts.map(post => post.fields.slug);
    const sitemap = createSitemap(slugs);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  }
}

export default Sitemap;
