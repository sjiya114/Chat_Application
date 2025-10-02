import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import searchicon from '../../assets/searchIcon.svg'
import bgimage from '../../assets/bgimage.png'
import { ChatContext } from '../../Context/ChatContext'
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom'
function Sidebar() {
  const { selectedUser, users, getUsers, setSelectedUser, unseenMessage, setUnseenMessage } = useContext(ChatContext);
  const { logOut, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [open,setOpen]=useState(false);
  const nav=useNavigate();
  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  const filteredUsers = users.filter((element) =>
    ((element.name.toLowerCase()).includes(input.toLowerCase()))
  )

  return (
    <div className='flex flex-col max-lg:w-full h-screen  space-y-2 overflow-y-scroll w-1/2  text-white '>
      {/* logo */}
      <div className='pt-2 mx-2 max-lg:w-full fixed w-1/2 flex flex-row justify-between'>
        <img src={bgimage} className='w-60' alt="logo" />
       <svg onClick={()=>{setOpen(!open)}}   xmlns="http://www.w3.org/2000/svg" className='w-10 absolute right-0  h-10 mr-6' viewBox="0 0 24 24" fill="white"><path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path></svg>
        {open && <div>
          <p onClick={logOut} className='text-black bg-white font-bold rounded-lg mr-10 px-2 mt-9 py-1'>LogOut</p>
        </div>
       }
      </div> 

      <div className='mb-6 max-md:px-1 px-4 mt-24'>
        {/* searchbar */}
        <button className='flex flex-row w-full max-md:w-screen max-md:px-0 border-white border-1 placeholder:text-white rounded-2xl px-2 py-2 text-white'>
          <img src={searchicon} alt="" />
          <input onChange={(e) => { setInput(e.target.value) }} type='text' placeholder='Search'></input>
        </button>
      </div>
      <div className='flex px-6 flex-col  space-y-5'>
        {/* chats */}
        {filteredUsers.map((data, index) =>
        (
          <div key={index} onClick={(e) => { setSelectedUser(data);
            nav("/chatbox")
         }} 
          className='flex cursor-pointer flex-row space-x-4'>
            <div>
              <img className='w-12 h-12 rounded-full' src={data.profile} alt="userprofile" />
            </div>
            <div className='flex flex-col'>
              <p>{data.name}</p>
              <p className={`${onlineUsers.includes(data._id) ? 'text-green-500' : 'text-white'}`}>{onlineUsers.includes(data._id) ? "Online" : "Offline"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
