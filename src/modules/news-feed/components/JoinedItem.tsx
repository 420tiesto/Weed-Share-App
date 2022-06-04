import React from 'react'
import NewsFeedItem from './NewsFeedItem'

type Props = {}

const JoinedItem = (props: Props) => {
  return (
    <NewsFeedItem type='Joined' title={`Harrish has joined Aravinthans Project`} />
  )
}

export default JoinedItem;