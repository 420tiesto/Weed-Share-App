import { ChatIcon, UserGroupIcon } from '@heroicons/react/solid'
import { DotsVerticalIcon } from '@heroicons/react/solid'
import React from 'react'
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card'
import PlayIcon from '../../../app/icons/PlayIcon'
import NewsFeedItem from './NewsFeedItem'

type Props = {}

const SharedItem = (props: Props) => {
  return (
    <NewsFeedItem type="Share" pfpSrc='https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg' title={`Harrish shared Arivanthans project`}>
    <Card variant="elevated" rounded="2xl">
        <CardBody padding={6} className="flex items-center gap-8">
            <div className="h-[200px] w-[240px] elevated-element rounded-2xl bg-gray overflow-hidden border-2 ">
                <img src="https://images.unsplash.com/photo-1654260081942-fe55497944e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="h-full w-full object-center object-cover" />
            </div>
            <div className="flex-1">
                <p className="text-white/30 mb-1">coldinnerfire</p>
                <p className="text-3xl font-bold mb-1">Cold Inner Fire</p>
                <p className="text-white/50 mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit...
                </p>
                <div className="flex items-center text-white/30 gap-6">
                    <button className='flex items-center gap-2'>
                        <UserGroupIcon className="h-5 w-5" /> 5k
                    </button>
                    <button className='flex items-center gap-2'>
                        <ChatIcon className="h-5 w-5" /> 6
                    </button>
                    <button>
                        <DotsVerticalIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            <button className="flex mr-4 hover:scale-105 duration-200 ease-out items-center justify-center h-14 w-14 rounded-full elevated-element">
                <PlayIcon className="relative left-1" />
            </button>
        </CardBody>
    </Card>
</NewsFeedItem>
  )
}

export default SharedItem