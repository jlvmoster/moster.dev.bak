import Image from 'next/image';
import { withRouter } from 'next/router';

import profilePic from '../public/me.png';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Home = ({ router }) => (
  <>
    <SEO title='Home' pathname={router.pathname} />
    <Layout>
      <div className='max-w-3xl mx-auto py-16 sm:max-w-5xl sm:py-24 sm:px-6 lg:max-w-7xl'>
        <div className='text-center'>
          <Image src={profilePic} width={256} height={256} layout='fixed' alt='Picture of the author' priority />
        </div>
        <div className='mt-6 text-center'>
          <h2 className='text-3xl text-white font-bold tracking-wide'>Hi, I&apos;m Jalo &#x1f44b;</h2>
          <p className='mt-3 text-lg text-gray-300'>I&apos;m a helluva Software Engineer. Go Jackets! &#x1f41d;</p>
        </div>
      </div>
    </Layout>
  </>
);

export default withRouter(Home);
