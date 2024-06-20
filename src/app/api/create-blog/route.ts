import { UploadOnCloudinary } from "@/app/lib/cloudinary"
import dbConnect from "@/app/lib/dbConnect"

import { NextRequest, NextResponse } from "next/server"
import BlogModle from "@/app/models/BlogSchema"


export const POST = async(req:NextRequest)=>{
    await dbConnect()
   try {
    const formData = await req.formData()
    const image =  formData.get('avatar') as unknown as File
    const title =  formData.get('title')
    const description =  formData.get('description')
    const price =  formData.get('price')
    
     const data:any =  await UploadOnCloudinary(image,'blog-images')
    const createBlog = new BlogModle({
        title,
        description,
        price,
        image_uri : data?.secure_url,
        public_id :data?.public_id,
    })
    await createBlog.save()
    
   return NextResponse.json({
    success:true,
    message:' new Blog Successfully added !'
   },{status:200})
   } catch (error:any) {
    return NextResponse.json({
        success:false,
        message:`error upload blog`
    },{status:500})
   }
}

export const GET = async (request: NextRequest) => {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query') || '';
        const page = Number(searchParams.get('page')) || 1;
        const limit = 6; // Adjust the limit as needed
        const skip = (page - 1) * limit;

        const data = await BlogModle.find({
            title: { $regex: query , $options: 'i' },
        }).skip(skip).limit(limit);
        
        if (!data || data.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No blogs found',
            }, { status: 404 });
        }

        const total = await BlogModle.countDocuments({
            title: { $regex: query, $options: 'i' },
        });

        return NextResponse.json({
            success: true,
            data,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            message: 'Successfully retrieved blogs',
        }, { status: 200 });
    } catch (error) {
      
        return NextResponse.json({
            success: false,
            message: 'Failed to retrieve blogs',
        }, { status: 500 });
    }
};
