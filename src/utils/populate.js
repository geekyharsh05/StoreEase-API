import dotenv from "dotenv";
import dbConnect from "../db/dbConnection.js";
import { productModel as Product } from "../models/product.js";
import jsonProducts from "./products.json";

dotenv.config();

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Data import successful!");
  } catch (error) {
    console.error("Error during data import:", error);
  } finally {
    dbConnect.close();
  }
};

start();
