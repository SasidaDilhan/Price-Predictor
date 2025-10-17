import mongoose, { Model, Schema,  } from "mongoose";


type Tuser = {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  createdAt: Date;
};

const UserSchema = new Schema<Tuser>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<Tuser> =
  mongoose.models.User || mongoose.model<Tuser>("User", UserSchema);

export default User;
