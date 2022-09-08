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
      <meta name='description' content={seo.description} />
      <meta name='image' content={seo.image} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={seo.title} />
      <meta name='twitter:description' content={seo.description} />
      <meta name='twitter:image' content={seo.image} />
      <meta name='twitter:url' content={seo.url} />
      <meta name='twitter:creator' content={seo.twitterUsername} />
      {children}
    </Head>
  );
};

export default SEO;
