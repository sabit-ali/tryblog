import User from "@/app/models/UserModel";
import dbConnect from "@/app/lib/dbConnect";
import bcrypt from 'bcryptjs'

export const POST = async (request: Request) => {
    await dbConnect()
    const { resetPasswordToken, password } = await request.json()

    const user = await User.findOne({ password_reset_token: resetPasswordToken })

    if (!user) {
        throw new Error('User not found')
    }

    const expiryToken = user.password_reset_token_expiry
    if (!expiryToken) {
        throw new Error('Token Expired')
    }
    const today = new Date()

    if (today > expiryToken) {
        throw new Error('Token Expired')
    }

    const hasedPassword = bcrypt.hashSync(password, 10)

    await User.findOneAndUpdate(
        { _id: user._id },
        {
            password: hasedPassword,
            password_reset_token: null,
            password_reset_token_expiry: null,
        },
        {
            new: true
        }
    )

    return Response.json({
        success:true,
        message:'password changed successfully'
    },{status:200})
}