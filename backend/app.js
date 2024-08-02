import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import { dbConnect } from './config/db.js';
import { userRoutes } from './routes/userRoutes.js';

const app = express();

// env config
configDotenv();

app.use(cors({
  origin: 'http://localhost:4200'
}))

app.use(express.json());

// DB connection function
dbConnect();

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Server started...!, API URL: http://localhost:${PORT}`);
})
