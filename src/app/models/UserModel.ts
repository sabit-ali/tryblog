import mongoose,{Schema,Document} from "mongoose";


export interface User extends Document{
    username:string,
    email:string,
    password:string,
    isVerified :boolean,
    verifyCode:string,
    verifyCodeExpiry:Date,
    password_reset_token?:string,
    password_reset_token_expiry?:Date
}

const UserSchema:Schema <User> = new Schema<User>(
    {
       username:{
        type:String,
        trim:true,
        required :[true,'username is required'],
        index:true,
        match:[/^[a-zA-Z0-9_-]+$/,'(only allowing letters, numbers, underscores, and hyphens)']
       },
       email:{
        type:String,
        trim:true,
        required :[true,'email is required'],
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Inavlid email address']
       },
       password:{
        type:String,
        trim:true,
        required :[true,'password is required'],
       },
       isVerified:{
        type:Boolean,
        default:false
       },
       verifyCode:{
        type:String,
        trim:true,
        required :true,
       },
       verifyCodeExpiry:{
        type:Date,
        trim:true,
        required :true,
       },
       password_reset_token: {
        type: String,
        default: null
    },
    password_reset_token_expiry: {
        type: Date,
        default: null
    },
    }
)

const User = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User',UserSchema)

export default User