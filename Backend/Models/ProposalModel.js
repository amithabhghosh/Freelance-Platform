const mongoose=require("mongoose")
const proposalSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    budget:{type:Number,required:true},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:"Job",required:true},
    clientId:{type:mongoose.Schema.Types.ObjectId,ref:"Client",required:true},
    freelancerId:{type:mongoose.Schema.Types.ObjectId,ref:"Freelancer",required:true},
    deadline:{type:Number},
    status:{type:String,enum:["pending","accepted","rejected"],default:"pending"}
})
module.exports=mongoose.model("Proposal",proposalSchema)