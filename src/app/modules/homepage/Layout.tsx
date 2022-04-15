import React from 'react'
import Feed from './Feed/Feed'
import Sidebar from './Sidebar/Sidebar'
import Widgets from './Widgets/Widgets'

type Props = {
  children:React.ReactNode 
}

const Layout = (props: Props) => {
  return (
    <div className="App">
      <Sidebar/>
      <Feed/>
      <Widgets/>
    </div>
  )
}

export default Layout