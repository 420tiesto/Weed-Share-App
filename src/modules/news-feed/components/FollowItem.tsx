import React from 'react'
import NewsFeedItem from './NewsFeedItem'

type Props = {}

const FollowItem = (props: Props) => {
  return (
    <NewsFeedItem type='Follow' title={`Harrish has started following Aravinthan`} pfpSrc='https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg' />
  )
}

export default FollowItem