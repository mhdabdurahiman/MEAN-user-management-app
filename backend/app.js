import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { dbConnect } from './config/db.js';
import { authRoutes } from './routes/authRoutes.js';

const app = express();

// env config
configDotenv();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}))

app.use(cookieParser());

app.use(express.json());

// DB connection function
dbConnect(); console.log("No token found");

app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Server started...!, API URL: http://localhost:${PORT}`);
})
