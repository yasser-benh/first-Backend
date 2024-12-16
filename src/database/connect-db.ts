import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to database");
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
    console.error("Error connecting to database");
  }
}
