import React from 'react'
import Sidebar from './pages/Sidebar'
import ChatSection from './pages/ChatSection'
import RightBar from './pages/RightBar'
import Profile from './Profile'

function Home() {
  return (
    <>
     <div className='flex flex-row w-full h-screen'>
       <Sidebar/>
       <ChatSection/>
     </div>
    
    
    
    </>
  )
}

export default Home
