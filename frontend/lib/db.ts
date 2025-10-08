// import User from "@/model/user";
// import bcrypt from "bcryptjs";
// import connectToDatabase from "./mongodb";

// connectToDatabase();

// export async function login(credentials: { email: string; password: string }) {
//   const user = await User.findOne({ email: credentials.email });

//   if (!user || !user.password) {
//     throw new Error("Invalid credentials");
//   }

//   const isValid = await bcrypt.compare(credentials.password, user.password);

//   if (!isValid) {
//     throw new Error("Invalid credentials");
//   }

//   return user;
// }

import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Already Connected to mongodb");
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB url env is not defined");
  }

  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    return connect;
  } catch (error) {
    console.log("Error connecting to mongoDB", error);
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  isConnected = true;
  console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("error", (error) => {
  isConnected = false;
  console.log("MongoDB connection error", error);
});

export default connectDB;
