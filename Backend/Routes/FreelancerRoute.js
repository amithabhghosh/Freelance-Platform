const express=require("express")
const {registerFreelancer, loginFreelancer, sentProposal, getProposalByFreelancer, FreelancerImageUpload, jobWithPendingStatus, jobSubmission} = require("../Controllers/FreelancerController")
const upload = require("../Config/multerConfig")
const router=express.Router()
const protect=require("../MiddleWares/authMiddleware")
const authorize=require("../MiddleWares/authorize")
const files=require("../Config/CloudinarySubmission")

//Freelancer Register Route
router.post("/register",registerFreelancer)

//Freelancer Login Route
router.post("/login",loginFreelancer)

//Sent Proposal Route
router.post("/postProposal",protect,authorize("Freelancer"),sentProposal)

//Get Proposal By Freelancer
router.get("/freelancerProposals/:id",protect,authorize("Freelancer"),getProposalByFreelancer)

//Get Job With Pending Status
router.get("/jobPendingStatus",protect,authorize("Freelancer"),jobWithPendingStatus)

//Profile Photo Uploading Route
router.post("/uploads",upload.single("profile"),FreelancerImageUpload)

//Job Answer Submission Route
router.post("/jobAnswerSubmission",protect,authorize("Freelancer"), files.array('files', 5),jobSubmission)

module.exports=router