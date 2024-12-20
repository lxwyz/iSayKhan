import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRouter.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


// Initialize Stripe with your secret key

// app config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());


// API Endpoints
app.use('/api/admin', adminRouter);

app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('API is working well!');
});

// Stripe Webhook endpoint



// Start the server
app.listen(port, () => {
  console.log('Listening on port', port);
});
