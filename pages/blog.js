import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { withRouter } from 'next/router';

import { getAllBlogPosts } from '../lib/api';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Blog = ({ router, posts, preview }) => (
  <>
    <SEO title='Blog' pathname={router.pathname} />
    <Layout pathname={router.pathname} preview={preview}>
      <div className='max-w-3xl sm:max-w-5xl lg:max-w-7xl'>
        <section className='mx-auto py-16 px-3 sm:py-24 sm:px-6'>
          <div className='px-3 text-center'>
            <h1 className='text-3xl text-gray-900 dark:text-white font-bold tracking-wide sm:text-5xl'>
              Welcome to my blog!
            </h1>
          </div>
        </section>
        <section className='mx-auto px-6 grid gap-4 sm:grid-cols-2'>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a
                className={clsx(
                  'flex flex-col overflow-hidden rounded-lg shadow-md dark:shadow-lg dark:bg-gray-900',
                  'transform ease-in-out duration-150 hover:scale-105'
                )}
              >
                <div className='relative aspect-w-16 aspect-h-9'>
                  <Image src={post.heroImage.url} layout='fill' alt={post.heroImage.title} priority />
                </div>
                <div className='p-6'>
                  <h5 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>{post.title}</h5>
                  <p className='mt-3 text-base text-gray-500 dark:text-white'>{post.excerpt}</p>
                </div>
              </a>
            </Link>
          ))}
        </section>
      </div>
    </Layout>
  </>
);

export default withRouter(Blog);

export const getServerSideProps = async ({ query, preview = false }) => {
  const posts = (await getAllBlogPosts(query.page ?? 0, preview)) ?? [];
  return {
    props: { posts, preview },
  };
};
