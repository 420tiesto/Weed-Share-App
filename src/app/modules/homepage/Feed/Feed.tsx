import React from 'react';
import FeedItem from './FeedItem';
import NewTweetInput from './NewTweetInput';

type Props = {};

const Feed = (props: Props) => {
    return (
        <div className="w-full md:max-w-screen-sm bg-zinc-900 flex-1 p-4 space-y-4">
            <h1 className='text-2xl backdrop-blur-xl  top-0 w-full'>Home</h1>
            <NewTweetInput/>
            <FeedItem
                name="Adarsh Patel"
                username="adarsh"
                pfp="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
                content="Hello people of prnts. Excited to start my journey here"
                image="https://images.unsplash.com/photo-1638913974023-cef988e81629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                likeCount={65}
                retweetCount={23}
                replyCount={21}
                />
               <FeedItem
                name="Adarsh Patel"
                username="adarsh"
                pfp="https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg"
                content="hello Hello , this is a test tweet"
                likeCount={12}
                retweetCount={3}
                replyCount={4}
            />
                </div>
        
    );
};

export default Feed;
