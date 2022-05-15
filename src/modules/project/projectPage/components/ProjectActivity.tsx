import React from 'react'
import ActivityItem from './ActivityItem'

type Props = {}

const ProjectActivity = (props: Props) => {
  return (
    <div className='p-8 grid gap-6 sunken-element'>
      <h6 className='font-bold text-2xl'>Activity</h6>
      <ActivityItem/>
      <ActivityItem/>
    </div>
  )
}

export default ProjectActivity