import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import axios from 'axios';

export const ChatContext = createContext();
export const ChatContextProvider = function ({ children }) {
    const [users,setUsers]=useState([]);
    const [selectedUser,setSelectedUser]=useState('');
    const [messages,setMessages]=useState([]);
    const [unseenMessage,setUnseenMessage]=useState([]);
    const {user,getOnlineUsers,token,socket}=useContext(AuthContext);
     //function to get list of all users
    const getUsers=async()=>
    {
     try {
        console.log("hello");
        const {data}=await axios.get("/user/getalluser");
         console.log(data);
        if(data.success)
        {
        console.log(data.users);
          setUsers(data.users);
          setUnseenMessage(data.seenLength);
        }
        else
        {
            toast.error(data.error);
        }
     } catch (error) {
        console.log(error);
        toast.error(error.message);
     }
    }
    
    //function to get messages of specific users
    const getMessage=async(userId)=>
        {
            try {
                const {data}=await axios.get(`/message/getmessage/${userId}`); 
                if(data.success)
                {
                    setMessages(data.message);
                }
                else
                {
                    toast.error("error while fetching chats");
                }
            } catch (error) {
                toast.error(error.message); 
            }
        }  
        //function to send message to selected user
        const sendMessage=async(content)=>
        {
         const {data}=await axios.post(`/message/sendmessage/${selectedUser._id}`,content, {headers: { "Content-Type": "multipart/form-data" }});
         if(data.success)
         {
            setMessages((prevmessage)=>[...prevmessage,data.newmessage]);
         }
        }
        //function to subscribe to messages for selected user
        const subscribeToMessages=async()=>
        {
           if(!socket)
            return;
            socket.on("newMessage",(newMessage)=>
            {
                if(selectedUser && newMessage.senderId==selectedUser._id)
                {
                    newMessage.seen=true;
                    setMessages((prevmessage)=>[...prevmessage,newMessage]);
                    axios.post(`/message/markAsSeen/${newMessage._id}`);
                }
                else
                {
                    setUnseenMessage((prevUnseenMessage)=>(
                        {
                            ...prevUnseenMessage,[newMessage.senderId]:prevUnseenMessage[newMessage.senderId]?prevUnseenMessage[newMessage.senderId]+1:1
                        }
                    ))
                }
            })
        }
        //function to unsubscribe from messages
        const unSubscribeToMessages=async()=>
        {
            if(socket)
            {
                socket.off("newMessage");
            }
        }
        useEffect(()=>
        {
         subscribeToMessages();
         return ()=>{unSubscribeToMessages()}
        },[socket,selectedUser])

    const values = {
        users,selectedUser,unseenMessage,setSelectedUser,messages,getMessage,sendMessage,getUsers,setUnseenMessage,axios
    };
    return (
        <ChatContext.Provider value={values}>
            {children}
        </ChatContext.Provider>
    );
}