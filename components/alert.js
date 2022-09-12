import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

const Alert = ({ preview }) =>
  preview && (
    <div className='bg-blue-200 p-4 dark:bg-blue-50'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <InformationCircleIcon className='h-5 w-5 text-blue-500 dark:text-blue-400' aria-hidden='true' />
        </div>
        <div className='ml-3 flex-1 sm:flex sm:justify-between'>
          <p className='text-sm text-blue-700'>This page is in preview mode.</p>
          <p className='mt-3 -translate-x-2 transform text-sm sm:mt-0 sm:ml-6 sm:translate-x-0'>
            <Link href='/api/exit-preview'>
              <a className='group whitespace-nowrap font-semibold text-blue-700 hover:font-bold hover:text-blue-600'>
                <span className='underline-offset-4 group-hover:underline'>Exit preview</span>
                <span aria-hidden='true'> &rarr;</span>
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

export default Alert;
