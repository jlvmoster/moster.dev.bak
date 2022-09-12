import { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

import { GLOBAL_BACKGROUND_COLOR } from '@/lib/styles';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
];

const Links = ({ pathname }) =>
  links.map(link => (
    <Link key={link.path} href={link.path}>
      <a
        className={clsx(
          'rounded-md px-3 py-2 text-sm font-medium',
          link.path === pathname
            ? 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'
            : 'text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
        )}
      >
        {link.name}
      </a>
    </Link>
  ));

const ThemeIcon = ({ theme, resolvedTheme }) => {
  switch (resolvedTheme) {
    case 'light':
      return <SunIcon className={clsx('h-6 w-6', theme === resolvedTheme && 'text-sky-500')} />;
    case 'dark':
      return <MoonIcon className={clsx('h-6 w-6', theme === resolvedTheme && 'text-sky-500')} />;
    default:
      return <span>Error loading icon...</span>;
  }
};

const ThemeSelector = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const options = [
    { value: 'light', label: 'Light', icon: <SunIcon className='mr-2 h-6 w-6' /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon className='mr-2 h-6 w-6' /> },
    { value: 'system', label: 'System', icon: <ComputerDesktopIcon className='mr-2 h-6 w-6' /> },
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
            'text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
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
              'absolute top-full right-0 z-10 mt-4 w-36 overflow-hidden rounded-lg py-1 shadow-lg',
              'bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-300'
            )}
          >
            {options.map(option => (
              <Listbox.Option key={option.value} value={option.value} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={clsx('text-small flex cursor-pointer items-center py-1 px-2 font-semibold', {
                      'text-sky-500': selected,
                      'bg-gray-200 dark:bg-gray-600': active,
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
  <header className={GLOBAL_BACKGROUND_COLOR}>
    <div className='mx-auto max-w-7xl px-8'>
      <div className='flex items-center justify-start border-b border-gray-300 py-6 dark:border-gray-600 sm:border-none'>
        <Link href='/'>
          <a className='group flex-grow text-2xl font-medium tracking-wide text-gray-900 dark:text-white sm:flex-none'>
            Moster
            <span className='text-green-600 transition duration-150 ease-in-out group-hover:text-sky-500 dark:text-green-400'>
              &lt;dev/&gt;
            </span>
          </a>
        </Link>
        <nav className='ml-4 hidden flex-grow space-x-4 sm:block'>
          <Links pathname={pathname} />
        </nav>
        <ThemeSelector />
      </div>
      <nav className='flex flex-wrap justify-center space-x-4 py-4 sm:hidden'>
        <Links pathname={pathname} />
      </nav>
    </div>
  </header>
);

export default Header;
