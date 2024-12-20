import express from "express";

import { addDoctor,adminLogin, allDoctors, appoinmentsAdmin, appointmentCancel,adminDashboard } from "../controllers/adminController.js";
 
import upload from "../controllers/middlewares/multer.js";
import authAdmin from "../controllers/middlewares/authAdmin.js";
import {changeAvailability} from "../controllers/doctorController.js";
import { cancelAppointment } from "../controllers/userController.js";


const adminRouter = express.Router();

adminRouter.post("/add-doctor",authAdmin,upload.single('image'),addDoctor);
adminRouter.post("/login",adminLogin);
adminRouter.post("/all-doctors",authAdmin,allDoctors);
adminRouter.post("/change-availability",authAdmin,changeAvailability);
adminRouter.get('/appointments',authAdmin,appoinmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)


export default adminRouter;