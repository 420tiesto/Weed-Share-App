import React from 'react'
import { Card, CardBody } from '../../../app/components/common-ui/atoms/Card'
import NewsFeedItem from './NewsFeedItem'

type Props = {}

const PostItem = (props: Props) => {
  return (
    <NewsFeedItem type="Post" title={`Harrish created a new project`}>
            <Card variant="elevated" rounded="2xl" className='overflow-hidden'>
                <div className='flex gap-4 items-center'>
                    <div className="max-w-[140px] h-[140px] flex-1 bg-gray overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1654260081942-fe55497944e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="h-full w-full object-center object-cover" />
                    </div>
                    <div className="flex-1">
                        <p className="text-white/30 ">soundcloud.com</p>
                        <p className="font-bold mb-1">Cold Heart (PNAU Remix) by Elton John & Dua Lipa</p>
                        <p className="text-white/30 mb-4 max-w">
                            Sed ut perspiciatis unde omnis iste natus error sit...
                        </p>
                    </div>
                </div>
            </Card>
                <p className='text-white/30'>11:37 AM Jun 4, 2022 </p>
        </NewsFeedItem>
  )
}

export default PostItem