import User from "@/app/models/UserModel";
import dbConnect from "@/app/lib/dbConnect";


export const POST = async (request: Request) => {
    await dbConnect()

    try {
        const { email } = await request.json()

        const existedEmail = await User.findOne({ email })
        const fogotCode = Math.floor(900000 + Math.random() * 100000)

        if (!existedEmail) {
            return Response.json({
                success: false,
                message: 'email not found'
            }, { status: 400 })
        }

        const username = existedEmail.username

        

    } catch (error) {

    }
}