const mongoose=require("mongoose")
require("dotenv").config()
const connectDb=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected Succesfully`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process on failure
    }
   
}
module.exports=connectDb;