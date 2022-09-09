import { withRouter } from 'next/router';

import { getArchivedBlogPosts } from '@/lib/api';
import { getEstimatedReadingTime } from '@/lib/utils';
import Layout from '@/components/layout';
import SEO from '@/components/seo';
import BlogCard from '@/components/blog-card';

const Archive = ({ router, posts, preview }) => (
  <>
    <SEO title='Archive' pathname={router.pathname} />
    <Layout pathname={router.pathname} preview={preview}>
      <div className='max-w-3xl mx-auto sm:max-w-5xl lg:max-w-7xl'>
        <section className='py-16 px-3 sm:py-24 sm:px-6'>
          <div className='px-3 text-center'>
            <h1 className='text-4xl sm:text-5xl text-gray-900 dark:text-white font-semibold tracking-wider leading-tight'>
              Archived Blogs
            </h1>
          </div>
        </section>
        {posts.length > 0 ? (
          <section className='mx-auto mb-24 px-6 grid gap-6 sm:grid-cols-2 sm:max-w-5xl'>
            {posts.map(post => (
              <BlogCard key={post.fields.slug} post={post} />
            ))}
          </section>
        ) : (
          <section className='py-16 px-3 sm:py-24 sm:px-6'>
            <div className='px-3 text-center'>
              <h2 className='text-3xl sm:text-4xl text-gray-900 dark:text-white font-light tracking-wide leading-tight'>
                No blogs yet... <br className='sm:hidden' /> Check back later.
              </h2>
            </div>
          </section>
        )}
      </div>
    </Layout>
  </>
);

export default withRouter(Archive);

export const getStaticProps = async ({ preview = false }) => {
  const posts = (await getArchivedBlogPosts(preview)) ?? [];
  const enrichedPosts = posts.map(post => {
    post['readingTime'] = getEstimatedReadingTime(post);
    return post;
  });
  return {
    props: { posts: enrichedPosts, preview },
  };
};
