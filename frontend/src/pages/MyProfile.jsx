/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      if (!userData.name.trim()) {
        toast.error("Name is required");
        return;
      }

      const formData = new FormData();
      formData.append("name", userData.name || "");
      formData.append("phone", userData.phone || "");
      formData.append("address", JSON.stringify(userData.address || {}));
      formData.append("dob", userData.dob || "");
      formData.append("gender", userData.gender || "");
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred while updating profile"
      );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative group">
          {/* Profile Picture */}
          <label htmlFor="image">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 hover:border-blue-500 cursor-pointer">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : userData.image || assets.placeholder_image
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            accept="image/*"
          />
        </div>

        {/* Name and Edit Button */}
        <div className="flex-1 text-center sm:text-left">
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 text-lg"
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
          )}
          <button
            onClick={isEdit ? updateUserProfileData : () => setIsEdit(true)}
            className={`mt-4 px-4 py-2 rounded-md text-white font-medium ${
              isEdit
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isEdit ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Contact Information */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Contact Information
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Email:</p>
            <p className="text-lg">{userData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p className="text-lg">{userData.phone}</p>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Address Information */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Address</h2>
        {isEdit ? (
          <div className="space-y-2">
            <input
              type="text"
              value={userData.address?.line1 || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value },
                }))
              }
              placeholder="Address Line 1"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              value={userData.address?.line2 || ""}
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value },
                }))
              }
              placeholder="Address Line 2"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ) : (
          <p className="text-lg">
            {userData.address?.line1}
            <br />
            {userData.address?.line2}
          </p>
        )}
      </section>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Basic Information */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Basic Information
        </h2>
        <div className="space-y-4">
          {/* Gender */}
          <div>
            <p className="text-sm text-gray-600">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData({ ...userData, gender: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-lg">{userData.gender}</p>
            )}
          </div>
          {/* Birthday */}
          <div>
            <p className="text-sm text-gray-600">Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob || ""}
                onChange={(e) =>
                  setUserData({ ...userData, dob: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2"
              />
            ) : (
              <p className="text-lg">{userData.dob}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
