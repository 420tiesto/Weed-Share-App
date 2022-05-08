import { Tab } from '@headlessui/react';
import React from 'react'

type StyledSettingsTabProps = {
  children: React.ReactNode;
  danger?:boolean
};

const StyledSettingsTab = ({ children ,danger=false }: StyledSettingsTabProps) => {
  
  return (
      <Tab
          className={({ selected }) =>
              selected
                  ? ` py-2 px-6 font-medium flex items-center gap-2 rounded-lg duration-300 ease-out ${danger ? 'text-red-500': 'text-primary'}  elevated-element`
                  : `${danger ? 'text-red-600': 'text-slate-400'} flex items-center gap-2 font-medium py-2 duration-300 ease-out px-6 hover:text-white `
          }>
          {children}
      </Tab>
  );
};

export default StyledSettingsTab