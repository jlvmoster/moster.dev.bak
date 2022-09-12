import clsx from 'clsx';
import { GLOBAL_BACKGROUND_COLOR } from '@/lib/styles';
import { GitHubIcon, LinkedInIcon } from '@/components/social-icons';

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/jlvmoster',
    SocialIcon: GitHubIcon,
  },
  {
    name: 'Twitter',
    href: 'https://linkedin.com/in/jlvmoster',
    SocialIcon: LinkedInIcon,
  },
];

const Footer = () => (
  <footer className={clsx(GLOBAL_BACKGROUND_COLOR)}>
    <div className='mx-auto max-w-7xl p-8'>
      <div className='flex justify-center space-x-6'>
        {socials.map(({ name, href, SocialIcon }) => (
          <a
            key={href}
            href={href}
            rel='noreferrer'
            target='_blank'
            className='text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
          >
            <span className='sr-only'>{name}</span>
            <SocialIcon className='h-6 w-6' fill='currentColor' aria-hidden='true' />
          </a>
        ))}
      </div>
      <div className='mt-4 flex flex-col items-center justify-center sm:flex-row'>
        <p className='text-center text-base text-gray-400'>
          &copy; 2022{' '}
          <a
            href='https://mosterinc.com'
            target='_blank'
            rel='noreferrer'
            className='underline-offset-4 transition duration-150 ease-in-out hover:text-gray-500 hover:underline dark:hover:text-gray-300'
          >
            Moster, Inc.
          </a>{' '}
          All rights reserved. <br className='sm:hidden' /> Powered by{' '}
          <a
            href='https://vercel.com'
            target='_blank'
            rel='noreferrer'
            className='text-xl font-semibold transition duration-150 ease-in-out hover:font-bold hover:text-gray-500 dark:hover:text-gray-300'
          >
            Vercel
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
