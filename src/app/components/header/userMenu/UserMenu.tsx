import { Menu } from '@headlessui/react';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';

type Props = {};

const UserMenu = (props: Props) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="focus:outline-none px-2 bg-opacity-20 hover:bg-opacity-30  bg-black items-center inline-flex w-full justify-center rounded-md p-1 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <img
                        className="h-8 w-8 rounded-full "
                        src="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
                        alt=""
                    />
                    <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>
            <Menu.Items
                className={
                    'absolute right-0  mt-1 bg-black bg-opacity-20 origin-top-right backdrop-blur-xl  rounded-md shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none'
                }>
                <Menu.Item>
                    <a
                        href="#"
                        className="group whitespace-nowrap flex rounded-md hover:bg-black bg-opacity-20 hover:bg-opacity-40 items-center w-full px-4 py-2 text-sm">
                        Menu Item 1
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                        href="#"
                        className="group whitespace-nowrap flex rounded-md hover:bg-black bg-opacity-20 hover:bg-opacity-40 items-center w-full px-4 py-2 text-sm">
                        Menu Item 2
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                        href="#"
                        className="group whitespace-nowrap flex rounded-md hover:Abg-black bg-opacity-20 hover:bg-opacity-40 items-center w-full px-4 py-2 text-sm">
                        Menu Item 13
                    </a>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default UserMenu;
