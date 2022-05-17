import { Tab } from '@headlessui/react';
import React from 'react'

type StyledSettingsTabProps = {
  children: React.ReactNode;
  danger?:boolean
};

const StyledSettingsTab = ({ children ,danger=false }: StyledSettingsTabProps) => {
  
  return (
      <Tab
          className={({ selected }:{selected:boolean}) =>
              selected
                  ? `text-black py-2 px-6 font-medium flex items-center gap-2 duration-300 ease-out ${danger ? 'bg-red-500': 'bg-green-500'} `
                  : `${danger ? 'text-red-500': 'text-white'} flex items-center gap-2 font-medium py-2 duration-300 ease-out px-6 hover:text-white active:outline-none focus-within:outline-none `
          }>
          {children}
      </Tab>
  );
};

export default StyledSettingsTab