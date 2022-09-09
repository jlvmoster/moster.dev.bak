import clsx from 'clsx';

import { GLOBAL_BACKGROUND_COLOR } from '../lib/styles';
import Alert from './alert';
import Header from './header';
import Footer from './footer';

const Layout = ({ pathname, preview = false, children }) => (
  <div className={clsx('min-h-screen flex flex-col', GLOBAL_BACKGROUND_COLOR)}>
    <Alert preview={preview} />
    <Header pathname={pathname} />
    <main className='flex-grow'>{children}</main>
    <Footer />
  </div>
);

export default Layout;
