import React, { useState } from 'react';
import CalendarIcon from '../../../../../icons/CalendarIcon';
import EmojiIcon from '../../../../../icons/EmojiIcon';
import GifIcon from '../../../../../icons/GifIcon';
import ImageIcon from '../../../../../icons/ImageIcon';
import StatsIcon from '../../../../../icons/StatsIcon';

type Props = {};

const NewTweetInput = (props: Props) => {
    // get currentUserPfp src from user state
    const currentUserPfp =
        'https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg';
    // New Tweet States
    const [textContent, setTextContent] = useState('');
    const [imgContent, setImgContent] = useState('');

    return (
        <div className="border gradient-border-primary-dark-bg p-4 flex gap-4 ">
            <img src={currentUserPfp} alt="" className="h-12 w-12 rounded-full" />
            <div className="flex-grow">
                <input
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    id=""
                    placeholder="What's Happening ?"
                    className="text-xl flex flex-wrap w-full"
                />
                <div className="flex items-center justify-between border-zinc-600 w-full mt-2 pt-2">
                    <div className="space-x-2 gradient-border-secondary-dark-bg border rounded-full px-4 py-1 ">
                        <button className="primary-light-hover-animation p-2 rounded-full">
                            <ImageIcon />
                        </button>
                        <button className="primary-light-hover-animation p-2 rounded-full">
                            <GifIcon />
                        </button>
                        <button className="primary-light-hover-animation p-2 rounded-full">
                            <StatsIcon />
                        </button>
                        <button className="primary-light-hover-animation p-2 rounded-full">
                            <EmojiIcon />
                        </button>
                        <button className="primary-light-hover-animation p-2 rounded-full">
                            <CalendarIcon />
                        </button>
                    </div>
                    <button
                        disabled
                        className="bg-primary cursor-pointer hover:brightness-125 font-medium duration-300 ease-out text-zinc-900 px-6 py-2 rounded-full ">
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewTweetInput;
