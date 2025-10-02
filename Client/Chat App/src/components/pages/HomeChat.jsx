import React from 'react'
import Sidebar from './Sidebar'

function HomeChat() {
  return (
   <>
    <div className="flex flex-row">
      {/* Sidebar always visible */}
      <div className='w-1/2'>
         <Sidebar />
      </div>
      <div className='w-1/2'>

      </div>
    </div>
   </>
  )
}

export default HomeChat
