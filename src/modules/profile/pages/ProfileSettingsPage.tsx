import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { ShareIcon, ShieldExclamationIcon, UserIcon } from '@heroicons/react/outline';
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

interface Props {
    // authenticated: boolean;
}

const ProfileSettingsPage: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
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
                        <ProfileSettings
                            profileDetails={profileDetails}
                            onSubmit={getProfileDetails}
                        />
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
