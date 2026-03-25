// Database connection
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

let isConnected = false;

const dbconnect = async () => {
    if(isConnected){
        console.log("MongoDB is already connected");
        return;
    }
  try {
    const db = await mongoose.connect(MONGODB_URL);
    isConnected = db.connections[0].readyState === 1;
    // This line checks whether the MongoDB connection is successfully established by verifying if readyState equals 1.
    console.log("MONGODB Connected", db);
  } catch (error) {
    console.error("Faild to connect to MongoDB: ", error);
    throw error;
  }
};
export default dbconnect;
