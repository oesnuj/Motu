import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import healthRouter from './routes/healthRoute.js';
import authRouter  from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors())

app.use('/health', healthRouter);
app.use('/auth', authRouter );

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
