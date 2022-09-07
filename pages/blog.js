import { withRouter } from 'next/router';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Blog = ({ router }) => (
  <>
    <SEO title='Blog' pathname={router.pathname} />
    <Layout pathname={router.pathname}>
      <section className='max-w-3xl mx-auto py-16 sm:max-w-5xl sm:py-24 sm:px-6 lg:max-w-7xl'>
        <div className='px-3 text-center'>
          <h1 className='text-3xl text-gray-900 dark:text-white font-bold tracking-wide sm:text-5xl'>
            Welcome to my blog!
          </h1>
        </div>
      </section>
      <section className='max-w-3xl mx-auto py-16 sm:max-w-5xl sm:py-24 sm:px-6 lg:max-w-7xl'>
        <article className='mx-auto prose dark:prose-invert lg:prose-xl'>
          <h1>Garlic bread with cheese: What the science tells us</h1>
          <p>
            For years parents have espoused the health benefits of eating garlic bread with cheese to their children,
            with the food earning such an iconic status in our culture that kids will often dress up as warm, cheesy
            loaf for Halloween.
          </p>
          <p>
            But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases springing
            up around the country.
          </p>
        </article>
      </section>
    </Layout>
  </>
);

export default withRouter(Blog);
