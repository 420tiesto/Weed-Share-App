import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { Input } from '../../../../app/components/common-ui/atoms/Input';
import { SelectOption } from '../../../../app/components/common-ui/atoms/SelectInput';
import { MusicDetails } from '../../types';

type Props = {
    label: string;
    options: SelectOption[];
    placeholder: string;
} & UseControllerProps<MusicDetails>;

const AutcompleteFormInput = (props: Props) => {
    const [query, setQuery] = useState<string>('');

    const {
        field: { value, onChange },
    } = useController(props);

    const { options, label, placeholder } = props;

    const filteredOptions =
        query === ''
            ? options
            : options.filter((value: SelectOption) =>
                  value.name
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(query.toLowerCase().replace(/\s+/g, ''))
              );

    return (
        <div className="grid grid-cols-5 items-center">
            <label className="col-span-2" htmlFor={props.name}>
                {label}
            </label>
            <Combobox value={value} onChange={onChange}>
                <div className="relative  col-span-3 mt-1 flex-grow">
                    <Combobox.Input
                        as={Input}
                        className='group'
                        rightIcon={
                            <Combobox.Button className="group-focus:border-r-1 border-primary flex items-center pr-2">
                                <SelectorIcon
                                    className="w-5 h-5 text-[#C0C0C0]"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        }
                        placeholder={placeholder}
                        displayValue={(value: SelectOption) => value.name}
                        onChange={(event) => setQuery(event.target.value)}
                    />

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}>
                        <Combobox.Options className="bg-black border border-[#C0C0C0]/50 z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-2xl py-2">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 ">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((value: SelectOption) => (
                                    <Combobox.Option
                                        key={value.id}
                                        className={({ active }) =>
                                            `relative bg-black cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'brightness-125  ' : null
                                            }`
                                        }
                                        value={value}>
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? 'font-medium text-primary'
                                                            : 'font-normal'
                                                    }`}>
                                                    {value.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? 'text-primary'
                                                                : 'text-green-600'
                                                        }`}>
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
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
        </div>
    );
};

export default AutcompleteFormInput;
