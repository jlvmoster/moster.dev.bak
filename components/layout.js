import Header from './header';
import Footer from './footer';

const Layout = ({ pathname, children }) => (
  <div className='min-h-screen flex flex-col bg-white dark:bg-gray-800'>
    <Header pathname={pathname} />
    <main className='flex-grow'>{children}</main>
    <Footer />
  </div>
);

export default Layout;
