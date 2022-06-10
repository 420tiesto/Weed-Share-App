import React, { ButtonHTMLAttributes } from 'react'

interface MenuAccountItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  imgSrc:string
  username:string
  isCurrent?:boolean
}

const MenuAccountItem = ({imgSrc,username,isCurrent=false}: MenuAccountItemProps) => {
  return (
    <button className='inline-flex items-center gap-2 px-4 py-2 hover:brightness-125'>
      <img src={imgSrc} alt="pfp" className={`${isCurrent && 'ring-2 ring-primary'} rounded-full h-8 w-8`} />
      {username}
    </button>
  )
}

export default MenuAccountItem