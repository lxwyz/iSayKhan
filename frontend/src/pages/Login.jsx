/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, {  useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state,setState] = useState('Sign Up')
  const {backendUrl, token, setToken} = useContext(AppContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const navigate = useNavigate()
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if(state === 'Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }  if(state === 'Log In'){
        const {data} = await axios.post(backendUrl + '/api/user/login',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    
    } catch (error) {
      console.log(error.message );
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
<form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}> 
  <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
    <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Log In"}</p>
    <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to Book Appointment</p>
   
  {
    state === 'Sign Up' && 
    <div className='w-full'>
      <p> Full Name</p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required/>
    </div>
  }


    <div className='w-full'>
      <p>Email </p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
    </div>
    
    <div className='w-full'>
      <p>Password</p>
      <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
    </div>
    <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Log In"}</button>
    {
      state === 'Sign Up' 
      ? <p>Already have an account? <span onClick={()=>setState('Log In')} className='text-primary underline cursor-pointer'>Login Here</span></p>
      : <p>Create an account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
    }
  </div>
</form>

  )
}

export default Login
