import User from "@/model/user";
import bcrypt from "bcryptjs";
import connectToDatabase from "./mongodb";

connectToDatabase();

export async function login(credentials: { email: string; password: string }) {
  const user = await User.findOne({ email: credentials.email });

  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(credentials.password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return user;
}
