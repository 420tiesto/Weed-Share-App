import { Tab } from '@headlessui/react';
import React, { useEffect } from 'react';
import Avatar from './Avatar';
import ProjectsCreated from './ProjectsCreated';
import SearchBar from './SearchBar';
import StyledTab from './StyledTab';
import ProfileDetails from './ProfileDetails';
import ProfileSocials from './ProfileSocials';
import { getProfileByAddressRequest, getProfiles } from '../services/get-profiles';
import { getPublications } from '../services/get-publications';

const ProfilePage = () => {
    useEffect(() => {
        getProfileDetails();
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
            getProfilePublications(profile.data.profiles.items[0].id);
        });
    };

    const getProfilePublications = (id: string) => {
        console.log(id, 'id');
        getPublications({ profileId: id, publicationTypes: ['POST', 'COMMENT', 'MIRROR'] }).then(
            (publications) => {
                console.log(publications, 'puvb');
            }
        );
    };

    return (
        <div className="p-4 min-h-screen">
            <div className="overflow-hidden min-h-full  max-w-screen-xl mx-auto container sunken-element">
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                        alt=""
                        className="w-full h-56 abg-gray-700"
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
                            <ProfileSocials fb="" google="" instagram="" shareLink="" twitter="" />
                        </div>
                    </div>
                </div>
                <Tab.Group defaultIndex={0}>
                    <Tab.List className="elevated-card flex items-center justify-center gap-8">
                        <StyledTab>Projects Created</StyledTab>
                        <StyledTab>Projects Joined </StyledTab>
                        <StyledTab>Timeline</StyledTab>
                        <StyledTab>Soundcloud Songs</StyledTab>
                    </Tab.List>
                    <div className="p-8 space-y-8">
                        <SearchBar />

                        <Tab.Panels>
                            <Tab.Panel>
                                <ProjectsCreated />
                            </Tab.Panel>
                            <Tab.Panel>Projects Joined</Tab.Panel>
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
