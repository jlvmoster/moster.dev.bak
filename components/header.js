import { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
];

const Links = ({ pathname }) =>
  links.map(link => (
    <Link key={link.path} href={link.path}>
      <a
        className={clsx(
          'px-3 py-2 rounded-md text-sm font-medium',
          link.path === pathname
            ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'
            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-300 dark:hover:text-white'
        )}
      >
        {link.name}
      </a>
    </Link>
  ));

const ThemeIcon = ({ theme, resolvedTheme }) => {
  switch (resolvedTheme) {
    case 'light':
      return <SunIcon className={clsx('w-6 h-6', theme === resolvedTheme && 'text-sky-500')} />;
    case 'dark':
      return <MoonIcon className={clsx('w-6 h-6', theme === resolvedTheme && 'text-sky-500')} />;
    default:
      return <span>Error loading icon...</span>;
  }
};

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const options = [
    { value: 'light', label: 'Light', icon: <SunIcon className='w-6 h-6 mr-2' /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon className='w-6 h-6 mr-2' /> },
    { value: 'system', label: 'System', icon: <ComputerDesktopIcon className='w-6 h-6 mr-2' /> },
  ];

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Listbox value={theme} onChange={setTheme}>
        <Listbox.Label className='sr-only'>Theme switcher</Listbox.Label>
        <Listbox.Button
          className={clsx(
            'inline-flex items-center rounded-lg border border-transparent p-1.5',
            'text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
            'focus:outline-none'
          )}
        >
          <ThemeIcon theme={theme} resolvedTheme={resolvedTheme} />
        </Listbox.Button>
        <Transition
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Listbox.Options
            className={clsx(
              'absolute z-10 w-36 mt-4 py-1 top-full right-0 rounded-lg shadow-lg overflow-hidden',
              'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300',
              'ring-1 ring-gray-900/10 dark:ring-0'
            )}
          >
            {options.map(option => (
              <Listbox.Option key={option.value} value={option.value} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={clsx('py-1 px-2 flex items-center cursor-pointer text-small font-semibold', {
                      'text-sky-500': selected,
                      'bg-gray-50 dark:bg-gray-600': active,
                    })}
                  >
                    {option.icon}
                    {option.label}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

const Header = ({ pathname }) => (
  <header className='bg-white dark:bg-gray-800'>
    <div className='mx-auto max-w-7xl px-8'>
      <div className='py-6 flex justify-start items-center border-b border-gray-300 dark:border-gray-600 sm:border-none'>
        <Link href='/'>
          <a className='group flex-grow text-2xl text-gray-900 dark:text-white tracking-wide font-medium sm:flex-none'>
            Moster
            <span className='text-green-600 dark:text-green-400 transition ease-in-out duration-150 group-hover:text-sky-500'>
              &lt;dev/&gt;
            </span>
          </a>
        </Link>
        <nav className='ml-4 flex-grow space-x-4 hidden sm:block'>
          <Links pathname={pathname} />
        </nav>
        <ThemeSwitcher />
      </div>
      <nav className='py-4 flex flex-wrap justify-center space-x-4 sm:hidden'>
        <Links pathname={pathname} />
      </nav>
    </div>
  </header>
);

export default Header;
