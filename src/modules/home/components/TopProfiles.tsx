import { Tab } from '@headlessui/react';
import React from 'react';
import TopProfileAvatar, { TopProfileAvatarProps } from './TopProfileAvatar';

type Props = {};

const TopProfiles = (props: Props) => {
    const PLACEHOLDER_ARTIST: TopProfileAvatarProps[] = [
        {
            imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            name: 'Adarsh',
            handle: 'adarsh.test',
        },
        { imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', name: 'Harrish', handle: 'harrish.test' },
        { imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', name: 'Airesh', handle: 'airesh.test' },
        { imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', name: 'Arki', handle: 'arki.test' },
    ];

    return (
        <div className="p-8 px-16">
            <h2 className="text-2xl font-semibold mb-8">Top Profiles</h2>
            <div className='flex items-center justify-around gap-4 mx-16'>
                {PLACEHOLDER_ARTIST.map(({ handle, imgSrc, name }) => (
                    <TopProfileAvatar key={handle} handle={handle} imgSrc={imgSrc} name={name} />
                ))}
            </div>
        </div>
    );
};

export default TopProfiles;
