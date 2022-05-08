import React from 'react';
import HeartIcon from '../../../../icons/HeartIcon';

interface CardItemProps {
    imgSrc: string;
    text: string;
    subText: string;
    likeCount: number;
}

const CardItem = ({ imgSrc, text, subText, likeCount }: CardItemProps) => {
    return (
        <div className="elevated-element hover:scale-105 duration-200 ease-out cursor-pointer flex max-w-[260px]  flex-col rounded-3xl overflow-hidden">
            <div className="h-[200px] ">
                <img src={imgSrc} alt={text} className="h-full object-cover object-center" />
            </div>
            <div className="p-4 shadow-bottom">
                <p className="text-gray-500 text-sm font-medium">{subText}</p>
                <p className="font-semibold">{text}</p>
            </div>
            <button className="flex items-center gap-2 justify-end p-4">
                <HeartIcon />
                {likeCount}
            </button>
        </div>
    );
};

export default CardItem;
