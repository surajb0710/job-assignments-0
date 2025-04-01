import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import otpRouter from './routes/otproutes.js';
import userRouter from './routes/userRoutes.js';

import connectDB from './config/mongodb.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use('/api', otpRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
