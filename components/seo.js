import Head from 'next/head';

const SEO = ({ title, description, children }) => {
  const defaultTitle = `Moster &bull; Dev`;
  const defaultDescription = `A developer's personal blog`;
  const seo = {
    title: title ? `title | ${defaultTitle}` : defaultTitle,
    description: description || defaultDescription,
  };
  return (
    <Head>
      <title>{seo.title}</title>
      <meta key='description' name='description' content={seo.description} />
      {children}
    </Head>
  );
};

export default SEO;
