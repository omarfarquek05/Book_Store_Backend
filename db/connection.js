import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const dbConnection = ()=> {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('DB is connected');
    })
    .catch((error) => {
      console.log(error);
    });
}