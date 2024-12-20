
import dotenv from "dotenv";
dotenv.config();

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, experience, about, fees, address ,degree} = req.body;
        const imageFile = req.file;

        // Validate input fields
        if (!name || !email || !password || !speciality || !about || !fees || !address || !experience || !degree) {
            return res.json({ message: "All fields are required" });
        }

        // Check if the email is valid
        if (!validator.isEmail(email)) {
            return res.json({ message: "Email is not a valid email" });
        }

        // Check if the password is strong enough
        if (password.length < 8) {
            return res.json({ message: "Password must be at least 8 characters long" });
        }

        // Check if image file exists
        if (!imageFile) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Prepare doctor data
        const doctorData = {
            name,
            email,
            password: hashPassword,
            image: imageUrl,
            speciality,
            experience,
            about,
            degree,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        };
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//API for admin login

const adminLogin = async (req,res ) => {
    try { 
        const {email,password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token  = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success: true, token: token})
        }else{
            res.json({success:false, message:"Invalid credentials."})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


//API to access all the doctors in Admin Panel

const allDoctors = async (req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success: true,doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

// API to get all the appoinments in Admin Panel
const appoinmentsAdmin = async (req,res) => {
    try {
        
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}


const appointmentCancel = async (req, res) => {
    try {
      const { appointmentId } = req.body;
  
      const appointmentData = await appointmentModel.findById(appointmentId);
  
     
  
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
  
      //releasing doctor slot.
  
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;
  
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
  
      res.json({ success: true, message: "Appointment cancelled" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  //API to get dashboard data for admin panel

  const adminDashboard = async (req,res) => {
    try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments  = await appointmentModel.find({})


        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
  }

export { addDoctor,adminLogin, allDoctors, appoinmentsAdmin,appointmentCancel,adminDashboard};
