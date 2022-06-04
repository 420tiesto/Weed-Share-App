import React from 'react'
import NewsFeedItem from './NewsFeedItem'

type Props = {}

const FollowItem = (props: Props) => {
  return (
    <NewsFeedItem type='Follow' title={`Harrish has started following Aravinthan`} />
  )
}

export default FollowItem