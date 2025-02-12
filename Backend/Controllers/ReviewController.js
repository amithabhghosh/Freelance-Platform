const Review=require("../Models/ReviewModel")
//Post Review
const reviewPosting=async(req,res)=>{
    try {
        const { reviewerId, reviewerType, revieweeId, revieweeType, jobId, rating, comment } = req.body;
        if (!['Client', 'Freelancer'].includes(reviewerType) || !['Client', 'Freelancer'].includes(revieweeType)) {
            return res.status(400).json({ success: false, message: 'Invalid reviewer or reviewee type' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
        }

        const newReview = new Review({ reviewerId, reviewerType, revieweeId, revieweeType, projectId, rating, comment });
        await newReview.save();

        res.status(201).json({ success: true, message: 'Review added successfully', data: newReview });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//Get Reviews For Freelancer
const reviewGettingByFreelancer=async(req,res)=>{
    try {
        const { freelancerId } = req.params;
        const reviews = await Review.find({ revieweeId: freelancerId, revieweeType: 'Freelancer' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//Get Reviews For Client
const reviewGettingByClient=async(req,res)=>{
    try {
        const { clientId } = req.params;
        const reviews = await Review.find({ revieweeId: clientId, revieweeType: 'Client' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports={reviewGettingByClient,reviewGettingByFreelancer,reviewPosting}