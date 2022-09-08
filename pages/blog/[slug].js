import { format } from 'date-fns';
import Image from 'next/image';
import { withRouter } from 'next/router';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import { getAllBlogPostSlugs, getBlogPostBySlug } from '../../lib/api';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (node.content.length === 1 && node.content[0].marks.filter(({ type }) => type === 'code').length > 0) {
        return <pre>{children}</pre>;
      }
      return <p>{children}</p>;
    },
    [BLOCKS.TABLE]: (node, children) => (
      <table className='border-2 border-gray-100 dark:border-gray-900'>
        <tbody>{children}</tbody>
      </table>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => (
      <tr className='border-2 border-gray-100 dark:border-gray-900'>{children}</tr>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => <th className='px-6 bg-gray-100 dark:bg-gray-900'>{children}</th>,
    [BLOCKS.TABLE_CELL]: (node, children) => <td className='px-6'>{children}</td>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target='_blank'
        rel='noreferrer'
        className='text-sky-600 dark:text-sky-500 transition ease-in-out duration-150 no-underline underline-offset-4 hover:underline hover:text-sky-500 dark:hover:text-sky-400'
      >
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: node => (
      <div className='relative mx-auto aspect-w-16 aspect-h-9'>
        <Image src={`https:${node.data.target.fields.file.url}`} layout='fill' alt={node.data.target.fields.title} />
      </div>
    ),
  },
};

const BlogPost = ({ router, post, readingTime, preview }) => (
  <>
    <SEO title={post.fields.title} description={post.fields.excerpt} pathname={router.pathname} />
    <Layout pathname={router.pathname} preview={preview}>
      <div className='mx-auto mt-8 mb-24 space-y-8 sm:space-y-12 sm:max-w-3xl'>
        <section className='flex px-4'>
          <div className='mx-auto pt-12 pb-6 px-8'>
            <h1 className='font-mono text-5xl tracking-wide sm:text-7xl'>{post.fields.title}</h1>
            <p className='font-medium text-xs sm:text-sm'>
              {format(new Date(post.fields.publishDate), 'EEEE, LLLL do yyyy')} &bull; {readingTime} min read
            </p>
            <div className='my-3 border-b-2 border-dotted sm:border-b-4' />
            <h4 className='font-semibold text-sm sm:text-base'>{post.fields.excerpt}</h4>
          </div>
        </section>
        <div className='relative mx-auto aspect-w-16 aspect-h-9'>
          <Image
            src={`https:${post.fields.heroImage.fields.file.url}`}
            layout='fill'
            alt={post.fields.heroImage.fields.title}
            priority
          />
        </div>
        <section className='px-4'>
          <article className='max-w-3xl mx-auto prose dark:prose-invert lg:prose-xl'>
            {documentToReactComponents(post.fields.content, renderOptions)}
          </article>
        </section>
      </div>
    </Layout>
  </>
);

export default withRouter(BlogPost);

export const getStaticProps = async ({ params, preview = false }) => {
  const post = (await getBlogPostBySlug(params.slug, preview)) ?? null;

  const wpm = 200; // average time a reader takes (words per minute)
  const content = documentToPlainTextString(post.fields.content);
  const words = (content.match(/\w+/g) ?? []).length;
  const readingTime = Math.ceil(words / wpm);

  return {
    props: { post, readingTime, preview },
  };
};

export const getStaticPaths = async () => {
  const posts = (await getAllBlogPostSlugs()) ?? [];
  return {
    paths: posts.map(post => `/blog/${post.fields.slug}`),
    fallback: false,
  };
};
