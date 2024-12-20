/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom"; // For navigation after payment

const MyAppointment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false); // To track loading state for payments
  const months = [
    "",
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Utility function to format date
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return (
      dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const makePayment = async (appointmentId) => {
    setLoading(true); // Show loading state during the payment process

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/make-payment',
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);
        const { sessionId } = data;
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          toast.error(`Payment failed: ${error.message}`);
        }
      } else {
        toast.error("Failed to create payment session");
      }
    } catch (error) {
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              {/* Conditional rendering based on appointment status */}
              {!item.isCompleted && !item.cancelled && !item.payment && (
                <button
                  onClick={() => makePayment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hovere:text-white transition-all duration-300"
                  disabled={loading} // Disable button when loading or payment is processing
                >
                  {loading ? "Processing..." : "Pay Online"}
                </button>
              )}
              {!item.isCompleted && !item.cancelled && !item.payment && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hovere:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
              {item.payment && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Payment Completed
                </button>
              )}
              {item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-blue-500 rounded text-blue-500">
                  Appointment Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;



