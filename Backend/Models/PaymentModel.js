
const mongoose=require("mongoose")
const paymentSchema=new mongoose.Schema({
    jobId:{type: mongoose.Schema.Types.ObjectId, ref: 'Job',required:true},
    clientId:{type: mongoose.Schema.Types.ObjectId, ref: 'Client' ,required:true},
    proposalId:{type: mongoose.Schema.Types.ObjectId, ref: 'Proposal',required:true},
    freelancerId:{type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer',required:true},
    amount:{type:Number,required:true},
    stripeSessionId:{type:String},
    status:{type:String,enum:["hold","completed","rejected"],default:"hold"},
    date: { type: Date, default: Date.now }
}, { timestamps: true })
module.exports=mongoose.model("Payment",paymentSchema)