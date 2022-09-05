import Image from 'next/image';
import { withRouter } from 'next/router';

import profilePic from '../public/me.png';
import Card from '../components/card';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Home = ({ router }) => (
  <>
    <SEO title='Home' pathname={router.pathname} />
    <Layout>
      <div className='max-w-3xl mx-auto py-16 sm:py-24 sm:px-6'>
        <Card>
          <div className='flex'>
            <div className='overflow-hidden mr-4 h-20 w-20 flex-shrink-0 rounded-full'>
              <Image className='' src={profilePic} width={512} height={512} alt='Picture of the author' />
            </div>
            <div>
              <h2 className='text-3xl font-bold tracking-wide'>Hi, I&apos;m Jalo &#x1f44b;</h2>
              <p className='mt-3 text-lg text-gray-700'>I&apos;m a helluva Software Engineer. Go Jackets! &#x1f41d;</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  </>
);

export default withRouter(Home);
