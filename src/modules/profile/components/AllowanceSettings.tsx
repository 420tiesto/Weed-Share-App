import { ClockIcon, CogIcon, MinusIcon, PlayIcon, PlusIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Button from '../../../app/components/common-ui/atoms/Button';
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card';
import SelectInput, { SelectOption } from '../../../app/components/common-ui/atoms/SelectInput';
import Stack from '../../../app/components/common-ui/atoms/Stack';

type Props = {};

const AllowanceSettings = (props: Props) => {
    const CURRENCIES: SelectOption[] = [
        { id: 1, name: 'Polygon MATIC', value: 'MATIC' },
        { id: 2, name: 'Ethereum', value: 'ETH' },
    ];
    const [selectedCurrency, setSelectedCurrency] = useState<SelectOption>(CURRENCIES[0]);

    const cardStyle = {
        container: `flex flex-wrap justify-between items- p-4 rounded-xl`,
        title: `font-bold flex items-center gap-2`,
        subtitle: `text-slate-400"`,
        icon: ``,
        allowBtn: `btn bg-green-500 hover:bg-green-400`,
        revokeBtn: `btn bg-amber-500 hover:bg-amber-400`,
    };

    return (
        <>
            <Card variant="elevated" className="rounded-[30px] ">
                <CardBody padding={8} className="px-12">
                    <Stack spacing={4}>
                        <p className="font-medium">Allow / Revoke modules</p>
                        <p>
                            In order to use collect feature you need to allow the module you use,
                            you can allow and revoke the module anytime.
                        </p>
                        <div className="max-w-lg">
                            <SelectInput
                                label="Select Currency"
                                value={selectedCurrency}
                                setValue={setSelectedCurrency}
                                options={CURRENCIES}
                            />
                        </div>
                        <Card
                            variant="sunken"
                            rounded="xl"
                            className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold inline-flex gap-1 items-center">
                                    <ClockIcon className='h-4 w-4 text-indigo-500'/>
                                    <CogIcon className='h-4 w-4 text-indigo-500'/>
                                    <PlayIcon className='h-4 w-4 text-indigo-500'/>
                                    Limited Fee Collect</p>
                                <p className="text-slate-500">
                                    0x343j3r2fsssfej4sfsSefsDr3w3rwrdf54vcx
                                </p>
                            </div>
                            <div>
                                <Button icon={<MinusIcon className="h-5 w-5" />} variant="warning" className='w-36 '>
                                    Revoke
                                </Button>
                            </div>
                            </Card>
                            <Card
                            variant="sunken"
                            rounded="xl"
                            className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-bold inline-flex gap-1 items-center">
                                    <ClockIcon className='h-4 w-4 text-indigo-500'/>
                                    <CogIcon className='h-4 w-4 text-indigo-500'/>
                                    <PlayIcon className='h-4 w-4 text-indigo-500'/>
                                    Limited Fee Collect</p>
                                <p className="text-slate-500">
                                    0x343j3r2fsssfej4sfsSefsDr3w3rwrdf54vcx
                                </p>
                            </div>
                            <div>
                                <Button icon={<PlusIcon className="h-5 w-5" />} variant="primary" className='w-36'>
                                    Allow
                                </Button>
                            </div>
                        </Card>
                    </Stack>
                </CardBody>
            </Card>
        </>
    );
};

export default AllowanceSettings;
