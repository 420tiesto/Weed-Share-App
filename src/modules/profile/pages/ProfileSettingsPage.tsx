import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { CogIcon, ShareIcon, ShieldExclamationIcon, UserIcon } from '@heroicons/react/outline';
import StyledSettingsTab from '../components/StyledSettingsTab';
import ProfileSettings from '../components/ProfileSettings';
import AllowanceSettings from '../components/AllowanceSettings';
import DangerSettings from '../components/DangerSettings';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../auth/state/auth.reducer';
import { getProfiles } from '../services/get-profiles';
import { setUserProfile } from '../../auth/state/auth.action';
import { HOME_PAGE } from '../../../app/routes/Routes';
import { useAppDispatch } from '../../../state/configure-store';
import { Card } from '../../../app/components/common-ui/atoms/Card';
import ProfileInfo from '../components/ProfileInfo';
import AccountSettings from '../components/AccountSettings';

interface Props {
    // authenticated: boolean;
}

const ProfileSettingsPage: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();

    //redux state
    const profileDetails = useSelector(getUserProfile);

    useEffect(() => {}, [profileDetails]);

    const getProfileDetails = () => {
        getProfiles({
            ownedBy: [profileDetails.ownedBy],
            limit: 10,
        }).then((profile: any) => {
            console.log(profile.data.profiles.items);
            dispatch(setUserProfile(profile.data.profiles.items[0]));
        });
    };

    const onProfileMetadataSubmit = () => {
        // submit
    };

    const onProfilePicSubmit = () => {};

    return (
        <div className="p-4 px-8">
            <Card variant="sunken" color="dark">
                <div className="flex">
                    <Tab.Group vertical>
                        <div className="max-w-[320px] w-full">
                            <div className="w-full p-4 border-b-2 border-[#505050]">
                                <ProfileInfo
                                    imgSrc={
                                        profileDetails.picture === null
                                            ? ''
                                            : profileDetails.picture.original.url
                                    }
                                    name={profileDetails.name}
                                    username={profileDetails.handle}
                                />
                            </div>
                            <Tab.List className="flex flex-col mt-4">
                                <StyledSettingsTab>
                                    <UserIcon className="h-5 w-5" /> Profile
                                </StyledSettingsTab>
                                <StyledSettingsTab>
                                    <CogIcon className="h-5 w-5" /> Account
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
                            <div className="w-full elevated-element p-10 min-h-screen">
                                <h2 className="text-3xl font-medium mb-8">Profile Settings</h2>
                                <Tab.Panel>
                                    <ProfileSettings
                                        profileDetails={profileDetails}
                                        onSubmit={getProfileDetails}
                                    />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <AccountSettings />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <AllowanceSettings />
                                </Tab.Panel>
                                <Tab.Panel>
                                    <DangerSettings />
                                </Tab.Panel>
                            </div>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </Card>
        </div>
    );
};

export default ProfileSettingsPage;
