const Freelancer = require("../Models/FreelancerModel");
const Review=require("../Models/ReviewModel")
const Client=require("../Models/ClientModel")
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

//Post Review
const reviewPosting=async(req,res)=>{
    try {
        const { reviewerId, reviewerType, revieweeId, revieweeType, jobId, rating, message } = req.body;
        if (!['Client', 'Freelancer'].includes(reviewerType) || !['Client', 'Freelancer'].includes(revieweeType)) {
            return res.status(400).json({ success: false, message: 'Invalid reviewer or reviewee type' });
        }

       
if(revieweeType==="Freelancer"){
    const reviews = await Review.find({ revieweeId });
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 
  ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews 
  : rating;
    await Freelancer.findByIdAndUpdate(revieweeId,
        {rating:avgRating},
        {new:true}
    )
}
else if(revieweeType==="Client"){
    const reviews = await Review.find({ revieweeId });
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 
  ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews 
  : rating;
    await Client.findByIdAndUpdate(revieweeId,
        {rating:avgRating},
        {new:true}
    )
}

        const existingReview = await Review.findOne({
            jobId,
            reviewerId,
            revieweeId // Ensure only this specific reviewer is checked
        });

        if (existingReview) {
            return res.json({ success: false, message: "You have already reviewed this job." });
        }

        const result =await  sentiment.analyze(message);
const reviewScore=await result.score
        const newReview = new Review({ reviewerId, reviewerType, revieweeId, revieweeType, jobId, rating, message,reviewScore:reviewScore });
        await newReview.save();

        res.status(201).json({ success: true, message: 'Review added successfully', data: newReview });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const getFreelancerReviewsByScore=async(req,res)=>{
    try {
        const { freelancerId } = req.params;

        
        const topReviews = await Review.find({ revieweeId: freelancerId, revieweeType: "Freelancer" })
            .sort({ reviewScore: -1 }) 
            .limit(3);

        res.json({ success: true, topReviews });
    } catch (error) {
        res.json({ success: false, message:error.message });
    }
}


const getClientReviewsByScore=async(req,res)=>{
    try {
        const { clientId } = req.params;

        
        const topReviews = await Review.find({ revieweeId: clientId, revieweeType: "Client" })
            .sort({ reviewScore: -1 }) 
            .limit(3);

        res.json({ success: true, topReviews });
    } catch (error) {
        res.json({ success: false, message:error.message });
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

module.exports={getClientReviewsByScore,getFreelancerReviewsByScore,reviewGettingByClient,reviewGettingByFreelancer,reviewPosting}