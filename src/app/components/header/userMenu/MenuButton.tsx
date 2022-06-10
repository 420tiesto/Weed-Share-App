import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    name: string;
    handle: string;
    imageURI: string;
}

const MenuButton = (props: Props) => {
    const navigate = useNavigate();
    const { name, handle, imageURI } = props;

    const handleHavigate = () => {
        navigate(`/profile/${handle}`);
    };
    return (
        <Menu.Button
            // onClick={handleHavigate}
            // {...props}
            className="inline-flex gap-2 group items-center bg-black px-2 rounded-lg py-1">
            <img src={imageURI} alt="" className="w-8 h-8 rounded-full" />
            {/* {name} */}
            <ChevronDownIcon className={`h-6 w-6`} />
        </Menu.Button>
    );
};
export default MenuButton;
