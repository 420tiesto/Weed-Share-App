import { TrashIcon } from '@heroicons/react/outline';
import React from 'react';

type Props = {};

const DangerSettings = (props: Props) => {
    return <div className="sunken-element space-y-4 p-8 rounded-2xl w-full">
      <h2 className='text-red-500 font-bold text-xl'>This will deactivate your account</h2>
      <p>Deleting your account is permanent. All your data will be wiped out immediately and you won't be able to get it back.</p>
      <h6 className='text-lg font-bold'>What else should you know </h6>
      <div className='divide-y-4 text-slate-400 divide-dark-gray'>
        <p className='py-3 pt-0'>You cannot restore your Prnts account if it was accidentally or wrongfully deleted.</p>
        <p className='py-3'>Some account information may still be available in search engine, such as Google or Bing.</p>
        <p className='py-3'>You @handle will be released immediately after deleting the account.</p>
      </div>
      <button className='bg-red-500 hover:bg-red-400 btn'>
        <TrashIcon className='h-5 w-5' /> Delete your account
      </button>
    </div>;
};

export default DangerSettings;
