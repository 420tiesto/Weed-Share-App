import React from 'react'
import SearchIcon from '@heroicons/react/outline/SearchIcon'

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <div className='relative  mx-4 bg-black brightness-150  overflow-hidden rounded-full'>
      <SearchIcon className='h-5 w-5 text-white    absolute left-4 top-3'/>
      <input placeholder='Search Something ' className='flex-1 text-white  duration-300 ease-out focus:shadow-xl shadow-lg w-full h-full px-4 py-2 pl-10' />
      </div>
  )
}

export default SearchBar