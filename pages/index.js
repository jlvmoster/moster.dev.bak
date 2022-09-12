import Image from 'next/image';
import { withRouter } from 'next/router';

import profilePic from '../public/me.png';
import Layout from '@/components/layout';
import SEO from '@/components/seo';

const Home = ({ router }) => (
  <>
    <SEO title='Home' pathname={router.pathname} />
    <Layout pathname={router.pathname}>
      <section className='mx-auto max-w-3xl py-16 sm:max-w-5xl sm:py-24 lg:max-w-7xl'>
        <div className='relative mx-auto h-48 w-48 overflow-hidden rounded-full sm:h-64 sm:w-64'>
          <Image src={profilePic} alt='Picture of the author' layout='fill' priority />
        </div>
        <div className='mt-6 text-center'>
          <h1 className='text-3xl font-bold tracking-wide text-gray-900 dark:text-white sm:text-5xl'>
            Hi, I&apos;m Jalo &#x1f44b;
          </h1>
          <p className='mt-3 text-lg tracking-wider text-gray-500 dark:text-gray-300 sm:text-2xl'>
            I&apos;m just one <span className='font-semibold text-yellow-500 dark:text-yellow-400'>helluva</span>{' '}
            Software Engineer.
          </p>
        </div>
      </section>
    </Layout>
  </>
);

export default withRouter(Home);
