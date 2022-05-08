import { ClockIcon, HashtagIcon, UsersIcon } from '@heroicons/react/outline';
import { EyeIcon, HeartIcon } from '@heroicons/react/solid';
import React from 'react';
import HashTagIcon from '../../../../icons/HashTagIcon';
import MaticIcon from '../../../../icons/MaticIcon';
import AirdropDetails from './AirdropDetails';
import ProjectActivity from './ProjectActivity';
import ProjectImageCard from './ProjectImageCard';

type Props = {};

const ProjectPage = (props: Props) => {
    const imageLink =
        'https://images.unsplash.com/photo-1651648814980-55936f67f9f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80';
    return (
        <div className="sunken-element flex gap-8 p-8">
            {/* Left Section */}
            <div className="">
                <ProjectImageCard likes={101} imgSrc={imageLink} />
                <div className="flex item-center gap-4 mt-4">
                    <HashtagIcon className="h-6 w-6" />
                    0x325gg54y
                </div>
                <div className="flex item-center gap-4 mt-4">
                    <UsersIcon className="h-6 w-6" />4 members
                </div>
                <div className="flex item-center gap-4 mt-4">
                    <UsersIcon className="h-6 w-6" />4 posts
                </div>
                <div className="flex item-center gap-4 mt-4">
                    <ClockIcon className="h-6 w-6" />7 days ago
                </div>
            </div>
            {/* Right Section */}
            <div className="flex-grow">
                <p className="text-sm text-primary">Cold inner Fire </p>
                <h6 className="text-2xl font-bold mb-3">Cold Inner Fire #3447</h6>
                <div className="flex items-center  gap-4 text-slate-400 ">
                    <p>
                        Owned by <span className="text-primary">cold inner fire</span>
                    </p>
                    <div className="flex items-center gap-4">
                        <EyeIcon className="h-5 w-5" /> 230 views
                    </div>
                    <div className="flex items-center gap-4">
                        <HeartIcon className="h-5 w-5" /> 230 views
                    </div>
                </div>

                <div className="elevated-element mb-6 divide-y-4 divide-dark-gray rounded-2xl  mt-6 w-full">
                    <AirdropDetails />
                    <div className="py-4 px-6">
                        <p className="text-slate- mb-2">Current Price</p>
                        <div className="text-2xl font-bold flex items-center gap-2 mb-4">
                            <MaticIcon /> 7.6{' '}
                            <span className="text-base text-slate-400">($ 617.3)</span>
                        </div>
                        <div className='flex gap-4'>
                            <button className="green-btn w-32">Join</button>
                            <button className="green-outline-btn w-32">Show Details</button>
                        </div>
                    </div>
                </div>
                        {/* Spotify Integration */}
                        <ProjectActivity/>
            </div>
        </div>
    );
};

export default ProjectPage;
