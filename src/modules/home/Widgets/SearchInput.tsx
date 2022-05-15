import React from 'react';
import SearchIcon from '../../../app/icons/SearchIcon';

type Props = {};

const SearchInput = (props: Props) => {
    return (
        <div className="sticky p-4 top-0 bg-gray-800">
            <div className="relative sunken-element rounded-full   ">
                <input type="text" className="pl-12 primary-input" placeholder="Search" />
                <SearchIcon className="stroke-currhent text-gray-500 left-4 absolute top-3  " />
            </div>
        </div>
    );
};

export default SearchInput;
