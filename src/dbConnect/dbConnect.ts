import mongoose from "mongoose";

export async function connect (){
  try {
    mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection

    connection.on("connected", ()=>{
      console.log("Mongoose database connected successfully");
    })

    connection.on("error", (error)=>{ // Read `.on()` method 
      console.log("please make sure Database is up and running, so Mongoose database does not connected successfully: ", error);
      process.exit();
    })
    
  } catch (error) {
    console.log("Something went wrong in Mogoose database connection", error);
  }
}
