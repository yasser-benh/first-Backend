import mongoose from "mongoose";
import config from "config";
export async function connectDB() {
  try {
    await mongoose.connect(config.get<string>("connection_string"));
    console.log("Connected to database");
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
    console.error("Error connecting to database");
  }
}
