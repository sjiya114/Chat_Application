import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext'
import { useLocation } from 'react-router-dom';
function Profile() {
  const {logOut,user}=useContext(AuthContext);
const {messages}=useLocation();
console.log("message"+messages);
const handleLogOut=(e)=>
{
e.preventDefault();
logOut();
}

  return (
   <>
     <div className='bg-transparent flex flex-col justify-center items-center w-full max-lg:h-full h-screen'>
      <div className='flex flex-col pt-20 space-y-2 text-white justify-center items-center'>
         <img className='rounded-full w-40 h-40 bg-cover' src={user.profile}  alt="profile" />
          <h1 className='font-bold text-white '>{user.name}</h1>
          <p className='text-white'>{user.bio}</p>
      </div>
        <hr className='text-white my-6'/>
      <div className='flex flex-col h-full overflow-y-scroll px-10'>
       <h1 className='font-bold text-white'>Media</h1>
       <div className='flex flex-row flex-wrap space-x-6 space-y-5'>
          {messages.map((message,index)=>(
         <img key={index} src={message.image} className='w-[250px] h-[200px] rounded-lg' alt="image" />))}
       </div>
      </div>
        <button onClick={handleLogOut} className='bg-blue-900 my-4 text-white text-sm px-6 w-fit py-4 rounded-lg font-bold'>LogOut</button>
     </div>
   
   </>
  )
}

export default Profile
