import React from 'react';
import SettingsIcon from '../../../../../icons/SettingsIcon';
import TrendItem from './TrendItem';

type Props = {};

const Trends = (props: Props) => {
    return (
        <div className="border m-4 flex flex-col gradient-border-primary-light-bg rounded-xl overflow-hidden ">
            <h1 className="px-4 flex justify-between items-center py-2 font-semibold text-lg">Trends For You <SettingsIcon className='cursor-pointer'/></h1>
            <TrendItem text='#PRNTs' tweetCount={5000}/>
            <TrendItem text='#NFT' place='USA' tweetCount={3000}/>
            <TrendItem text='#NFT' place='USA' tweetCount={3000}/>  
            <div className="border-t px-4 py-2 gradient-border-primary-light-bg">
                <button className=" text-primary font-medium">Show More</button>
            </div>
        </div>
    );
};

export default Trends;
