import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
export const UploadOnCloudinary = async (file:File,folder:string)=>{
    const buffer = await file.arrayBuffer()
    const bytes = Buffer.from(buffer)
  return new Promise( async (resolv,reject)=>{
       await cloudinary.uploader.upload_stream({
            resource_type:'auto',
            folder:folder
        }, async (error,result)=>{
            if(error){
                return reject(error.message)
            }
            
            return resolv(result)
            
        }).end(bytes)
   })
}