/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image}/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to iSayKhan, your trusted partner is managing ur healthcare needs.</p>
          <p>At iSayKhan, we are dedicated to providing you with seamless access to medical professionals, tailored health resources, and tools to empower you in making informed decisions. Our platform connects you with a network of experienced healthcare providers, making it easier to book appointments, manage your health records, and track your wellness journey—all in one place. Trust us to be your healthcare companion every step of the way, so you can focus on what truly matters: your well-being.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at iSayKhan is to revolutionize healthcare accessibility by creating a platform where personalized, high-quality healthcare is within reach for everyone. We envision a world where individuals have the tools, support, and resources they need to take control of their health journey with confidence.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
         <b>Efficiency:</b>
         <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About
