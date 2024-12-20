/* eslint-disable no-unused-vars */
import React from 'react'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Left Section */}
        <div>
            <h1 className="text-2xl font-semibold">iSayKhan</h1>
            <p className='w-full md:w-2/3 text-gray-600 leading-6 '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab quo repudiandae nulla illum sapiente non id praesentium facilis voluptatibus iste eaque, consequatur soluta quibusdam fugit debitis recusandae et? Voluptates, sed?</p>
        </div>

        {/* Center Section */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>HOME</li>
                <li>ABOUT US</li>
                <li>CONTACT US</li>
                <li>PRIVACY POLICY</li>
            </ul>
        </div>
         {/* Right Section */}
         
        <div>
           <p  className='text-xl font-medium mb-5'>GET IN TOUCH</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+959792697601</li>
            <li>liamdev@gmail.com</li>
           </ul>
        </div>
      </div>
            {/* Copy Right  */}
      <div>
        <hr/>
        <p className='py-5 text-sm text-center'>Copy 2024@iSayKhan - All Right Preserved. </p>
      </div>
    </div>
  )
}

export default Footer
