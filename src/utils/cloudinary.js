import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_CLOUD_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
        try{
            if(!localFilePath) throw new Error("file not found");
            const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
            fs.unlinkSync(localFilePath, (err) => {
                                                if(err){
                                                    console.log("fn unlink failed => Error:");
                                                    console.log(err);
                                                }else{
                                                    console.log(`file deleted path: ${localFilePath}`);
                                                }
                                                
                                            }
                            );
            return response;
        }
        catch(error){
            console.error(error);
            fs.unlinkSync(localFilePath, (err) => {
                                                if(err){
                                                    console.log("fn unlink failed => Error:");
                                                    console.log(err);
                                                }else{
                                                    console.log(`file deleted path: ${localFilePath}`);
                                                }
                                                
                                            }
                        )
        }
};
const uploadVideoOnCloudinary = async (localFilePath) => {
        try{
            if(!localFilePath) throw new Error("file not found");
            const response = await cloudinary.uploader.upload_large(localFilePath, {resource_type: "auto"});
            fs.unlinkSync(localFilePath, (err) => {
                                                if(err){
                                                    console.log("fn unlink failed => Error:");
                                                    console.log(err);
                                                }else{
                                                    console.log(`file deleted path: ${localFilePath}`);
                                                }
                                                
                                            }
                            );
            return response;
        }
        catch(error){
            console.error(error);
            fs.unlinkSync(localFilePath, (err) => {
                                                if(err){
                                                    console.log("fn unlink failed => Error:");
                                                    console.log(err);
                                                }else{
                                                    console.log(`file deleted path: ${localFilePath}`);
                                                }
                                                
                                            }
                        )
        }
};
export {uploadOnCloudinary, uploadVideoOnCloudinary};