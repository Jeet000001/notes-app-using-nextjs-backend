// Database connection
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let isConnected = false;

const dbconnect = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URL);
    isConnected = db.connections[0].readyState === 1;
    console.log("MONGODB Connected", db);
  } catch (error) {
    console.error("Faild to connect to MongoDB: ", error);
    throw error;
  }
};
export default dbconnect;
