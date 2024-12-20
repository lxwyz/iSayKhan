/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import React from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Please upload a doctor's picture.");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // checking the form data.
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setAbout('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setFees('')
        setDegree('')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full max-w-4xl">
      <p className="mb-6 text-2xl font-semibold text-gray-800">Add Doctor</p>

      <div className="bg-white px-8 py-6 border rounded-lg shadow-lg">
        {/* Upload Doctor Picture */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 bg-gray-100 rounded-full object-cover hover:opacity-80"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload area"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="mt-2 text-sm text-gray-500">Upload Doctor Picture</p>
        </div>

        {/* Doctor Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Doctor Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter Name"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Doctor Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter Email"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Doctor Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter Password"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Experience
            </label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Select Experience</option>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} Year{i > 0 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Fees
            </label>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Enter Fees"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Speciality
            </label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Select Speciality</option>
              {[
                "General Physician",
                "Gynecologist",
                "Dermatologist",
                "Gastroenterologist",
                "Neurologist",
                "Dentist",
                "Surgeon",
                "Psychiatrist",
                "Pharmacist",
              ].map((speciality, index) => (
                <option key={index} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Education
          </label>
          <input
            onChange={(e) => setDegree(e.target.value)}
            value={degree}
            type="text"
            placeholder="Enter Education"
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            onChange={(e) => setAddress1(e.target.value)}
            value={address1}
            type="text"
            placeholder="Enter Address Line 1"
            className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <input
            onChange={(e) => setAddress2(e.target.value)}
            value={address2}
            type="text"
            placeholder="Enter Address Line 2"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            About Doctor
          </label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write about the doctor"
            rows="4"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
