import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AllDiscussions from '../components/AllDiscussions';
import CreatePostModal from '../components/CreatePostModal';
import FollowingNews from '../components/FollowingNews';
import NewsSidebar from '../components/NewsSidebar';
import { getUserAuthenticated } from '../../auth/state/auth.reducer';

type Props = {};

const NewsFeed: React.FC<Props> = (props) => {
    const authenticatedState = useSelector(getUserAuthenticated);
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);
    const [filter, setFilter] = React.useState<'Latest' | 'Most Liked'>('Latest');

    const openModal = () => {
        setIsCreatePostModalOpen(true);
    };

    const closeModal = () => {
        setIsCreatePostModalOpen(false);
    };

    return (
        <>
            <CreatePostModal
                isOpen={isCreatePostModalOpen}
                closeModal={closeModal}
                pfpSrc="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
            />
            <div className="pt-4">
                <Tab.Group>
                    <div className="max-w-[320px] fixed left-4 top-20">
                        <NewsSidebar openModal={openModal} authenticatedState={authenticatedState} />
                    </div>
                    <div className="ml-[320px] px-8 max-h-max">
                        <Tab.Panels>
                            <Tab.Panel>
                                <AllDiscussions />
                            </Tab.Panel>
                            {!!authenticatedState && (
                                <Tab.Panel>
                                    <FollowingNews />
                                </Tab.Panel>
                            )}
                        </Tab.Panels>
                    </div>
                </Tab.Group>
            </div>
        </>
    );
};

export default NewsFeed;
