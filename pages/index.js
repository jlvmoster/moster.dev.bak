import Image from 'next/image';
import { withRouter } from 'next/router';

import profilePic from '../public/me.png';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Home = ({ router }) => (
  <>
    <SEO title='Home' pathname={router.pathname} />
    <Layout pathname={router.pathname}>
      <section className='max-w-3xl mx-auto py-16 sm:max-w-5xl sm:py-24 lg:max-w-7xl'>
        <div className='mx-auto w-48 h-48 relative overflow-hidden rounded-full sm:w-64 sm:h-64'>
          <Image src={profilePic} alt='Picture of the author' layout='fill' priority />
        </div>
        <div className='mt-6 text-center'>
          <h1 className='text-3xl text-white font-bold tracking-wide sm:text-5xl'>Hi, I&apos;m Jalo &#x1f44b;</h1>
          <p className='mt-3 text-lg text-gray-300 sm:text-2xl'>
            Just a <span className='text-yellow-400'>helluva</span> Software Engineer.
          </p>
        </div>
      </section>
    </Layout>
  </>
);

export default withRouter(Home);
