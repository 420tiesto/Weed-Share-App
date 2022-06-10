import { HeartIcon } from '@heroicons/react/outline'
import React from 'react'

type Props = {
  likes:number
  imgSrc:string
}

const BudImageCard = ({likes,imgSrc}: Props) => {
  return (
    <div className='rounded-2xl flex flex-col sunken-element max-w-[480px]  overflow-hidden'>
      <img className='max-h-[400px] ' src={imgSrc} alt="project-image" />
      <div className='flex items-center gap-2 py-4 px-8 justify-end '>
      <HeartIcon className='h-6 w-6'/> 
        {likes}        
      </div>
    </div>
  )
}

export default BudImageCard