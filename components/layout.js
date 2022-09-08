import Alert from './alert';
import Header from './header';
import Footer from './footer';

const Layout = ({ pathname, preview = false, children }) => (
  <div className='min-h-screen flex flex-col bg-white dark:bg-gray-800'>
    <Alert preview={preview} />
    <Header pathname={pathname} />
    <main className='flex-grow'>{children}</main>
    <Footer />
  </div>
);

export default Layout;
