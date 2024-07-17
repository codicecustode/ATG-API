import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
 
  dotenv.config();
    
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
})
 
 
 const uploadOnCloudinary = async (localFilePath)=>{
     try{
         if(!localFilePath) return NULL;
         const response = await cloudinary.uploader.upload(localFilePath,{        
             resource_type: 'auto',
              folder: 'ATG'
         });
         
         fs.unlinkSync(localFilePath); //delete the local file after it has been uploaded to Cloudinary
         return response;
 
     } catch (error) {
             fs.unlinkSync(localFilePath);//remove the file
             console.log("error message while uploading file on cloudinary : ",error.message)
             return null;
             
     }
 }
 
 export {uploadOnCloudinary}