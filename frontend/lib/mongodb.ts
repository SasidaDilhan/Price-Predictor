import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI

if (!MONGO_URI) {
  throw new Error('Please define the MOGO_URI env ')
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectToDatabase() {

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI as string)
    .then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn

  // try {
  //   const db = await mongoose.connect(process.env.MONGODB_URI as string);
  //   console.log("Connected to MongoDB");
  //   return db;
  // } catch (error) {
    
  //   console.error("Error connecting to MongoDB:", error);
  //   throw error;
  // }
}