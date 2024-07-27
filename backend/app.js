import express from 'express';
import { configDotenv } from 'dotenv';
import { dbConnect } from './config/db.js';


const app = express();

// env config
configDotenv();

const PORT = process.env.PORT || 3000;

// DB connection function
dbConnect();

// Sample hello world
app.get('/', (req, res) => {
  res.send("Hello world!")
})

app.listen(PORT, () => {
  console.log(`API Server started...!, API URL: http://localhost:${PORT}`);
})
