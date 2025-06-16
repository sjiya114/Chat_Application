import { useContext, useState } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Sidebar from './components/pages/Sidebar'
import Home from './components/Home'
import { Routes,Route, Outlet } from 'react-router-dom'
import ChatSection from './components/pages/ChatSection'
import Profile from './components/Profile'
import Toaster from 'react-hot-toast';
import { AuthContext } from './Context/AuthContext'
import HomeChat from './components/pages/HomeChat'
function App() {
  const {user}=useContext(AuthContext);
  return (
    <>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/sidebar' element={user && <HomeChat/>}>
          <Route path='/sidebar/chatbox' element={user && <ChatSection/>} />
        </Route>
        <Route path='/chatbox' element={user && <ChatSection/>}  />
        <Route path='/profile' element={user && <Profile/>}/>
        <Route path='/home' element={user &&  <Home/>}/>
      </Routes>
    </>
  )
}

export default App
