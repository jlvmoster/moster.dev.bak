import Head from 'next/head';

const SEO = ({ title, description, pathname, children }) => {
  const defaultTitle = `Moster<dev/>`;
  const defaultDescription = `A developer's personal blog`;
  const siteUrl = `https://moster.dev`;
  const seo = {
    title: title ? `${title} • ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}/favicon.ico`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername: `@jlvmoster`,
  };
  return (
    <Head>
      <title>{seo.title}</title>
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={seo.title} />
      <meta name='twitter:description' content={seo.description} />
      <meta name='twitter:image' content={seo.image} />
      <meta name='twitter:url' content={seo.url} />
      <meta name='twitter:creator' content={seo.twitterUsername} />
      <meta name='title' property='og:title' content={seo.title} />
      <meta name='description' property='og:description' content={seo.description} />
      <meta name='image' property='og:image' content={seo.image} />
      <meta name='image:alt' property='og:image:alt' content={seo.description} />
      <meta name='url' property='og:url' content={seo.url} />
      <meta name='site_name' property='og:site_name' content={defaultTitle} />
      <meta name='hostname' content='moster.dev' />
      {children}
    </Head>
  );
};

export default SEO;
