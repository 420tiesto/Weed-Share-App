import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useState} from 'react';

const MenuButton = ({ ...props }) => {
    return (
        <Menu.Button
            {...props}
            className="inline-flex gap-2 group items-center bg-gray px-2 rounded py-1">
            <img
                src="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
                alt=""
                className="w-8 h-8 rounded-full"
            />
            Memories of Moon
            <ChevronDownIcon  className={`h-6 w-6`} />
        </Menu.Button>
    );
};
export default MenuButton;
