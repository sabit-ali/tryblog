import User from "@/app/models/UserModel";
import dbConnect from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'
import { UploadOnCloudinary } from "@/app/lib/cloudinary";

export const POST = async (request: NextRequest) => {
    await dbConnect()
    try {
        const formData = new FormData;
         console.log("FormData ::: ",formData)

        const images =  formData.get('avatar') as unknown as File
        console.log("avatar :: ",images)
    
        await UploadOnCloudinary(images,"blog-images")
    
        return Response.json({
            msg:images,
        })
    } catch (error:any) {
        return Response.json({
            success:false,
            message:'not send images'
        })
    }
}