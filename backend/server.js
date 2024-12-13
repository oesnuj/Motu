import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import healthRouter from './routes/healthRoute.js';
import authRouter  from './routes/authRoutes.js';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development"; // 기본값: development
const CLIENT_URL =
  NODE_ENV === "production"
    ? process.env.PROD_CLIENT_URL
    : process.env.DEV_CLIENT_URL;

console.log(`Running in ${NODE_ENV} mode`);
console.log(`Client URL: ${CLIENT_URL}`);

const app = express();
app.use(cors())

app.use('/health', healthRouter);
app.use('/auth', authRouter );

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
