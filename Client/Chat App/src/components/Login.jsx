import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      login('login',{email:email,password:password});
    }
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col text-white space-y-2 w-[300px] h-[350px] border-white border-1 shadow-gray-600 shadow-2xl  max-w-[300px]:w-full  px-5 py-5 rounded-md'>
          <h1 className='text-center font-bold text-3xl mb-6'>Login Page</h1>
          <label htmlFor="email">Email</label>
          <input type="text" onChange={(e) => { setEmail(e.target.value) }} value={email} className='bg-gray-400  text-black rounded-md px-2 py-1' placeholder='Enter your email here' id='email' name='email' />
          <label htmlFor="password">Password</label>
          <input type="password" onChange={(e) => { setPassword(e.target.value) }} value={password} className='bg-gray-400 rounded-md  text-black px-2 py-1 ' placeholder='Enter your password here' id='password' name='password' />
          <button type='submit' className='bg-blue-900 mt-4 mb-4 hover:bg-blue-600 px-1 py-2 text-white rounded-md'>Login</button>
          <p>Don't have an account <b><Link to="/signup">Signup</Link></b></p>
        </form>
      </div>

    </>
  )
}

export default Login

