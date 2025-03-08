const mongoose=require("mongoose")
const reviewSchema=new mongoose.Schema({
    reviewerId: { type: mongoose.Schema.Types.ObjectId, required: true }, // The one giving the review
    reviewerType: { type: String, enum: ['Client', 'Freelancer'], required: true }, // Identifies reviewer role
    revieweeId: { type: mongoose.Schema.Types.ObjectId, required: true }, // The one receiving the review
    revieweeType: { type: String, enum: ['Client', 'Freelancer'], required: true }, // Identifies reviewee role
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // The project related to the review
    rating: { type: Number, required: true}, // Rating between 1 and 5
    message: { type: String, required: true },
    reviewScore:{type:Number},
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports=mongoose.model("Review",reviewSchema)