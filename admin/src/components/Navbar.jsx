/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {AdminContext} from '../context/AdminContext'
import {useNavigate} from'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

  const {aToken,setAToken} = useContext(AdminContext)
  const {dToken, setDtoken} = useContext(DoctorContext)
  const navigate = useNavigate()

  const loguot = () =>{
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDtoken('')
    dToken && localStorage.removeItem('dToken')
  }


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg:white'>
      <div className='flex items-center gap-2 text-xs'>
        <h1 className="text-2xl font-semibold text-gray-800 cursor-pointer">City Star</h1>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-500'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={loguot} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
