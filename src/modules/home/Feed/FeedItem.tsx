import React from 'react';
import ChatIcon from '../../../app/icons/ChatIcon';
import HeartIcon from '../../../app/icons/HeartIcon';
import RetweetIcon from '../../../app/icons/RetweetIcon';
import ShareIcon from '../../../app/icons/ShareIcon';

export type Props = {
    pfp: string; // Link to profile picture
    name: string;
    username: string; // Username
    content: string;
    image?: string; // Link to image src
    replyCount: number;
    retweetCount: number;
    likeCount: number;
};

const FeedItem = ({
    pfp,
    username,
    content,
    image,
    name,
    replyCount,
    retweetCount,
    likeCount,
}: Props) => {
    return (
        <div className="border p-4 gradient-border-primary-dark-bg w-full flex gap-4">
            {pfp && <img src={pfp} alt="pfp" className="rounded-full h-12 w-12 " />}
            <div className="col-span-5 ">
                <p className="font-medium mb-1">
                    {name} <span className="text-zinc-400 text-sm">@{username} </span>
                </p>
                <p className="text-zinc-200 mb-4">{content}</p>
                <div className="">{image && <img src={image} className="w-full rounded-xl" />}</div>
                <div className="flex text-zinc-400 items-center mt-4 gap-4">
                    <button className="light-hover-btn">
                        <ChatIcon />
                        {replyCount}
                    </button>
                    <button className="light-hover-btn ">
                        <RetweetIcon /> {retweetCount}
                    </button>
                    <button className="light-hover-btn">
                        <HeartIcon /> {likeCount}
                    </button>
                    <button className="light-hover-btn">
                        <ShareIcon className="" /> Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedItem;
