import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { Tab } from '@headlessui/react';
import { useParams } from 'react-router';

import Avatar from '../components/Avatar';
import ProjectsCreated from '../components/ProjectsCreated';
import SearchBar from '../components/SearchBar';
import StyledTab from '../components/StyledTab';
import ProfileDetails from '../components/ProfileDetails';
import ProfileSocials from '../components/ProfileSocials';
import { getProfileByAddressRequest, getProfiles } from '../services/get-profiles';
import { getPublications } from '../services/get-publications';
import ProjectsJoined from '../components/ProjectsJoined';
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
import { PRNTS_PUBLIC_KEY } from '../../../utils/local-storage/keys';
import { createProfileMetadata } from '../../../utils/create-profile-metadata';
import { appId } from '../../../app/constants';
import getAttributeType from '../../../utils/get-attribute-type';
import { uploadWeb3Json } from '../../../utils/upload-json';
import updateProfileMetaData from '../services/update-profile-metadata';
import getIPFSUrlLink from '../../../utils/get-ipfs-url-link';
import { follow } from '../services/follow';

interface Props {
    // authenthicated: boolean;
}

interface State {
    profileDetails: any;
    ownedPublications: any[];
    collectedPublications: any[];
    loading: boolean;
    publicKey: string | null;
    isOwner: boolean;
}

const ProfilePage: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { handle } = useParams();
    const [state, setState] = useSetState<State>({
        profileDetails: {},
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

    const {
        loading,
        ownedPublications,
        collectedPublications,
        profileDetails,
        publicKey,
        isOwner,
    } = state;

    useEffect(() => {
        // getProfileDetails();
        if (isNewUser) {
            saveProfileMetadata();
        }
        getProfileDetailsByHandle(handle!);
        getCollectedPublications();
    }, [handle]);

    const getProfileDetailsByHandle = (handle: string) => {
        getProfiles({
            handles: [handle],
            limit: 1,
        }).then((profile: any) => {
            const isOwnerTemp =
                profile.data.profiles.items[0].ownedBy.toLocaleLowerCase() == publicKey
                    ? true
                    : false;
            setState({
                isOwner: isOwnerTemp,
            });
            setState({ profileDetails: profile.data.profiles.items[0] });
            if (isOwnerTemp) {
                dispatch(setUserProfile(profile.data.profiles.items[0]));
            }
            // getIPFSUrlLink(profileDetails.picture.original.url);
            getProfilePublications(profile.data.profiles.items[0].id);
            if (isNewUser) {
                saveProfileMetadata();
            }
        });
    };

    const getProfilePublications = (id: string) => {
        getPublications({ profileId: id, publicationTypes: ['POST', 'COMMENT', 'MIRROR'] }).then(
            (publications: any) => {
                setState({ ownedPublications: publications.data.publications.items });
            }
        );
    };

    const getCollectedPublications = () => {
        getPublications({
            collectedBy: '0xBCbdb07a47f6E9dA7d4e40AFeAfe7f52053731Fd',
            publicationTypes: ['POST'],
        }).then((publications: any) => {
            setState({ collectedPublications: publications.data.publications.items });
        });
    };

    const saveProfileMetadata = async () => {
        const attributes = [getAttributeType('string', 'appId', appId)];
        const profileMetadata = createProfileMetadata({
            name: '',
            bio: '',
            cover_picture: '',
            attributes: attributes,
        });
        const contentURI = await uploadWeb3Json(handle!, JSON.stringify(profileMetadata));
        const createProfileMetadataRequest = {
            profileId: profileDetails.id,
            url: contentURI,
        };
        await updateProfileMetaData(createProfileMetadataRequest);
    };

    return (
        <div className="min-h-screen">
            <div className="overflow-hidden min-h-full  max-w-screen-xl mx-auto container sunken-element">
                <>
                    {Object.keys(profileDetails).length !== 0 ? (
                        <div className="relative p-4">
                            {profileDetails.coverPicture === null ? (
                                <div
                                    hidden={profileDetails.coverPicture === null ? false : true}
                                    className="w-full h-56 bg-dark-gray"></div>
                            ) : (
                                <img
                                    src={profileDetails.coverPicture.original.url}
                                    alt="Cover Image"
                                    className="w-full h-56 bg-dark-gray"
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
                                        <Link className="green-outline-btn px-4 max-w-fit" to={''}>
                                            Follow
                                        </Link>
                                    )}

                                    <ProfileSocials
                                        fb=""
                                        google=""
                                        instagram=""
                                        shareLink=""
                                        twitter=""
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading..</div>
                    )}
                </>

                <Tab.Group defaultIndex={0}>
                    <Tab.List className="elevated-element flex items-center justify-center gap-8">
                        <StyledTab>Projects Created</StyledTab>
                        <StyledTab>Projects Joined </StyledTab>
                        <StyledTab>Timeline</StyledTab>
                        <StyledTab>Soundcloud Songs</StyledTab>
                    </Tab.List>
                    <div className="p-8 space-y-8">
                        <SearchBar />

                        <Tab.Panels>
                            <Tab.Panel>
                                <ProjectsCreated ownedPublications={ownedPublications} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <ProjectsJoined collectedPublications={collectedPublications} />
                            </Tab.Panel>
                            <Tab.Panel>Timeline</Tab.Panel>
                            <Tab.Panel>Sound cloud songs</Tab.Panel>
                        </Tab.Panels>
                    </div>
                </Tab.Group>
            </div>
        </div>
    );
};

export default ProfilePage;
