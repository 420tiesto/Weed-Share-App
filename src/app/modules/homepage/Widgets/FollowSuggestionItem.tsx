import React from 'react'

type Props = {
  pfp:string;
  username:string;
  name:string;
}

const FollowSuggestionItem = (props: Props) => {
  return (
    <div className='flex items-center justify-between'>
      <img src={props.pfp} alt="" className='h-12 w-12 ring-1 ring-white rounded-full' />
      <div className='flex-grow pl-4'>
        <p className='font-medium'>{props.name}</p>
        <p className='text-zinc-400'>@{props.username}</p>
      </div>
    <button className='text-black bg-white rounded-full px-3 py-1'>Follow</button>
    </div>
  )
}

export default FollowSuggestionItem