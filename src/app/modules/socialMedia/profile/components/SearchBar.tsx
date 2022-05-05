import React from 'react'
import SearchIcon from '../../../../icons/SearchIcon'

type Props = {}

const SearchBar = (props: Props) => {
  return (
    <div className='relative bg-gray-700 mx-4 focus:bg-gray-600  overflow-hidden rounded-full'>
      <SearchIcon className=' stroke-current text-white  absolute left-4 top-3'/>
      <input placeholder='Search Something ' className=' flex-1 hover:bg-gray-600 focus:bg-gray-500 duration-300 ease-out focus:shadow-xl shadow-lg w-full h-full px-4 py-2 pl-10' />
      </div>
  )
}

export default SearchBar