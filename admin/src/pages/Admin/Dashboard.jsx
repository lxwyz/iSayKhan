/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { dashData, aToken, getDashData, cancelAppointment } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: assets.doctor_icon,
              value: dashData.doctors,
              label: "Doctors",
            },
            {
              icon: assets.appointments_icon,
              value: dashData.appointments,
              label: "Appointments",
            },
            {
              icon: assets.patients_icon,
              value: dashData.patients,
              label: "Patients",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                className="w-16 h-16"
                src={item.icon}
                alt={`${item.label} icon`}
              />
              <div>
                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                <p className="text-gray-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white mt-10 rounded-lg shadow-md">
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-100 border-b rounded-t-lg">
            <img className="w-6 h-6" src={assets.list_icon} alt="List icon" />
            <p className="text-lg font-semibold">Latest Bookings</p>
          </div>
          <div className="p-4 space-y-4">
            {dashData.latestAppointments.length ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 p-4 border-b"
                >
                  {/* Doctor Image */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.docData.image}
                      alt={item.docData.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {item.docData.name}
                      </p>
                      <p className="text-sm text-gray-500">{item.slotDate}</p>
                    </div>
                  </div>

                  {/* Cancel Button / Status */}
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-400 text-xs font-medium">
                      Completed
                    </p>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No recent bookings available.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
