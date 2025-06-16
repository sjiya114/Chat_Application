import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import helper from '../../assets/helper.svg'
import userIcon from '../../assets/userIcon.svg'
import uploadArea from '../../assets/uploadArea.svg'
import sendButton from '../../assets/sendButton.svg'
import { ChatContext } from '../../Context/ChatContext';
import { AuthContext } from '../../Context/AuthContext';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
function ChatSection() {
    const [content,setContent]=useState("");
    const [image,setImage]=useState("");
     const nav=useNavigate();
    const {messages,selectedUser,setSelectedUser,getMessage,sendMessage}=useContext(ChatContext);
    const {user,setUser,onlineUsers}=useContext(AuthContext);
    const [input,setInput]=useState("");
    const scrollEnd=useRef();
    let fileInput=useRef();

    const handleSendMessage=async(e)=>
    {
        e.preventDefault();
        console.log(image);
        if(input.trim()==="" && image===null)
            return null;
        const formData=new FormData();
        formData.append("text",input.trim());
        formData.append("image",image);
        await sendMessage(formData);
        setInput("");
        setImage(null);
        fileInput.current=null;
    }
    useEffect(()=>{
        if(selectedUser)
         getMessage(selectedUser._id);
    },[selectedUser])
    useEffect(()=>
    {
     if(scrollEnd.current && messages)
     {
        scrollEnd.current.scrollIntoView({behaviour:"smooth"});
     }
    },[messages])

    return selectedUser ? (
        <>
            <div className='h-screen w-1/2  relative text-white  max-lg:w-full  '>
                <div className='flex items-centers justify-between gap-3 mx-4 py-3'>
                    <div className='flex flex-row space-x-2'>
                        <img  onClick={()=>{nav("/profile",{messages:messages})}} className="w-8 h-8 rounded-full" src={selectedUser.profile} alt="" />
                        <div className='flex flex-row'>
                            <p className=' text-xl'>{selectedUser.name} <span className='pl-5 text-yellow-200  '> {onlineUsers.includes(selectedUser._id)?"Online":"Offline"}</span></p>
                            <span className='bg-green-700 mt-3 ml-2  rounded-full w-2 h-2'></span>
                        </div>
                    </div>
                    <div>
                        <img src={helper} className='w-7 h-7' alt="helper icon" />
                    </div>
                </div>
                <hr className=' mx-4 my-4' />
                <div className='flex pt-4 flex-col overflow-y-scroll h-[calc(100%-160px)] space-y-5 pb-6 px-4'>
                    {messages.map((message, index) => (
                            <div key={index} className={`flex items-end justify-end gap-2 ${message.senderId !== user._id? 'flex-row-reverse' : ''} `}>
                                {message.image ? <>
                                    <img src={message.image} alt="image" className='w-50 h-50 rounded-lg border-white border-1' />
                                </> :
                                    <p className='px-2 py-1 rounded-lg bg-blue-600 text-white'>{message.text}</p>
                                }
                                <div className='flex flex-col'>
                                   <img src={`${message.senderId!==user._id?selectedUser.profile:user.profile}`} className='w-8 h-8 rounded-full' alt="" /> 
                                   <p className='text-xs text-gray-500'>{new Date(message.createdAt).toISOString().split("T")[1].substring(0,5)   }</p>
                                </div>
                            </div>
                    ))

                    }
                    <div ref={scrollEnd}></div>
                </div>
                <div className='absolute left-0 right-0 bottom-0 mb-5 w-full flex items-center gap-3 p-3'>
                    <form className='flex flex-row space-x-10'  encType='multipart/form-data'>
                    <div className='flex1 flex items-center w-full  text-white  bg-blue-950 px-3 rounded-full'>
                        <input type="text" onChange={(e)=>{setInput(e.target.value)}}  onKeyDown={(e)=>{e.key==="enter"?handleSendMessage(e):null}}    name='content' value={input}  className='flex-1 text-sm p-3' placeholder='Send a message' />
                        <input type="file" ref={fileInput} onChange={(e)=>{setImage(e.target.files[0])}} id='image' name='image'  />
                        <label htmlFor="image">
                            <img src={uploadArea} className='w-7 mr-2'  alt="icon" />
                        </label>
                    </div>
                       <button onClick={handleSendMessage}  ><img src={sendButton} className='w-10 h-10' alt="send" /></button> 
                       </form>
                </div>

            </div>

        </>
    ) : (
        <>
            <div className='flex w-full bg-black text-white justify-center items-center'>
                <h1>Start a new Chat</h1>
            </div>
        </>
    );
}

export default ChatSection
