import React from 'react'

type Props = {
  imgSrc:string
}

const Avatar = ({imgSrc}: Props) => {
  return (
    <div className=' bg-black-700 ring ring-white rounded-full overflow-hidden'>
    <img src={imgSrc} alt="profile-picture" className='h-32 w-32 object-cover object-center'/>
    </div>
  )
}

export default Avatar