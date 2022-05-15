import { HeartIcon } from '@heroicons/react/outline';
import React from 'react';
import { Card } from '../../../app/components/common-ui/atoms/Card';

interface CardItemProps {
    imgSrc: string;
    text: string;
    subText: string;
    likeCount: number;
}

const CardItem = ({ imgSrc, text, subText, likeCount }: CardItemProps) => {
    return (
        <Card variant="elevated" rounded="2xl" className="max-w-[280px]">
            <div className="h-[200px]">
                <img src={imgSrc} alt={text} className="h-full object-cover object-center" />
            </div>
            <div className="p-4 shadow-bottom">
                <p className="text-slate-500 text-sm font-medium">{subText}</p>
                <p className="font-semibold">{text}</p>
            </div>
            <button className="flex w-full items-center gap-2 justify-end p-4">
                <HeartIcon className="h-6 w-6" />
                {likeCount}
            </button>
        </Card>
    );
};

export default CardItem;
