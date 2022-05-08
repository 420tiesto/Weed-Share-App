import React from 'react';
import { Tab } from '@headlessui/react';
import { ShareIcon, ShieldExclamationIcon, UserIcon } from '@heroicons/react/outline';
import StyledSettingsTab from './StyledSettingsTab';
import ProfileSettings from './ProfileSettings';
import AllowanceSettings from './AllowanceSettings';
import DangerSettings from './DangerSettings';

type Props = {};



const ProfileSettingsPage = (props: Props) => {
    return (
        <div className="p-4 gap-4 flex">
            <Tab.Group vertical>
                <Tab.List className="grid  gap-4  max-w-[200px] ">
                    <StyledSettingsTab><UserIcon className='h-5 w-5'/> Profile</StyledSettingsTab>
                    <StyledSettingsTab><ShareIcon className='h-5 w-5'/> Allowance</StyledSettingsTab>
                    <StyledSettingsTab danger>  <ShieldExclamationIcon className='h-5 w-5'/>Danger Zone</StyledSettingsTab>
                </Tab.List>
                <Tab.Panels className=" flex-grow p-8 rounded-xl sunken-element">
                    <Tab.Panel>
                        <ProfileSettings/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <AllowanceSettings/>
                    </Tab.Panel>
                    <Tab.Panel>
                        <DangerSettings/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ProfileSettingsPage;
