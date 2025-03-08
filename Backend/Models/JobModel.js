const mongoose=require("mongoose")
const jobSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    catagory:{type:String,required:true},
    skills:{type:String},
    deadline:{type:Number,required:true},
    budget:{type:Number,required:true},
    status:{type:String,enum:["pending","completed","assigned"],default:"pending"},
    ClientId:{type:mongoose.Schema.Types.ObjectId,ref:"Client",required:true}
}, { timestamps: true })

module.exports=mongoose.model("Job",jobSchema)