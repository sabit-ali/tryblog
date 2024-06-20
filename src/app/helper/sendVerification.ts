import { resend } from "../lib/resend";
import AWSVerifyEmail from "../../../email/emailTemplet";


export const sendVerificationDetails = async ({verifyCode,username,email}:any)=>{
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: 'new30 Verification Code',
        react: AWSVerifyEmail({verifyCode,username}),
      });
}


