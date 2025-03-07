const express=require("express")
const { reviewPosting, reviewGettingByClient, reviewGettingByFreelancer, getClientReviewsByScore, getFreelancerReviewsByScore } = require("../Controllers/ReviewController")
const router=express.Router()

router.post("/reviewSent",reviewPosting)

router.get("/client/:clientId",reviewGettingByClient)

router.get("/freelancer/:freelancerId",reviewGettingByFreelancer)

router.get("/getFreelancerReviewsByScore/:freelancerId",getFreelancerReviewsByScore)

router.get("/getClientReviewsByScore/:clientId",getClientReviewsByScore)

module.exports=router