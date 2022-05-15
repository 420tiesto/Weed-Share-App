import React from 'react';
import ThreeDotsIcon from '../../../app/icons/ThreeDotsIcon';

type Props = {
    place?: string;
    text: string;
    tweetCount?: number;
};

const TrendItem = (props: Props) => {
    return (
        <div className=" px-4 py-2 text-gray-400 text-xs gradient-border-primary-light-bg  border-t">
            <p className="flex items-center justify-between">
                {' '}
                Trending in {props.place}{' '}
                <ThreeDotsIcon className="stroke-current cursor-pointer" />{' '}
            </p>
            <p className="text-sm text-white font-medium leading-relaxed"> {props.text} </p>
            <p> {props.tweetCount} Tweets </p>
        </div>
    );
};

export default TrendItem;
