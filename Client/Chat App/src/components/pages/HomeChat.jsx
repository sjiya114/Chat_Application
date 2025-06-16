import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function HomeChat() {
  return (
   <>
   <div className='flex flex-row'>
    <Sidebar/>
    {screen.width>800 && <Outlet/> }
   </div>
   </>
  )
}

export default HomeChat
