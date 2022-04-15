import React from 'react';
import SearchIcon from '../../../../../icons/SearchIcon';

type Props = {};

const SearchInput = (props: Props) => {
    return (
        <div className='sticky p-4 top-0 bg-zinc-800'>
        <div className='relative sunken-element rounded-full   '>
          <input type="text" className="rounded-full ring-1 ring-zinc-700 hover:ring-zinc-600 focus:ring-primary duration-300 ease-out   bg-transparent  w-full h-full pl-12 py-3" placeholder="Search" />
            <SearchIcon className='stroke-currhent text-zinc-500 left-4 absolute top-4  '/>
        </div>
        </div>
    );
};

export default SearchInput;
