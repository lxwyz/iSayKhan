/* eslint-disable no-unused-vars */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import PaymentSuccess from './components/PaymentSuccess'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/doctors' element={<Doctors/>}></Route>
        <Route path='/doctors/:speciality' element={<Doctors/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/my-appointments' element={<MyAppointment/>}></Route>
        <Route path='/my-profile' element={<MyProfile/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/appointment/:docId' element={<Appointment/>}></Route>
   


      </Routes>
      <Footer/>
    </div>
  )
}

export default App
