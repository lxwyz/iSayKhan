/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, getProfileData, profileData, setProfileData,backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about,
      }

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        {headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setProfileData(data.profileData)
        setIsEdit(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="m-5 bg-white shadow-lg rounded-lg p-6">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={profileData.image || `${backendUrl}/default-profile.png`}
          alt="Doctor Profile"
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">
          {profileData.name}
        </h1>
        <p className="text-gray-500">
          {profileData.degree} - {profileData.speciality}
        </p>
        <p className="text-sm text-blue-500 font-medium mt-1">
          {profileData.experience} years of experience
        </p>
      </div>

      {/* About Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">About</h2>
        {isEdit ? (
          <textarea
            className="w-full p-2 border rounded mt-2"
            rows="3"
            value={profileData.about}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, about: e.target.value }))
            }
          />
        ) : (
          <p className="text-gray-600 mt-2">{profileData.about}</p>
        )}
      </div>

      {/* Appointment Fees */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Appointment Fees
        </h2>
        <p className="text-gray-600 mt-2">
          {isEdit ? (
            <input
              type="number"
              className="p-2 border rounded"
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, fees: e.target.value }))
              }
              value={profileData.fees}
            />
          ) : (
            profileData.fees
          )}{" "}
          {currency}
        </p>
      </div>

      {/* Address Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Address</h2>
        {isEdit ? (
          <>
            <input
              type="text"
              className="w-full p-2 border rounded mt-2"
              value={profileData.address.line1}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
            />
            <input
              type="text"
              className="w-full p-2 border rounded mt-2"
              value={profileData.address.line2}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
            />
          </>
        ) : (
          <p className="text-gray-600 mt-2">
            {profileData.address.line1}
            <br />
            {profileData.address.line2}
          </p>
        )}
      </div>

      {/* Availability Section */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="availability"
          checked={profileData.available}
          onChange={(e) =>
            setProfileData((prev) => ({
              ...prev,
              available: e.target.checked,
            }))
          }
          className="mr-2"
        />
        <label htmlFor="availability" className="text-gray-700">
          Available for Appointments
        </label>
      </div>

      {/* Edit Button */}
      <div className="text-center">
        <button
          onClick={isEdit ? updateProfile : () => setIsEdit((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300"
        >
          {isEdit ? "Save Profile" : "Edit Profile"}
        </button>
      </div>
    </div>
  ) 
}

export default DoctorProfile
