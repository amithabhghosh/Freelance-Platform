const express=require("express")
const {registerFreelancer, loginFreelancer, sentProposal, getProposalByFreelancer, FreelancerImageUpload, jobWithPendingStatus, jobSubmission, signUp, verifyOtp, resentOtp, token, freelancerProfileEdit, getFreelancerData, updateFreelancerProfile, getOneJob, getClientByJobId, getFreelancerProposalIsApplied, getJobByJobId, getJobIdByProposal, getProposalsWithAssigned, getPaymentByProposalId, getProposalDataByJobIdAndFreelancerId, getAnswerSubmittedByJobIdAndFreelancerId, resubmitAnswer, getPaymentDetailsOfFreelancer, getHoldPaymentOfFreelancer, sentFreelancerResetOtp, updateFreelancerPassword, getChartData} = require("../Controllers/FreelancerController")
const upload = require("../Config/multerConfig")
const router=express.Router()
const protect=require("../MiddleWares/authMiddleware")
const authorize=require("../MiddleWares/authorize")
const files=require("../Config/CloudinarySubmission")
const {freelancerAuth } = require("../MiddleWares/freelancerMiddleware")


//Freelancer Register Route
router.post("/register",signUp) //used


router.post("/sentOtp",registerFreelancer)  //used

router.post("/verifyOtp",verifyOtp)  //used

router.post("/token",token)

//Freelancer Login Route
router.post("/login",loginFreelancer)  //used

//Sent Proposal Route
router.post("/postProposal",protect,authorize("Freelancer"),sentProposal)  //used

//Get Proposal By Freelancer
router.get("/freelancerProposals/:id",protect,authorize("Freelancer"),getProposalByFreelancer)

//Get Job With Pending Status
router.get("/jobPendingStatus",protect,authorize("Freelancer"),jobWithPendingStatus)  //used

//Profile Photo Uploading Route
router.post("/uploads",upload.single("profile"),FreelancerImageUpload)  //used

//Job Answer Submission Route
router.post("/jobAnswerSubmission",protect,authorize("Freelancer"), files.array('files', 5),jobSubmission)

router.get("/job/:id",protect,authorize("Freelancer"),getOneJob)  //used

router.get("/getProfile",freelancerAuth,getFreelancerData)  //used

router.put("/updateFreelancerProfile",upload.single("profile"),freelancerAuth,updateFreelancerProfile)  //used

router.get("/getClientId/:jobId",getClientByJobId)  //used

router.get("/getAppliedStatus/:jobId/:freelancerId",getFreelancerProposalIsApplied)  //used

router.get("/getJobById/:jobId",getJobByJobId)

router.get("/getProposalDetails/:proposalId",protect,authorize("Freelancer"),getJobIdByProposal)

router.get("/getAcceptedProposals/:freelancerId",protect,authorize("Freelancer"),getProposalsWithAssigned)

router.get("/getPaymentByProposal/:proposalId",protect,authorize("Freelancer"),getPaymentByProposalId)

router.get("/getProposalDataByJobIdAndFreelancerId/:freelancerId/:jobId",protect,authorize("Freelancer"),getProposalDataByJobIdAndFreelancerId)

router.get("/getAnswerSubmittedByJobIdAndFreelancerId/:jobId",protect,authorize("Freelancer"),getAnswerSubmittedByJobIdAndFreelancerId)

router.put("/resubmitAnswer/:answerId",protect,authorize("Freelancer"), files.array('files', 5),resubmitAnswer)

router.get("/getPaymentDetailsOfFreelancer/:freelancerId",protect,authorize("Freelancer"),getPaymentDetailsOfFreelancer)

router.get("/getHoldPaymentOfFreelancer/:freelancerId", protect,authorize("Freelancer"),getHoldPaymentOfFreelancer)

router.post("/sentFreelancerResetOtp",sentFreelancerResetOtp)

router.put("/updateFreelancerPassword",updateFreelancerPassword)

router.get("/getChartData", protect,authorize("Freelancer"),getChartData)
module.exports=router
