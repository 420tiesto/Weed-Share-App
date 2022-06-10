import { CheckCircleIcon, XIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import Spinner from '../atoms/Spinner';

export const successToast = (message: string, header: string = 'Success Message') => {
    return toast.custom(
        <div className="relative flex items-center gap-2 shadow-lg w-full max-w-xs bg-dark-black py-2 px-3 rounded-xl border-2 border-green-500">
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
            <div>
                <p className='font-semibold text-green-500'>{header}</p>
                {message}
            </div>
            {/* Delete Icon */}
            <button className='absolute right-2 top-2'>
              <XIcon className='h-6 w-6'/>
            </button>
        </div>
    );
};



export const promiseToast = (message: string, header: string = 'In Progress Message') => {
  return toast.custom(
      <div className="relative flex items-center gap-2 shadow-lg w-full max-w-xs bg-dark-black py-2 px-3 rounded-xl border-2 border-yellow-500">
          <Spinner variant='warning' size='md' />
          <div>
              <p className='font-semibold text-yellow-500'>{header}</p>
              {message}
          </div>
          {/* Delete Icon */}
          <button className='absolute right-2 top-2'>
            <XIcon className='h-6 w-6'/>
          </button>
      </div>
  );
};



export const errorToast = (message: string, header: string = 'Error Message') => {
  return toast.custom(
      <div className="relative flex items-center gap-2 shadow-lg w-full max-w-xs bg-dark-black py-2 px-3 rounded-xl border-2 border-red-500">
          <CheckCircleIcon className="h-8 w-8 text-red-500" />
          <div>
              <p className='font-semibold text-red-500'>{header}</p>
              {message}
          </div>
          {/* Delete Icon */}
          <button className='absolute right-2 top-2'>
            <XIcon className='h-6 w-6'/>
          </button>
      </div>
  );
};
