import { Menu } from '@headlessui/react';
import React, { ReactNode } from 'react'

interface MenuItemsProps {
  children:ReactNode
}

const MenuItems = ({ children }:MenuItemsProps) => (
  <Menu.Items className="absolute right-0 w-56 origin-top-right ring-1 ring-dark-gray divide-dark-gray  bg-gray divide-y divide-gray-100 rounded-md shadow-2xl">
      {children}
  </Menu.Items>
);


export default MenuItems