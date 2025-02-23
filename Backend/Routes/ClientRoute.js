const express=require("express");
const {registerClient, loginClient, postJob, getPostedJobByClient, getProposalsRecievedByClient, updateProposalStatus, proposalsRecievedForJob, ClientImageUpload, updateJobAssignedStatus, updateJobCompleteStatus, messagePostedByClient, messageRecievedForClientAndFreelancer, getJobAnswer, signUp, verifyOtp, getClientData, updataClientData, getJobByJobId, getProposalByProposalId, getFreelancerByFreelancerId} = require("../Controllers/ClientControllers");
const upload = require("../Config/multerConfig");
const router=express.Router()
const protect=require("../MiddleWares/authMiddleware")
const authorize=require("../MiddleWares/authorize");
const { clientAuth } = require("../MiddleWares/ClientMiddleWare");
//Client Register Route
router.post("/register",signUp)   //used


router.post("/sentOtp",registerClient)  //used

router.post("/verifyOtp",verifyOtp)  //used


//Client Login Route
router.post("/login",loginClient)  //used

//Client Post Route
router.post("/postJob",protect,authorize("Client"),postJob)  //used

//Job Posted By Client Route
router.get("/clientJobs",clientAuth,getPostedJobByClient)  //used

//Get Propsals Recieved For the Clients
router.get("/getProposalRecievedByClient/:id",protect,authorize("Client"),getProposalsRecievedByClient)

//update Proposal Status
router.put("/updateProposalStatus/:id",protect,authorize("Client"),updateProposalStatus)

//Get All proposals Recieved For particular Job
router.get("/getProposalsForParticularJob/:id",protect,authorize("Client"),proposalsRecievedForJob)

//UploadImage Route for Client
router.post("/upload",upload.single("profile"),ClientImageUpload)  //used

//Job Status Assigning Route
router.put("/jobAssignedStatusUpdate/:id",protect,authorize("Client"),updateJobAssignedStatus)

//Job Status Completed Route
router.put("/jobCompletedStatusUpdate/:id",protect,authorize("Client"),updateJobCompleteStatus)

//Get Job Answer For Particular Job
router.get("/getJobAnswer/:jobId",protect,authorize("Client"),getJobAnswer)


router.get("/getClientData",clientAuth,getClientData)   //used

router.put("/updateClientData",upload.single("profile"),clientAuth,updataClientData)   //used

router.get("/getJob/:jobId",protect,authorize("Client"),getJobByJobId)

router.get("/getProposalByProposalId/:proposalId",getProposalByProposalId)

router.get("/getFreelancerByFreelancerId/:freelancerId",getFreelancerByFreelancerId)


module.exports=router