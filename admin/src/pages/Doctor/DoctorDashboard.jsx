/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Top Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: assets.earning_icon,
              value: `${dashData.earnings} ${currency}`,
              label: "Earnings",
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
                <p className="text-3xl font-bold text-blue-600">{item.value}</p>
                <p className="text-gray-600 text-lg">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white mt-10 rounded-lg shadow-md">
          <div className="flex items-center gap-3 px-6 py-4 bg-gray-100 border-b rounded-t-lg">
            <img className="w-6 h-6" src={assets.list_icon} alt="List icon" />
            <p className="text-lg font-semibold text-gray-700">
              Latest Bookings
            </p>
          </div>
          <div className="p-4 space-y-4">
            {dashData.latestAppointments.length ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 p-4 border-b hover:bg-gray-50 transition duration-300 rounded-lg"
                >
                  {/* Doctor Info */}
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
                      <p className="text-sm text-gray-500">Doctor</p>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.userData.image}
                      alt={item.userData.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {item.userData.name}
                      </p>
                      <p className="text-sm text-gray-500">Patient</p>
                      <div className="flex flex-col text-gray-700">
                        <p className="text-sm">
                          Age:{" "}
                          <span className="text-blue-500 font-medium">
                            {calculateAge(item.userData.dob)} years
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Date */}
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-600">
                      {slotDateFormat(item.slotDate)}
                    </p>
                    <p className="text-gray-500 text-sm">Appointment Date</p>
                  </div>
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

export default DoctorDashboard;
