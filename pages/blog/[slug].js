import { format } from 'date-fns';
import Image from 'next/image';
import { withRouter } from 'next/router';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { getAllBlogPostSlugs, getBlogPostBySlug } from '../../lib/api';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => (
      <div className='relative mx-auto aspect-w-16 aspect-h-9'>
        <Image src={`https:${node.data.target.fields.file.url}`} layout='fill' alt={node.data.target.fields.title} />
      </div>
    ),
  },
};

const BlogPost = ({ router, post, readingTime, preview }) => (
  <>
    <SEO title={post.title} description={post.excerpt} pathname={router.pathname} />
    <Layout pathname={router.pathname} preview={preview}>
      <div className='mx-auto mt-8 mb-24 space-y-8 sm:space-y-12 sm:max-w-3xl'>
        <section className='flex px-4'>
          <div className='mx-auto pt-12 pb-6 px-8'>
            <h1 className='font-mono text-5xl tracking-wide sm:text-7xl'>{post.title}</h1>
            <p className='font-medium text-xs sm:text-sm'>
              {format(new Date(post.publishDate), 'LLLL d, yyyy')} &bull; {readingTime} min read
            </p>
            <div className='my-3 border-b-2 border-dotted sm:border-b-4' />
            <h4 className='font-semibold text-sm sm:text-base'>{post.excerpt}</h4>
          </div>
        </section>
        <div className='relative mx-auto aspect-w-16 aspect-h-9'>
          <Image
            src={`https:${post.heroImage.fields.file.url}`}
            layout='fill'
            alt={post.heroImage.fields.title}
            priority
          />
        </div>
        <section className='px-4'>
          <article className='mx-auto prose dark:prose-invert lg:prose-xl'>
            {documentToReactComponents(post.content, renderOptions)}
          </article>
        </section>
      </div>
    </Layout>
  </>
);

export default withRouter(BlogPost);

export const getStaticProps = async ({ params, preview = false }) => {
  const post = (await getBlogPostBySlug(params.slug, preview)) ?? null;

  const wpm = 200; // average time a reader takes
  const content = documentToPlainTextString(post.fields.content);
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wpm);

  return {
    props: { post: post.fields, readingTime, preview },
  };
};

export const getStaticPaths = async () => {
  const posts = (await getAllBlogPostSlugs()) ?? [];
  return {
    paths: posts.map(post => `/blog/${post.fields.slug}`),
    fallback: false,
  };
};
