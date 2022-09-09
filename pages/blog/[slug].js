import { format } from 'date-fns';
import Image from 'next/image';
import { withRouter } from 'next/router';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import { getAllBlogPostSlugs, getBlogPostBySlug } from '../../lib/api';
import { getEstimatedReadingTime } from '../../lib/utils';
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
      <div className='max-h-96 overflow-auto'>
        <table className='not-prose w-full h-full m-0 table-auto border-collapse border-2 border-gray-100 dark:border-gray-900'>
          <tbody>{children}</tbody>
        </table>
      </div>
    ),
    [BLOCKS.TABLE_ROW]: (node, children) => (
      <tr className='border-2 border-gray-100 dark:border-gray-900'>{children}</tr>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
      <th className='p-4 bg-gray-100 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-900 whitespace-nowrap'>
        {children}
      </th>
    ),
    [BLOCKS.TABLE_CELL]: (node, children) => (
      <td className='p-4 border-2 border-gray-100 dark:border-gray-900 whitespace-nowrap'>{children}</td>
    ),
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
      <div className='max-w-7xl mx-auto mt-8 mb-24 space-y-8 sm:space-y-12'>
        <section className='flex px-6'>
          <div className='mx-auto pt-12 pb-6 px-8'>
            <h1 className='font-mono text-5xl tracking-wide sm:text-7xl md:text-8xl'>{post.fields.title}</h1>
            <p className='font-medium text-xs sm:text-sm'>
              {format(new Date(post.fields.publishDate), 'EEEE, LLLL do yyyy')} &bull; {readingTime} min read
            </p>
            <div className='my-3 border-b-2 border-dotted md:border-b-4' />
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
        <section className='px-6'>
          <article className='max-w-5xl mx-auto prose dark:prose-invert sm:prose-lg lg:prose-xl'>
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
  const readingTime = getEstimatedReadingTime(post);
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
