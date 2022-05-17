import { ExclamationIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import Button from '../../../app/components/common-ui/atoms/Button';
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card';
import { Input } from '../../../app/components/common-ui/atoms/Input';
import SelectInput, { SelectOption } from '../../../app/components/common-ui/atoms/SelectInput';
import Stack from '../../../app/components/common-ui/atoms/Stack';

type Props = {};

const AccountSettings = (props: Props) => {
    const PROFILES: SelectOption[] = [
        { name: 'Adarsh', value: 'adarsh', id: 1 },
        { name: 'Harrish', value: 'harrish', id: 1 },
        { name: 'Airesh', value: 'airesh', id: 1 },
        { name: 'Tiesto', value: 'tiesto', id: 1 },
    ];

    const [selectedProfile, setSelectedProfile] = useState<SelectOption>(PROFILES[0]);
    return (
        <>
            <Card variant="elevated" className="rounded-[30px]">
                <CardBody padding={8} className="px-12 space-y-4">
                    <div className="inline-flex items-center text-yellow-400">
                        <ExclamationIcon className="h-5 w-5" /> You don’t have any default profile
                        set!
                    </div>
                    <p className="font-bold ">Select default profile </p>
                    <p>
                        Selecting your default account helps to display the slected profile across
                        Lenster, you can change your default profile anytime.
                    </p>
                    <div>
                        <p className="font-bold ">What else should you know</p>
                        <div className="divide-y text-sm divide-[#505050] text-[#9B9B9B]">
                            <p className="py-4">
                                Only the default profile will be visible across the Lenster, example
                                notifications. follow etc.
                            </p>
                            <p className="py-4">You can change default profile anytime here.</p>
                        </div>
                    </div>
                    {/* Select Profile */}
                    <div className="max-w-lg">
                        <SelectInput
                            label="Select Profile"
                            value={selectedProfile}
                            setValue={setSelectedProfile}
                            options={PROFILES}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button>Save</Button>
                    </div>
                </CardBody>
            </Card>
            <Card variant="elevated" className="rounded-[30px] mt-8">
                <CardBody padding={8} className="px-12 space-y-4">
                    <p className="font-bold">Set super follow</p>
                    <p>
                        Setting super follow makes users spend crypto to folow you, and it’s the
                        good way to earn it, you can change the amount and currency or
                        disable/enable it anytime.
                    </p>
                    <form>
                        <Stack spacing={4} className='max-w-lg'>
                            <SelectInput
                                label="Select Currency"
                                value={selectedProfile}
                                setValue={setSelectedProfile}
                                options={PROFILES}
                            />
                            <Input
                                label="Follow amount"
                                type="number"
                                placeholder="Enter Follow amount"
                            />
                            <Input
                                label="Funds Receipient"
                                value={"0x63B0d1d96A5608140f1330f997Ea4A14af8E645D"}
                            />
                        </Stack>
                        <div className="flex mt-4 justify-end">
                            <Button>Save</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </>
    );
};

export default AccountSettings;
