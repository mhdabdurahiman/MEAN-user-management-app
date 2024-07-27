import mongoose from "mongoose";

const dbConnect = () => {
  try {
    const connect = mongoose.connect(process.env.DB_URL);
    console.log("Database connection successful!");
  } catch (error) {
    console.log("Error connecting Database, resolve the error to continue!!");
  }
}

export { dbConnect };