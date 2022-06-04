import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import SelectInput from '../../../app/components/common-ui/atoms/SelectInput';
import AllDiscussions from '../components/AllDiscussions';
import CreatePostModal from '../components/CreatePostModal';
import FollowingNews from '../components/FollowingNews';
import NewsSidebar from '../components/NewsSidebar';

type Props = {};

const NewsFeed = (props: Props) => {
    const [isCreatePostModalOpen,setIsCreatePostModalOpen] = useState<boolean>(false);
    const [filter,setFilter] = React.useState<"Latest" | "Most Liked">("Latest")
    
    const openModal = () => {
        setIsCreatePostModalOpen(true);        
    }
    
    const closeModal = () => {
        setIsCreatePostModalOpen(false);    
    }

    return (
        <>
        <CreatePostModal isOpen={isCreatePostModalOpen} closeModal={closeModal} pfpSrc="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"/>
        <div className="pt-4">
            <Tab.Group>
                <div className="max-w-[320px] h-ful col-span-1 fixed left-4 top-20">
                    <NewsSidebar openModal={openModal}/>
                </div>
                <div className="ml-[320px]">
                    <Tab.Panels>
                        <Tab.Panel><AllDiscussions/></Tab.Panel>
                        <Tab.Panel><FollowingNews/></Tab.Panel>
                    </Tab.Panels>
                </div>
            </Tab.Group>
        </div>
        </>
    );
};

export default NewsFeed;
