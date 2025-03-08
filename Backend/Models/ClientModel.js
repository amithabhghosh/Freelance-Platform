const mongoose = require("mongoose")
const clientSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        profile:{type:String,default:"https://res.cloudinary.com/dysh5anaw/image/upload/v1739970286/Freelancer%20Platform/profile_1739970282586.jpg"},
        phone:{type:Number,required:true,unique:true},
        country:{type:String,required:true},
        rating:{type:Number,default:0},
        review:{type:String},
        isVerified:{type:Boolean,default:true}
    }
)
module.exports=mongoose.model("Client",clientSchema)
