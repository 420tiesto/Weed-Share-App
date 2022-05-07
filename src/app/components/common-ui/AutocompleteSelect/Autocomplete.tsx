import React, { Fragment, useState } from 'react';
import { Transition, Combobox } from '@headlessui/react';
import { SelectorIcon, CheckIcon } from '@heroicons/react/outline';

export type SelectOption = {
    name: string;
    id: number;
    value: string;
};

type SelectProps = {
    selected: SelectOption;
    setSelected: any;
    list: SelectOption[];
};

function Autocomplete({ selected, setSelected, list }: SelectProps) {
  const [query, setQuery] = useState<string>('')

  const filteredList =
    query === ''
      ? list
      : list.filter((value) =>
          value.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="focus:outline-none relative w-full cursor-default rounded-2xl text-left  focus-visible:ring-2 ">
            <Combobox.Input
              className="w-full  primary-input "
              displayValue={(value:SelectOption) => value.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className=" bg-gray-900 z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl py-2">
              {filteredList.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 ">
                  Nothing found.
                </div>
              ) : (
                filteredList.map((value:SelectOption) => (
                  <Combobox.Option
                    key={value.id}
                    className={({ active }) =>
                      `relative backdrop-blur-xl  cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-700  ' : null
                      }`
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium text-primary' : 'font-normal'
                          }`}
                        >
                          {value.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-primary' : 'text-green-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    
    );
}

export default Autocomplete;
