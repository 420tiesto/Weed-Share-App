import React from 'react'
import NewsFeedItem from './NewsFeedItem'

type Props = {
  from:string
  to:string
  pfpSrc:string
}

const JoinedItem = ({from,to,pfpSrc}: Props) => {
  return (
    <NewsFeedItem type='Joined' title={`${from} has joined ${to}'s Project`} pfpSrc={pfpSrc} />
  )
}

export default JoinedItem;