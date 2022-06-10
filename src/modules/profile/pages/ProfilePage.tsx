import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { Tab } from '@headlessui/react';
import { useParams } from 'react-router';

import Avatar from '../components/Avatar';
import BudsCreated from '../components/BudsCreated';
import StyledTab from '../components/StyledTab';
import ProfileDetails from '../components/ProfileDetails';
import ProfileSocials from '../components/ProfileSocials';
import { getProfiles, useGetProfile } from '../services/get-profiles';
import {
    useGetPublicationsCollected,
    useGetPublicationsPosted,
} from '../../project/services/get-publications';
import BudsBought from '../components/BudsBought';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    getCurrentUserAdress,
    getIsNewUser,
    getUserAuthenticated,
    getUserProfile,
} from '../../auth/state/auth.reducer';
import { setUserProfile } from '../../auth/state/auth.action';
import { useAppDispatch } from '../../../state/configure-store';
import { getStorageValue } from '../../../utils/local-storage/local-storage';
import { PRNTS_PUBLIC_KEY, LENS_TOKENS } from '../../../utils/local-storage/keys';
import { createProfileMetadata } from '../../../utils/create-profile-metadata';
import { appId } from '../../../app/constants';
import getAttributeType from '../../../utils/get-attribute-type';
import { uploadWeb3Json } from '../../../utils/upload-json';
import updateProfileMetaData from '../services/update-profile-metadata';
import { follow, useDoesFollow } from '../services/follow';
import { Card } from '../../../app/components/common-ui/atoms/Card';
import { Input } from '../../../app/components/common-ui/atoms/Input';
import { SearchIcon } from '@heroicons/react/outline';
import Spinner from '../../../app/components/common-ui/atoms/Spinner';
import { doesHaveEnoughBalance } from '../../../services/ethers-service';
import Button from '../../../app/components/common-ui/atoms/Button';
import {
    promiseToast,
    successToast,
    errorToast,
} from '../../../app/components/common-ui/toasts/CustomToast';
import { pollUntilIndexed } from '../../../services/has-transaction-been-indexed';
import { isValidToken } from '../../../utils/auth-helpers';
import { login } from '../../auth/services/lens-login';

interface Props {
    // authenthicated: boolean;
}

interface State {
    ownedPublications: any[];
    collectedPublications: any[];
    loading: boolean;
    publicKey: string | null;
    isOwner: boolean;
}

const ProfilePage: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const { handle } = useParams();
    const [state, setState] = useSetState<State>({
        ownedPublications: [],
        collectedPublications: [],
        loading: false,
        publicKey: getStorageValue(PRNTS_PUBLIC_KEY),
        isOwner: false,
    });

    //redux state
    const isNewUser = useSelector(getIsNewUser);
    const address = useSelector(getCurrentUserAdress);
    const authenthicatedState = useSelector(getUserAuthenticated);

    const auth = getStorageValue(LENS_TOKENS);

    const { publicKey, isOwner } = state;

    const shareLink = `${window.location.origin}/profile/${handle}`;

    const { data: profileDetails = {}, isLoading } = useGetProfile();
    const { attributes = [], ownedBy = '', id } = profileDetails;
    const [, , instagramLink, twitterLink] = attributes;

    const { data = {}, refetch } = useDoesFollow(profileDetails.id);
    const { data: { doesFollow: [{ follows = false } = {}] = [] } = {} } = data as any;
    const { data: publicationsPostedData = [] } = useGetPublicationsPosted(id);
    const { data: publicationsCollectedData = [] } = useGetPublicationsCollected(ownedBy);

    useEffect(() => {
        getProfileDetailsByHandle(handle!);
    }, [handle]);

    const getProfileDetailsByHandle = (handle: string) => {
        getProfiles({
            handles: [handle],
            limit: 1,
        }).then((profile: any) => {
            const isOwner =
                profile.data.profiles.items[0].ownedBy.toLocaleLowerCase() == publicKey
                    ? true
                    : false;
            setState({
                isOwner,
            });
            if (isOwner) {
                dispatch(setUserProfile(profile.data.profiles.items[0]));
            }
            if (isNewUser) {
                saveProfileMetadata(profile.data.profiles.items[0]);
            }
        });
    };

    const saveProfileMetadata = async (profile: { id: string }) => {
        if (await doesHaveEnoughBalance({ warn: true })) {
            const attributes = [getAttributeType('string', 'appId', appId)];
            const profileMetadata = createProfileMetadata({
                name: '',
                bio: '',
                cover_picture: '',
                attributes: attributes,
            });
            const contentURI = await uploadWeb3Json(handle!, JSON.stringify(profileMetadata));
            const createProfileMetadataRequest = {
                profileId: profile.id,
                url: contentURI,
            };
            await updateProfileMetaData(createProfileMetadataRequest);
        }
    };

    // TODO: [PMA-79] Move follow call to useMutate and use the in built loader
    const onFollowClick = async () => {
        if (follows) {
            // TODO: [PMA-80] Add unfollow functionality
            successToast('Already following the user', 'Follow Profile');
            return;
        }
        try {
            const { accessToken } = JSON.parse(auth!);
            if (!isValidToken(accessToken)) {
                await dispatch(login());
            }
            promiseToast('Following...', 'Follow Profile');
            const txHash = await follow(profileDetails.id);
            await pollUntilIndexed(txHash);
            successToast('Followed Successfully', 'Follow Profile');
            refetch();
        } catch (err) {
            errorToast('Error Following!', 'Follow Profile');
        }
    };

    return (
        <div className="pt-4 px-4">
            <Card variant="sunken" color="dark">
                <>
                    {!isLoading ? (
                        <div className="relative p-4">
                            {profileDetails.coverPicture === null ? (
                                <div
                                    hidden={profileDetails.coverPicture === null ? false : true}
                                    className="w-full h-56 bg-[#151B22]"></div>
                            ) : (
                                <img
                                    src={profileDetails.coverPicture.original.url}
                                    alt="Cover Image"
                                    className="w-full h-56 bg-[#151B22]"
                                />
                            )}

                            {profileDetails.picture === null ? (
                                <div className="absolute top-36 pl-8 ">
                                    <Avatar imgSrc="https://prnts.mypinata.cloud/ipfs/QmUDKC6zKTfDh25yNceRXRodi3R8MZZ5fKJFgVkkKwTGHt" />
                                </div>
                            ) : (
                                <div className="absolute top-36 pl-8 ">
                                    <Avatar imgSrc={profileDetails.picture.original.url} />
                                </div>
                            )}

                            <div className="flex justify-between  p-8">
                                <ProfileDetails
                                    name={profileDetails.name || profileDetails.handle}
                                    about={`@${profileDetails.handle}`}
                                    followerCount={profileDetails.stats.totalFollowers}
                                    followingCount={profileDetails.stats.totalFollowing}
                                />
                                <div className="flex flex-col gap-4 justify-end items-end">
                                    {/* <a href="#" className="green-outline-btn px-4 max-w-fit">
                                        Edit Profile
                                    </a> */}

                                    {isOwner && authenthicatedState ? (
                                        <Link
                                            className="green-outline-btn px-4 max-w-fit"
                                            to="/profile/settings">
                                            Edit Profile
                                        </Link>
                                    ) : (
                                        <Button onClick={onFollowClick} outline>
                                            {follows ? 'Following' : 'Follow'}
                                        </Button>
                                    )}

                                    <ProfileSocials
                                        fb=""
                                        google=""
                                        instagram={instagramLink?.value || ''}
                                        shareLink={shareLink}
                                        twitter={twitterLink?.value || ''}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full h-56 flex-col justify-center items-center">
                            <Spinner size="lg" />
                            Loading..
                        </div>
                    )}
                </>
                <Tab.Group defaultIndex={0}>
                    <Tab.List className="elevated-element flex items-center justify-center gap-8">
                        <StyledTab>Buds For Sale</StyledTab>
                        <StyledTab>Buds You Bought </StyledTab>
                        <StyledTab>Timeline</StyledTab>
                        <StyledTab>Weed Links</StyledTab>
                    </Tab.List>
                    <div className="p-8 space-y-8">
                        <Input
                            leftIcon={<SearchIcon className="h-4 w-4" />}
                            placeholder="Search Something"
                        />
                        <Tab.Panels>
                            <Tab.Panel>
                                <BudsCreated ownedPublications={publicationsPostedData} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <BudsBought collectedPublications={publicationsCollectedData} />
                            </Tab.Panel>
                            <Tab.Panel>Timeline</Tab.Panel>
                            <Tab.Panel>Sound cloud songs</Tab.Panel>
                        </Tab.Panels>
                    </div>
                </Tab.Group>
            </Card>
        </div>
    );
};

export default ProfilePage;
