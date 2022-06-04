import React from 'react'
import NewsFeedItem from './NewsFeedItem'

type Props = {}

const JoinedItem = (props: Props) => {
  return (
    <NewsFeedItem type='Joined' title={`Harrish has joined Aravinthans Project`} pfpSrc='https://pbs.twimg.com/profile_images/1491044018926796805/uBM0c32A_400x400.jpg  ' />
  )
}

export default JoinedItem;