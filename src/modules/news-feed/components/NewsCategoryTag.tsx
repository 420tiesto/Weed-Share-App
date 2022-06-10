import React from 'react';

export type NewsTypes = "NewProject" | "Follow" | "Share" | "Joined" | "Post";

const NewsCategoryTag:React.FC<{type:NewsTypes}> = ({type="Post"}) => {
  if(type === 'NewProject'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-blue-400 bg-dark-gray">
            <div className="h-3 w-3 rounded-full bg-blue-400" />
            New Project
        </div>
    );
  } 
  if(type === 'Follow'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-pink-400 bg-dark-gray">
            <div className="h-3 w-3 rounded-full bg-pink-400" />
            Follow
        </div>
    );
  }
  if(type === 'Share'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-purple-400 bg-dark-gray">
            <div className="h-3 w-3 rounded-full bg-purple-400" />
            Share
        </div>
    );
  } 
  if(type === 'Joined'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-green-400 bg-dark-gray">
            <div className="h-3 w-3 rounded-full bg-green-400" />
            Joined
        </div>
    );
  }   
  if(type === 'Post'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-yellow-400 bg-dark-gray">
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            Post
        </div>
    );
  }   
  return <div></div>
};

export default NewsCategoryTag;