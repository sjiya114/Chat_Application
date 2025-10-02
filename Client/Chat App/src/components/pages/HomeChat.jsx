import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function HomeChat() {
  return (
   <>
    <div className="flex flex-row h-screen">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Chatbox (Outlet) visible only on md+ screens */}
      <div className="hidden lg:flex flex-1">
        <Outlet />
      </div>
    </div>
   </>
  )
}

export default HomeChat
