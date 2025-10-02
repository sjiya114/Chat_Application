import { useContext, useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Sidebar from './components/pages/Sidebar'
import Home from './components/Home'
import { Routes,Route, Outlet, useNavigate } from 'react-router-dom'
import ChatSection from './components/pages/ChatSection'
import Profile from './components/Profile'
import Toaster from 'react-hot-toast';
import { AuthContext } from './Context/AuthContext'
import HomeChat from './components/pages/HomeChat'
function App() {
  const {user,token}=useContext(AuthContext);
  const nav=useNavigate();
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        {token?<Route path='/sidebar' element={user && <HomeChat/>}>
        </Route>:nav("/")}
        {token?<Route path='/chatbox' element={user && <ChatSection/>}  />:nav("/")}
       {token? <Route path='/profile' element={user && <Profile/>}/>:nav("/")}
      </Routes>
    </>
  )
}

export default App
