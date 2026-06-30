import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import { Readable } from "stream";


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_CLOUD_API_SECRET,
    secure: true
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
            console.error(`cloudinary error: \n${error}`);
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

// =======================
//   upload_stream
// =======================
// 3. CORE ARCHITECTURE: STREAMING TO CLOUDINARY
// ==========================================
/**
 * Handles uploading a buffer chunk directly to Cloudinary using their chunked stream API.
 * @param {Buffer} bufferChunk - The binary chunk received from Multer
 * @param {String} publicId - Unique identifier to ensure chunks stitch to the same asset
 * @}
 */

const uploadChunkToCloudinary = async (bufferChunk, public_id) => {
    try {
        const cloudinaryStream = await cloudinary.uploader.upload_chunked_stream({resource_type: "video", public_id: public_id})
        
        const readable_stream = new Readable();
        readable_stream.push(bufferChunk);
        readable_stream.push(null);

        readable_stream.pipe(cloudinaryStream);
    } catch (error) {
        console.error(`cloudinary error: \n${error}`);
        throw error;
    }
};
const upload_Thumbnail_To_Cloudinary = async (bufferChunk, public_id) => {
    try {
        const cloudinaryStream = await cloudinary.uploader.upload_chunked_stream({resource_type: "image", public_id: public_id});
        
        const readable_stream = new Readable();
        readable_stream.push(bufferChunk);
        readable_stream.push(null);

        readable_stream.pipe(cloudinaryStream);
    } catch (error) {
        console.error(`cloudinary error: \n${error}`);
        throw error;
    }
};
export {uploadOnCloudinary, uploadChunkToCloudinary, upload_Thumbnail_To_Cloudinary};