import React from 'react';
import { Tab } from '@headlessui/react';
import { ShareIcon, ShieldExclamationIcon, UserIcon } from '@heroicons/react/outline';
import StyledSettingsTab from '../components/StyledSettingsTab';
import ProfileSettings from '../components/ProfileSettings';
import AllowanceSettings from '../components/AllowanceSettings';
import DangerSettings from '../components/DangerSettings';

type Props = {};

const ProfileSettingsPage = (props: Props) => {
    return (
        <div className="p-4 gap-8 flex">
            <Tab.Group vertical>
                <div className="max-w-[320px] w-full">
                    <Tab.List className="grid  gap-4  ">
                        <StyledSettingsTab>
                            <UserIcon className="h-5 w-5" /> Profile
                        </StyledSettingsTab>
                        <StyledSettingsTab>
                            <ShareIcon className="h-5 w-5" /> Allowance
                        </StyledSettingsTab>
                        <StyledSettingsTab danger>
                            {' '}
                            <ShieldExclamationIcon className="h-5 w-5" />
                            Danger Zone
                        </StyledSettingsTab>
                    </Tab.List>
                </div>
                <Tab.Panels className="flex-grow">
                    <Tab.Panel>
                        <ProfileSettings />
                    </Tab.Panel>
                    <Tab.Panel>
                        <AllowanceSettings />
                    </Tab.Panel>
                    <Tab.Panel>
                        <DangerSettings />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ProfileSettingsPage;
