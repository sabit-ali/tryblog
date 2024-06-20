import User from "@/app/models/UserModel";
import dbConnect from "@/app/lib/dbConnect";
import crypto from "crypto";
import ForgotPasswordEmail from "../../../../email/forgotEmailTEmplet";
import { resend } from "@/app/lib/resend";

export const POST = async ( request : Request)=>{
    await dbConnect()

    const {email} = await request.json()

    const user = await User.findOne({email})

    if(!user){
        throw new Error('User not found')
    }

    const resetPasswordToken = crypto.randomBytes(23).toString('base64')
    const today = new Date
    const todayExpiry = new Date(today.setDate(today.getDate() + 1))

    user.password_reset_token = resetPasswordToken
    user.password_reset_token_expiry = todayExpiry
    await user.save()

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'reset your password',
        react: ForgotPasswordEmail({email,resetPasswordToken}),
      });

      return Response.json({
        success:true,
        message:'Password reset email send'
      })
}