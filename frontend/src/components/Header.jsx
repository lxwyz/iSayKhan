/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* ----- Left Side -------- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img src={assets.group_profiles} alt="Group profiles" className="w-28" />
          <p className="text-gray-200">
            Simply browse through our extensive list of trusted doctors <br className="hidden sm:block"/> and schedule your appointment hassle-free.
          </p>
        </div>
        <a 
          href="#speciality" 
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-700 font-medium shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg md:m-0"
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="Arrow icon" className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* ------ Right Side ------- */}
      <div className="md:w-1/2 relative">
        <img src={assets.header_img} alt="Header" className="w-full md:absolute bottom-0 h:auto rounded-lg" />
      </div>
    </div>
  )
}

export default Header
