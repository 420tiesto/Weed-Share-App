import React from 'react';

export type NewsTypes = "NewBud" | "Follow" | "Share" | "Bought" | "Post";

const NewsCategoryTag:React.FC<{type:NewsTypes}> = ({type="Post"}) => {
  if(type === 'NewBud'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-blue-400 bg-dark-black">
            <div className="h-3 w-3 rounded-full bg-blue-400" />
            New Bud
        </div>
    );
  } 
  if(type === 'Follow'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-pink-400 bg-dark-black">
            <div className="h-3 w-3 rounded-full bg-pink-400" />
            Follow
        </div>
    );
  }
  if(type === 'Share'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-purple-400 bg-dark-black">
            <div className="h-3 w-3 rounded-full bg-purple-400" />
            Share
        </div>
    );
  } 
  if(type === 'Bought'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-green-400 bg-dark-black">
            <div className="h-3 w-3 rounded-full bg-green-400" />
            Bought
        </div>
    );
  }   
  if(type === 'Post'){
    return (
      <div className="absolute right-10 -top-4 flex gap-2 p-1 px-3 items-center border-[2px] rounded-md border-yellow-400 bg-dark-black">
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            Post
        </div>
    );
  }   
  return <div></div>
};

export default NewsCategoryTag;