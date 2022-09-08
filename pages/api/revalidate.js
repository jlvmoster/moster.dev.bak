const handler = async (req, res) => {
  // Should be secret, custom header coming in from Contentful
  const inboundRevalToken = req.headers['x-vercel-reval-key'];

  // Check for secret to confirm this is a valid request
  if (!inboundRevalToken) {
    return res.status(401).json({ message: 'x-vercel-reval-key header not defined' });
  } else if (inboundRevalToken !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const postSlug = req.body.fields.slug['en-US'];

    // revalidate the individual post, blog page, and the home page
    await res.revalidate(`/blog/${postSlug}`);
    await res.revalidate('/blog');
    await res.revalidate('/');

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
};

export default handler;
