import mongoose, { Model, Schema,  } from "mongoose";


type Tseller = {
  email: string;
  password: string;
  sellerName: string;
  businessNmae:string
  role: "seller";
  businessLogo: string;
  businessAddress: string;
  createdAt: Date;
};

const UserSchema = new Schema<Tseller>({
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
  sellerName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  businessAddress: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  businessNmae: {
    type: String,
    required: [true, "Business Name is required"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["seller"],
  },
  businessLogo: {
        type: String,
        required: [true, "At least one product image is required"],
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Seller: Model<Tseller> =
  mongoose.models.Seller || mongoose.model<Tseller>("Seller", UserSchema);

export default Seller;
