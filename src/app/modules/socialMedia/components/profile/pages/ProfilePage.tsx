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
import getIPFSUrlLink from '../../../../../utils/get-ipfs-url-link';
import ProjectsJoined from '../components/ProjectsJoined';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../state/configure-store';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../../auth/state/auth.reducer';
import { getStorageValue } from '../../../../../utils/local-storage/local-storage';
import { PUBLIC_KEY } from '../../../../../utils/local-storage/keys';
import { setUserProfile } from '../../auth/state/auth.action';

interface Props {
    authenthicated: boolean;
}

interface State {
    profileDetails: any;
    ownedPublications: any[];
    collectedPublications: any[];
    loading: boolean;
    publicKey: string | null;
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
        publicKey: getStorageValue(PUBLIC_KEY),
    });

    const { authenthicated } = props;
    const { loading, ownedPublications, collectedPublications, profileDetails, publicKey } = state;

    useEffect(() => {
        // getProfileDetails();
        console.log(handle, 'handle', authenthicated);
        getProfileDetailsByHandle(handle!);
        getCollectedPublications();
    }, [profileDetails]);

    const getProfileDetailsByHandle = (handle: string) => {
        getProfiles({
            handles: [handle],
            limit: 1,
        }).then((profile) => {
            console.log(profile.data.profiles.items);
            setState({ profileDetails: profile.data.profiles.items[0] });
            dispatch(setUserProfile(profile.data.profiles.items[0]));
            // getIPFSUrlLink(profileDetails.picture.original.url);
            getProfilePublications(profile.data.profiles.items[0].id);
        });
    };

    const getProfilePublications = (id: string) => {
        console.log(id, 'id');
        getPublications({ profileId: id, publicationTypes: ['POST', 'COMMENT', 'MIRROR'] }).then(
            (publications) => {
                console.log(publications, 'puvb');
                setState({ ownedPublications: publications.data.publications.items });
            }
        );
    };

    const getCollectedPublications = () => {
        getPublications({
            collectedBy: '0xBCbdb07a47f6E9dA7d4e40AFeAfe7f52053731Fd',
            publicationTypes: ['POST'],
        }).then((publications) => {
            console.log(publications, 'colectedpuvb');
            setState({ collectedPublications: publications.data.publications.items });
        });
    };

    return (
        <div className="min-h-screen">
            <div className="overflow-hidden min-h-full  max-w-screen-xl mx-auto container sunken-element">
                <>
                    {console.log(profileDetails)}
                    {Object.keys(profileDetails).length !== 0 ? (
                        <div className="relative p-4">
                            <img
                                src="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                                alt=""
                                className="w-full h-56 bg-dark-gray"
                            />

                            <div className="absolute top-36 pl-8 ">
                                <Avatar imgSrc={profileDetails.coverPicture} />
                            </div>
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
                                    <Link
                                        className="green-outline-btn px-4 max-w-fit"
                                        to="/profile/settings">
                                        Edit Profile
                                    </Link>
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
