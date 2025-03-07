const mongoose=require("mongoose")
const messageSchema=new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be Client or Freelancer
    senderType: { type: String, enum: ['Client', 'Freelancer'], required: true }, // Identifies sender role
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be Client or Freelancer
    receiverType: { type: String, enum: ['Client', 'Freelancer'], required: true }, // Identifies receiver role
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Optional, if related to a project
    message: { type: String },
    image:{type:String},
    
},{ timestamps: true })
module.exports=mongoose.model("Message",messageSchema)