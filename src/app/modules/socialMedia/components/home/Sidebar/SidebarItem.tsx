import React from 'react'

type Props = {
  text:string
  href:string
  icon?: any
}

const SidebarItem = ({text,href,icon:Icon}: Props) => {
  return (
    <a href={href} className="light-hover-animation flex items-center gap-4 px-6 py-2 rounded-full text-zinc-300 hover:text-white">
     <Icon className='h-6 w-6' />  {text}
    </a>
  )
}

export default SidebarItem