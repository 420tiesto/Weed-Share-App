import { Tab } from '@headlessui/react';
import { ChatIcon, StarIcon } from '@heroicons/react/solid';
import React from 'react';
import Button from '../../../app/components/common-ui/atoms/Button';
import { Card } from '../../../app/components/common-ui/atoms/Card';
import StyledSettingsTab from '../../profile/components/StyledSettingsTab';

type Props = {
    authenticatedState: boolean;
    openModal: () => void;
};

const NewsSidebar: React.FC<Props> = ({ openModal, authenticatedState = false }) => {
    return (
        <Card variant="sunken" color="dark" className="h-[90vh] w-[320px]">
            {/* Create project */}
            <div className="flex p-8 items-center justify-center ">
                <Button onClick={() => openModal()} className="w-full">
                    Create new post{' '}
                </Button>
            </div>
            {/* Tabs */}
            <Tab.List className="flex flex-col mb-8">
                <StyledSettingsTab>
                    <ChatIcon className="h-5 w-5" /> All discussions
                </StyledSettingsTab>
                {!!authenticatedState && (
                    <StyledSettingsTab>
                        <StarIcon className="h-5 w-5" /> Following
                    </StyledSettingsTab>
                )}
            </Tab.List>
            {/* Divider */}
            <div className="h-[2px]  mx-8  bg-white/30 " />
            <div className="p-8">
                <div className="flex flex-col gap-2 pl-4">
                    <div className="flex gap-4 items-center ">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        New Buds
                    </div>
                    <div className="flex gap-4 items-center ">
                        <div className="h-2 w-2 rounded-full bg-pink-400" />
                        Follow
                    </div>
                    <div className="flex gap-4 items-center ">
                        <div className="h-2 w-2 rounded-full bg-purple-400" />
                        Share
                    </div>
                    <div className="flex gap-4 items-center ">
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        Post
                    </div>
                    <div className="flex gap-4 items-center ">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        Buy
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default NewsSidebar;
