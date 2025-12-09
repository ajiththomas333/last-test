import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        const conn=await mongoose.connect("mongodb://last-test:Wh4sjaVWuI0tWtOIGvT1dArFpkhwr8nFMd79Mk4DqY9IlZ2C7Y2UcP2cGMS5emK148fyQe9KXIqRACDbiJYloQ==@last-test.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@last-test@")
        console.log("connected")
    }
    catch(err){
        console.log("no connection")
    }
}
export default connectDb;
