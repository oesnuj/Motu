import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import healthRoute from './routes/healthRoute.js';

dotenv.config();

const app = express();
app.use(cors())

app.use('/health', healthRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
