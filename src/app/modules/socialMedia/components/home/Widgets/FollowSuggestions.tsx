import React from 'react';
import FollowSuggestionItem from './FollowSuggestionItem';

type Props = {};

const FollowSuggestions = (props: Props) => {
    return (
        <div className="m-4 gradient-border-tl-primary-light-bg border rounded-xl space-y-4 p-4 py-2 ">
            <h2 className='text-lg font-semibold '>Whom to follow </h2>
            <FollowSuggestionItem name='PRNTS' username='prnts' pfp="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"/>
            <button className='text-primary text-lg  font-semibold'>Show More</button>
        </div>
    );
};

export default FollowSuggestions;
