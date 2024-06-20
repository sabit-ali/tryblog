import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/UserModel";
import {z} from 'zod'
import { userValidationSchema } from "@/app/schemas/signUpSchema";

const UsernameQuerySchema = z.object(
    {
        username : userValidationSchema
    }
)

export const GET = async (request:Request)=>{
    await dbConnect()
    try {
       const {searchParams} =  new URL(request.url)
       const queryParams = {
        username:searchParams.get('username')
       }
       // validete
      const result =  UsernameQuerySchema.safeParse(queryParams)
      console.log('result :: ',result)

      if(!result.success){
        const userNameError = result.error.format().username?._errors || []
        return Response.json(
            {
                success:false,
                message:userNameError?.length > 0 ? userNameError.join(', ') : 'Invalid query parameters'
            },{status:400}
        )
      }

      const {username} = result.data
      console.log(username)

     const UserNameAlreadyExisted = await User.findOne({ username, isVerified : true })
     if(UserNameAlreadyExisted){
        return Response.json(
            {
                success:false,
                message:"Username already taken"
            },{status:400}
        )
     }

     return Response.json(
        {
            success:true,
            message:'Username is unique'
        },{status:200}
     )
    } catch (error) {
        console.log('Error checking username ',error)
        return Response.json({
            success:false,
            message:'error unique '
        })
    }
}