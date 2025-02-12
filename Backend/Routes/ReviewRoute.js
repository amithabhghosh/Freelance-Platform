const express=require("express")
const { reviewPosting, reviewGettingByClient, reviewGettingByFreelancer } = require("../Controllers/ReviewController")
const router=express.Router()

router.post("/reviewSent",reviewPosting)

router.get("/client/:clientId",reviewGettingByClient)

router.get("/freelancer/:freelancerId",reviewGettingByFreelancer)

module.exports=router