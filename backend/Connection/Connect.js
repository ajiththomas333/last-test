import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        const conn=await mongoose.connect("")
        console.log("connected")
    }
    catch(err){
        console.log("no connection")
    }
}
export default connectDb;