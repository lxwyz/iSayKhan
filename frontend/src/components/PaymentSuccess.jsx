/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'

const PaymentSuccess = () => {
  const { appointmentId } = useParams()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          {/* Success Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 mx-auto text-green-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your payment for appointment <span className="font-semibold text-blue-600">#{appointmentId}</span> has been successfully processed.
          </p>

          {/* Call to action */}
          <div className="space-x-4">
            <button
              onClick={() => window.location.href = '/my-appointments'}
              className="inline-block w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              View My Appointments
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="inline-block w-full mt-4 bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
