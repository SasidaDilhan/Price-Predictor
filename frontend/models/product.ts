//name
//price
//model
//description
//stock
//createdAt
import mongoose, { Model, Schema } from "mongoose";


export type Tproduct = {
    name : string;
    price : number;
    model : string;
    description : string;
    stock : number;
    createdAt? : Date;
}

export const ProductSchema = new Schema<Tproduct>({
    name : {
        type : String,
        required : [true, "Product name is required"],
    },
    price : {
        type : Number,
        required : [true, "Product price is required"],
    },
    model : {
        type : String,
        required : [true, "Product model is required"],
        unique : true,
    },
    description : {
        type : String,
        required : [true, "Product description is required"],
    },
    stock : {
        type : Number,
        required : [true, "Product stock is required"],
        min : [0, "Product stock cannot be negative"],
        default : 0,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
})

export const Product : Model<Tproduct> = mongoose.models.Product || mongoose.model<Tproduct>("Product", ProductSchema);