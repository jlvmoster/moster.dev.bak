import clsx from 'clsx';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

const BlogCard = ({ post }) => (
  <Link href={`/blog/${post.fields.slug}`}>
    <a
      className={clsx(
        'flex flex-col overflow-hidden rounded-xl shadow-md dark:bg-gray-900',
        'transform ease-in-out duration-150 hover:scale-105 hover:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
      )}
    >
      <div className='relative aspect-w-16 aspect-h-9'>
        <Image
          src={`https:${post.fields.heroImage.fields.file.url}`}
          layout='fill'
          alt={post.fields.heroImage.fields.title}
          priority
        />
      </div>
      <div className='p-6'>
        <h5 className='text-xl font-semibold text-gray-900 dark:text-gray-50'>{post.fields.title}</h5>
        <p className='text-sm text-base'>
          {format(new Date(post.fields.publishDate), 'LLL. d, yyyy')} &bull; {post.readingTime} min read
        </p>
        <p className='mt-3 text-base text-gray-500 dark:text-white'>{post.fields.excerpt}</p>
      </div>
    </a>
  </Link>
);

export default BlogCard;
