import mongoose, { model, Model, Schema } from "mongoose";

export type Tproduct = {
  name: string;
  price: number;
  model: string;
  description: string;
  stock: number;
  images: string[];
  createdAt?: Date;
  sellerId: mongoose.Types.ObjectId;
};

export const ProductSchema = new Schema<Tproduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller", // Reference to the Seller model
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    model: {
      type: String,
      required: [true, "Product model is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Product stock cannot be negative"],
      default: 0,
    },
    images: [
      {
        type: String,
        required: [true, "At least one product image is required"],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Clear existing model to avoid conflicts
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

export const Product: Model<Tproduct> =
  mongoose.models.Product2 || model<Tproduct>("Product2", ProductSchema);