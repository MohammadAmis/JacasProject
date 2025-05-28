import mongoose from "mongoose";
// import {DB_NAME} from '../../constants.js'

const connectDB=async ()=>{

    try {
        const DB_NAME = process.env.DB_NAME || 'ecommerce';
        const connectionInstance= await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`,{
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected : ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED",error)
    }
}

export { mongoose, connectDB };


