import { DotsVerticalIcon } from '@heroicons/react/outline';
import React from 'react';
import ChatIcon from '../../../../app/icons/ChatIcon';
import RetweetIcon from '../../../../app/icons/RetweetIcon';

type Props = {};

const ReviewsItem = (props: Props) => {
    return (
        <div className="elevated-element divide-dark-black divide-y-2 gap-4">
            <div className="p-4 space-y-4">
                <div className="flex gap-4">
                    <img
                        src="https://images.unsplash.com/photo-1490604001847-b712b0c2f967?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1853&q=80"
                        alt="pfp"
                        className="rounded-full h-12 w-12"
                    />
                    <div className="flex-grow">
                        <p className="font-medium">Cold Inner Fire</p>
                        <p className="text-primary">@ColdInnerFire</p>
                    </div>
                    <div className="text-slate-400">7 days ago</div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, magnam!</p>
            </div>
            <div className="flex gap-4 items-center py-2 px-4">
                <ChatIcon />
                <div className="flex items-center gap-2">
                    <RetweetIcon /> 3
                </div>
                <DotsVerticalIcon className="h-5 w-5" />
            </div>
        </div>
    );
};

export default ReviewsItem;
