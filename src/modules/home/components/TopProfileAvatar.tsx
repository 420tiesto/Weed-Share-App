import React from 'react';
import { Link } from 'react-router-dom';

export interface TopProfileAvatarProps {
    imgSrc: string;
    name: string;
    handle: string;
}

const TopProfileAvatar: React.FC<TopProfileAvatarProps> = ({ imgSrc, name, handle }) => {
    return (
        <Link to={`/handle/${handle}`}>
            <div className='cursor-pointer'>
                <div className="bg-dark-gray rounded-full elevated-element h-56 w-56 p-2">
                    <img
                        src={imgSrc}
                        alt={name}
                        className="rounded-full object-cover object-center h-full w-full"
                    />
                </div>
                <p className="font-medium text-center text-xl mt-1">{name}</p>
            </div>
        </Link>
    );
};

export default TopProfileAvatar;
