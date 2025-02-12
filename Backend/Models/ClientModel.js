const mongoose = require("mongoose")
const clientSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        profile:{type:String},
        phone:{type:Number,required:true,unique:true},
        country:{type:String,required:true},
        rating:{type:Number,default:0},
        review:{type:String}
    }
)
module.exports=mongoose.model("Client",clientSchema)
