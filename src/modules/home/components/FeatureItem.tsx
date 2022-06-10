import React from 'react'

type Props = {
  title:string
  imgSrc:string
  description:string
}

const FeatureItem = ({title,imgSrc,description}: Props) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <img src={imgSrc} alt={title} className='h-[100px] w-[100px]' />
      <h6 className='font-medium text-2xl mb-4'>{title}</h6>
      <p className='text-white/70'>{description}</p>
    </div>
  )
}

export default FeatureItem