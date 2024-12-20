/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-10">
      
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>CONTACT <span className="text-gray-700 font-medium">US</span></p>
      </div>

      <div className="my-10 flex flex-col items-center md:flex-row md:items-start gap-10 mb-28 text-sm">
        
        {/* Ensuring full display of the image */}
        <img 
          className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain" 
          src={assets.contact_image} 
          alt="Contact Us" 
        />
        
        <div className="flex flex-col justify-center items-start gap-6 text-center md:text-left">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            54709 Willms Station <br />
            Suite 350, Washington, USA.
          </p>
          <p className="text-gray-500">
            Tel: 09-234-435-3333 <br /> liamdev@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">Careers at iSayKhan</p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Contact
