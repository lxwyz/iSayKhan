import express from 'express';
import { getUserProfile, loginUser, registerUser, updateUserProfile,bookAppointment,getUserAppointments,cancelAppointment,makePayment} from '../controllers/userController.js';
import authUser from '../controllers/middlewares/authUser.js';
import upload from '../controllers/middlewares/multer.js';


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getUserProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateUserProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,getUserAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/make-payment',authUser,makePayment)


export default userRouter