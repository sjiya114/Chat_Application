import React, { useState } from 'react'

function RightBar() {
    const [selectedUser,setSelectedUser]=useState('');
  return selectedUser && (
    <div>
       <div>
         <img src="" alt="" />
       </div>
    </div>
  )
}

export default RightBar
