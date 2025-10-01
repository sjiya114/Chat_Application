import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const BACKEND_URL =import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = BACKEND_URL;
export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  const nav=useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  //check if user is authenticated and if so set the user data and connect the socket
  const checkauth = async () => {
    try {
      const { data } = await axios.get("/user/checkuser");
      if (data.success) {
        setUser(data.user);
        connectsocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  //connect socket function to handle socket connection and online users updates
  const connectsocket = (userdata) => {
    if (!userdata || socket?.connected)
      return;
    const newSocket = io(BACKEND_URL, {
      query: {
        userId: userdata._id
      }
    })
    newSocket.connect();
    setSocket(newSocket);
    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    })
  }
  const logOut = () => {
      nav("/");
    localStorage.clear("token");
    localStorage.clear("user");
    setToken(null);
    setUser(null);
    setOnlineUsers([]);
    toast.success("logged out successfully");
    socket.disconnect();
  }
  const login = async (state, credentials) => {
    try {
        console.log(credentials);
        const { data } = await axios.post(`/user/login`, credentials,  {headers: { "Content-Type": "application/json" }});
        console.log(data);
        if (data.success) {
        toast.success(data.message);
        setUser(data.user);
         localStorage.setItem("user", data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        console.log(user);
        nav("/home");
      }
      else {
        toast.error(data.error || "error while logging user");
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }
 const signup=async(credentials)=>
 {
  try {
    console.log("hello"+credentials);
     const { data } = await axios.post(`/user/signup`, credentials,  {headers: { "Content-Type": "multipart/form-data" }});
       console.log("hello");   
     if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        localStorage.setItem("user", data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        nav("/home");
      }
      else {
        toast.error(data.error);
      }
  } catch (error) {
    toast.error(error.message);
  }
 }
  useEffect(()=>{
     if(token)
    {
      axios.defaults.headers.common["token"]=token;
    }
    checkauth();
},[]);

  const values = { token, setToken, user, setUser, onlineUsers, setOnlineUsers, socket, setSocket, logOut, login ,signup};
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}
