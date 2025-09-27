import mongoose from "mongoose";

let isConnected = false;

export const connectToMongoDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI || ""); // Ensure MONGODB_URI is set in your environment variables
    console.log("Connected to MongoDB");
    isConnected = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
