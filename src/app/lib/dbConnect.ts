import mongoose from "mongoose";
import { DB_NAME } from "./constanc";

type ConnectionObject = {
    isConnection?: number
}

const connection :ConnectionObject = {}

const dbConnect = async ()=>{
    if(connection.isConnection){
        console.log('Database already connected')
        return null
    }
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,)
        connection.isConnection =  db.connection.readyState
        console.log('Database is connected')
    } catch (error:any) {
        throw new Error('Data base connection error',error)
    }
}

export default dbConnect