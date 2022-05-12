import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { Tab } from '@headlessui/react';

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
import { Link } from 'react-router-dom';

type Props = {};

interface State {
    profileDetails: any[];
    ownedPublications: any[];
    collectedPublications: any[];
    loading: boolean;
}

const ProfilePage: React.FC<Props> = (props: Props) => {
    const [state, setState] = useSetState<State>({
        profileDetails: [],
        ownedPublications: [],
        collectedPublications: [],
        loading: false,
    });

    const { profileDetails, loading, ownedPublications, collectedPublications } = state;

    useEffect(() => {
        getProfileDetails();
        getCollectedPublications();
    }, []);

    // get the profile following and flowwers cout here
    // get profile image and cover page etc.
    // save them in state so that they can used in profile settings
    // once eupdated again save to state.
    const getProfileDetails = () => {
        getProfiles({
            ownedBy: ['0x7ED96dB37a3B20BF96F138950571E71EbFCc4B7c'],
            limit: 10,
        }).then((profile) => {
            console.log(profile.data);
            setState({ profileDetails: profile.data.profiles.items });
            getProfilePublications(profile.data.profiles.items[0].id);
            console.log(getIPFSUrlLink(profile.data.profiles.items[0].picture.original.url));
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
            collectedBy: '0x7ED96dB37a3B20BF96F138950571E71EbFCc4B7c',
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
                    {profileDetails && profileDetails.length > 0 ? (
                        <div className="relative p-4">
                            <img
                                src="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                                alt=""
                                className="w-full h-56 bg-dark-gray"
                            />

                            <div className="absolute top-36 pl-8 ">
                                <Avatar imgSrc={profileDetails[0].picture.original.url} />
                            </div>
                            <div className="flex justify-between  p-8">
                                <ProfileDetails
                                    name={profileDetails[0].name || profileDetails[0].handle}
                                    about={`@${profileDetails[0].handle}`}
                                    followerCount={profileDetails[0].stats.totalFollowing}
                                    followingCount={profileDetails[0].stats.totalFollowers}
                                />
                                <div className="flex flex-col gap-4 justify-end items-end">
                                    {/* <a href="#" className="green-outline-btn px-4 max-w-fit">
                                        Edit Profile
                                    </a> */}
                                    <Link
                                        className="green-outline-btn px-4 max-w-fit"
                                        to="/profile-settings">
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
                        <div className="relative p-4">
                            <img
                                src="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                                alt=""
                                className="w-full h-56 bg-dark-gray"
                            />

                            <div className="absolute top-36 pl-8 ">
                                <Avatar imgSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" />
                            </div>
                            <div className="flex justify-between  p-8">
                                <ProfileDetails
                                    name="Memories of Moon"
                                    about="memories of moon"
                                    followerCount={50}
                                    followingCount={200}
                                />
                                <div className="flex flex-col gap-4 justify-end items-end">
                                    <a href="#" className="green-outline-btn px-4 max-w-fit">
                                        Edit Profile
                                    </a>
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