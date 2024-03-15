import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose, { mongo } from 'mongoose';
import userRouter from './routes/userRouter.js';
import canRouter from './routes/canRouter.js';
import { handleError, AppError } from './utils/errorUtils.js';
import welcomeRouter from './routes/welcomeRouter.js';

// Middleware setup
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Variables
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Defining routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/cans', canRouter);
app.use("/",welcomeRouter)
app.use('*', () => {
  throw new AppError('Route not found', 404);
});
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI).then((conObj) => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server Listening at Port ${PORT}`));
});
