
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("local file path is missing");

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    //console.log("File is uploaded on Cloudinary ", response.url);
    
    // Delete the locally saved temporary file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Remove the locally saved temporary file as the upload operation failed
    fs.unlinkSync(localFilePath); 
    return null;
  }
};

export { uploadOnCloudinary };





{/*
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) => {
  //check local file path is exist or not
  //upload the file on cloudinary
  //if file has been uploaded successfull
  //console.log("file is uploaded on cloudinary ", response.url);
  //unlink local file path
  //sent response

  try {
    if (!localFilePath) throw new Error("local file path is missing");

    //upload the file on cloudinary
    await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary }
*/}