const mongoose=require("mongoose")
const messageSchema=new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be Client or Freelancer
    senderType: { type: String, enum: ['Client', 'Freelancer'], required: true }, // Identifies sender role
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be Client or Freelancer
    receiverType: { type: String, enum: ['Client', 'Freelancer'], required: true }, // Identifies receiver role
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: false }, // Optional, if related to a project
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})
module.exports=mongoose.model("Message",messageSchema)