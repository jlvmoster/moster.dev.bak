import { withRouter } from 'next/router';
import SEO from '../components/seo';

const Home = ({ router }) => (
  <>
    <SEO title='Home' pathname={router.pathname} />
    <h1 className='text-3xl font-bold underline'>Hello world!</h1>
  </>
);

export default withRouter(Home);
