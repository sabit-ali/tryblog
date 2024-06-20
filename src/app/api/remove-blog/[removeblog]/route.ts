import BlogModle from "@/app/models/BlogSchema";
import dbConnect from "@/app/lib/dbConnect";
import { User, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const DELETE = async (request:Request, {params} : {params : {removeblog : string}})=>{
    await dbConnect()
    const id = params.removeblog
    const session = await getServerSession(authOptions)

    const user:User = session?.user as User

    if(!session || !session?.user){
        return Response.json({
            success:false,
            message:"user not authanticate,please sign-in first befor remove blog item"
        },{status:401})
    }
    try {
        const deleteResult = await BlogModle.deleteOne({ _id: id, userId: user.id });

        if(deleteResult.deletedCount === 0){
            return Response.json({
                success:false,
                message:'Error not found userId '
            },{status:500})
        }
        console.log("DeleteResult ",deleteResult)
      return Response.json(
        { message: 'Blog item deleted', success: true },
        { status: 200 }
      );
    } catch (error) {
        return Response.json({
            success:false,
            message:'Error Delete Failed'
        },{status:500})
    }
}