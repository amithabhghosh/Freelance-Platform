const mongoose=require("mongoose")
const freelanceSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profile:{type:String},
    country:{type:String,required:true},
    phone:{type:Number,required:true,unique:true},
    skills:{type:String,required:true},
    rating:{type:Number},
    review:{type:String},
    isVerified:{type:Boolean,default:false}
})

module.exports=mongoose.model("Freelancer",freelanceSchema)