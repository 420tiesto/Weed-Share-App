import React from 'react'

type Props = {
  imgSrc:string
}

const Avatar = ({imgSrc}: Props) => {
  return (
    <div className='h-32 w-32 bg-gray-700 ring ring-white rounded-full overflow-hidden'>
    <img src={imgSrc} alt="profile-picture" className=''/>
    </div>
  )
}

export default Avatar