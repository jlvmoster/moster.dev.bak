import clsx from 'clsx';

import Header from './header';
import Footer from './footer';
import styles from '../styles/App.module.css';

const Layout = ({ pathname, children }) => (
  <div className={clsx('h-screen flex flex-col', styles.background)}>
    <Header pathname={pathname} />
    <main className='flex-grow'>{children}</main>
    <Footer />
  </div>
);

export default Layout;
