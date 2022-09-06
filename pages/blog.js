import { withRouter } from 'next/router';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Blog = ({ router }) => (
  <>
    <SEO title='Blog' pathname={router.pathname} />
    <Layout pathname={router.pathname}>
      <section className='max-w-3xl mx-auto py-16 sm:max-w-5xl sm:py-24 sm:px-6 lg:max-w-7xl'>
        <div className='px-3 text-center'>
          <h1 className='text-3xl text-white font-bold tracking-wide sm:text-5xl'>Welcome to my blog!</h1>
        </div>
      </section>
    </Layout>
  </>
);

export default withRouter(Blog);
