import React from 'react';
import BellIcon from '../../../app/icons/BellIcon';
import BookmarkIcon from '../../../app/icons/BookmarkIcon';
import HashTagIcon from '../../../app/icons/HashTagIcon';
import HomeIcon from '../../../app/icons/HomeIcon';
import InboxIcon from '../../../app/icons/InboxIcon';
import ListIcon from '../../../app/icons/ListIcon';
import ProfileIcon from '../../../app/icons/ProfileIcon';
import ThreeDotsIcon from '../../../app/icons/ThreeDotsIcon';
import SidebarItem from './SidebarItem';

type Props = {};

const Sidebar: React.FC<Props> = (props: Props) => {
    return (
        <div className="hidden sticky top-0 md:flex flex-col px-4 left-0 py-4 h-screen max-w-[280px] w-full">
            {/* Logo */}
            <img src="/prnts-logo.svg" alt="logo" className="pl-8 h-10 max-w-fit" />
            {/* Sidebar Items */}
            <div className="text-lg space-y-2.5 mt-4 mb-2.5 flex-grow">
                <SidebarItem icon={HomeIcon} text="Home" href="#" />
                <SidebarItem icon={HashTagIcon} text="Explore" href="#" />
                <SidebarItem icon={BellIcon} text="Notifications" href="#" />
                <SidebarItem icon={InboxIcon} text="Messages" href="#" />
                <SidebarItem icon={BookmarkIcon} text="Bookmarks" href="#" />
                <SidebarItem icon={ListIcon} text="Lists" href="#" />
                <SidebarItem icon={ProfileIcon} text="Profile" href="#" />
                <button className="bg-primary w-full hover:brightness-125 font-medium duration-300 ease-out text-zinc-900 px-6 py-2 rounded-full text-lg">
                    Tweet
                </button>
            </div>
            <div className="flex gradient-border-secondary-light-bg border rounded-full px-4 py-2 gap-2 items-center ">
                <img
                    src="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
                    alt=""
                    className="bg-zinc-600 rounded-full h-8 w-8 "
                />
                <div className="flex-grow text-sm">
                    <p className="font-medium">Full Name</p>
                    <p className="text-zinc-500 ">@username</p>
                </div>
                <button className="light-hover-animation">
                    <ThreeDotsIcon className="stroke-current fill-current text-white " />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
