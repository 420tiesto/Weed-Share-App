import React from 'react'

interface Props {
  imgSrc: string
  name:string 
  username:string
}

const ProfileInfo:React.FC<Props> = ({imgSrc,name,username}) => {
  return (
    <div className='inline-flex items-center justify-center gap-4'>
    <img src={imgSrc} alt='pfp' className='rounded-full object-center object-cover h-20 w-20' />
    <div className='flex-col'>
        <p className='font-bold'>{name}</p>
        <p className='text-green-500'>@{username}</p>
    </div>
    </div>
  )
}

export default ProfileInfo