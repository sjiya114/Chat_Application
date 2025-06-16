import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
function Signup() {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState("");
  const fileInput=useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email)
    formData.append("password", password);
    formData.append("image", image);
    formData.append("bio", bio);
    signup(formData);
    setName("");
    setEmail("");
    setPassword("");
    setBio("");
    setImage("");
    document.getElementById('form-data').reset();
  }
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <form id='form-data' onSubmit={handleSubmit} encType='multipart/form-data' className='flex flex-col text-white space-y-2 w-[320px]  border-white border-1 shadow-gray-600 shadow-2xl   max-w-[300px]:w-full  px-5 py-5 rounded-md'>
          <h1 className='text-center font-bold text-3xl mb-6'>Signup Page</h1>
          <label htmlFor="name">Name</label>
          <input type="text" onChange={(e) => { setName(e.target.value) }} className='bg-gray-400  text-black rounded-md px-2 py-1' placeholder='Enter your Name here' id='name' name='name' />
          <label htmlFor="email">Email</label>
          <input type="text" onChange={(e) => { setEmail(e.target.value) }} className='bg-gray-400  text-black rounded-md px-2 py-1' placeholder='Enter your email here' id='email' name='email' />
          <label htmlFor="password">Password</label>
          <input type="password" onChange={(e) => { setPassword(e.target.value) }} className='bg-gray-400  text-blackrounded-md  px-2 py-1 ' placeholder='Enter your password here' id='password' name='password' />
          <label htmlFor="password">Profile</label>
          <input type='file' onChange={(e) => {setImage(e.target.files[0]) }} ref={fileInput} className='bg-gray-400  text-blackrounded-md  px-2 py-1 ' placeholder='Upload your Image here' id='image' name='image' />
          <label htmlFor="bio">Bio</label>
          <textarea type="text" onChange={(e) => { setBio(e.target.value) }} rows={3} className='bg-gray-400  text-black rounded-md px-2 py-1' placeholder='Enter your bio here' id='bio' name='bio' />
          <button type='submit' className='bg-blue-900 mt-4 mb-4 hover:bg-blue-600 px-1 py-2 text-white rounded-md'>Create Account</button>
          <p className='text-white'>Already have an account <b><Link to="/">Login</Link></b></p>
        </form>
      </div>
    </>
  )
}

export default Signup
