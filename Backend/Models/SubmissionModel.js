const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true },
   
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    textAnswer1: { type: String, required: true },
    textAnswer2: { type: String },
    textAnswer3: { type: String },
    files: [{ type: String }], // Cloudinary URLs,
    isOk:{type:String,enum:["Pending","Rejected","Completed"],default:"Pending"},
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', SubmissionSchema);