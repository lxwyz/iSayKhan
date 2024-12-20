/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointment,completeAppointment,cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointment();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-5 p-4 bg-gray-50 rounded-lg shadow">
      <p className="mb-5 text-2xl font-semibold text-gray-800">All Appointments</p>
      <div className="bg-white border rounded-lg shadow-md overflow-y-scroll max-h-[70vh]">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 py-3 px-6 border-b bg-gray-100 text-gray-600 text-sm font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Content */}
        {appointments.length > 0 ? (
          appointments.reverse().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-4 items-center py-4 px-6 border-b hover:bg-gray-50 transition duration-200 text-gray-700"
            >
              <p className="font-medium">{index + 1}</p>
              <div className="flex items-center gap-4">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-10 h-10 rounded-full border object-cover"
                />
                <p className="font-medium">{item.userData.name}</p>
              </div>
              <p className={`text-sm font-medium ${item.payment ? 'text-green-600' : 'text-red-600'}`}>
                {item.payment ? 'Online' : 'Cash'}
              </p>
              <p>{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)} - <span>{item.slotTime}</span>
              </p>
              <p className="font-medium">
                {item.amount}
                <span className="ml-1 text-gray-500">{currency}</span>
              </p>
              {
                item.cancelled
                ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                :item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                :<div className="flex gap-2">
                <button
                  className="p-2 rounded bg-red-100 text-red-500 hover:bg-red-200 transition"
                  title="Cancel Appointment"
                  onClick={()=>cancelAppointment(item._id)}
                >
                  <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded bg-green-100 text-green-500 hover:bg-green-200 transition"
                  title="Approve Appointment"
                  onClick={()=>completeAppointment(item._id)}
                >
                  <img src={assets.tick_icon} alt="Approve" className="w-5 h-5" />
                </button>
              </div>
              }
            </div>
          ))
        ) : (
          <p className="text-center py-10 text-gray-500 text-sm">
            No appointments found.
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
