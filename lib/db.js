import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

// Database connection
const dbconnect = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URL);
    console.log("MONGODB Connected", db);
  } catch (error) {
    console.error("Faild to connect to MongoDB: ", error);
    throw error
  }
};
export default dbconnect;
