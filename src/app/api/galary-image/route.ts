import dbConnect from "@/app/lib/dbConnect"
import BlogModle from "@/app/models/BlogSchema"



export const GET = async (request :Request)=>{

    const {searchParams} = new URL(request.url)
    const _id = searchParams.get('query')
    await dbConnect()
    try {
      const id =  await BlogModle.findById({_id : _id})

      if(!id){
        return Response.json({
            success:false,
            message:'not rescied id'
        },{status:400})
      }

      return Response.json({
        success:true,
        data : id,
        message:'success to fetch'
    },{status:200})
      
    } catch (error) {
        return Response.json({
            success:false,
            message:'not fetched'
        },{status:500})
    }
}