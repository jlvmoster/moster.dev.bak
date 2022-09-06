import clsx from 'clsx';
import Link from 'next/link';
import styles from '../styles/App.module.css';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
];

const Header = ({ pathname }) => (
  <header className={styles.background}>
    <div className='mx-auto max-w-7xl px-8'>
      <div className='py-6 flex flex-col justify-center items-center border-b border-gray-600 sm:flex-row sm:justify-between sm:border-none'>
        <Link href='/'>
          <a className='group text-2xl text-white tracking-wide font-medium'>
            Moster
            <span className='text-green-400 group-hover:animate-pulse'>&lt;dev/&gt;</span>
          </a>
        </Link>
        <nav className='space-x-4 hidden sm:block'>
          {links.map(link => (
            <Link key={link.path} href={link.path}>
              <a
                className={clsx(
                  'px-3 py-2 rounded-md text-sm font-medium',
                  link.path === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                {link.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
      <nav className='py-4 flex flex-wrap justify-center space-x-4 sm:hidden'>
        {links.map(link => (
          <Link key={link.path} href={link.path}>
            <a
              className={clsx(
                'px-3 py-2 rounded-md text-sm font-medium',
                link.path === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              {link.name}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  </header>
);

export default Header;
