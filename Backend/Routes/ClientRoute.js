const express=require("express");
const {registerClient, loginClient, postJob, getPostedJobByClient, getProposalsRecievedByClient, updateProposalStatus, proposalsRecievedForJob, ClientImageUpload, updateJobAssignedStatus, updateJobCompleteStatus, messagePostedByClient, messageRecievedForClientAndFreelancer, getJobAnswer} = require("../Controllers/ClientControllers");
const upload = require("../Config/multerConfig");
const router=express.Router()
const protect=require("../MiddleWares/authMiddleware")
const authorize=require("../MiddleWares/authorize")
//Client Register Route
router.post("/register",registerClient)

//Client Login Route
router.post("/login",loginClient)

//Client Post Route
router.post("/postJob",protect,authorize("Client"),postJob)

//Job Posted By Client Route
router.get("/clientJobs/:clientId",getPostedJobByClient)

//Get Propsals Recieved For the Clients
router.get("/getProposalRecievedByClient/:id",protect,authorize("Client"),getProposalsRecievedByClient)

//update Proposal Status
router.put("/updateProposalStatus/:id",protect,authorize("Client"),updateProposalStatus)

//Get All proposals Recieved For particular Job
router.get("/getProposalsForParticularJob/:id",protect,authorize("Client"),proposalsRecievedForJob)

//UploadImage Route for Client
router.post("/upload",upload.single("profile"),ClientImageUpload)

//Job Status Assigning Route
router.put("/jobAssignedStatusUpdate/:id",protect,authorize("Client"),updateJobAssignedStatus)

//Job Status Completed Route
router.put("/jobCompletedStatusUpdate/:id",protect,authorize("Client"),updateJobCompleteStatus)

//Get Job Answer For Particular Job
router.get("/getJobAnswer/:jobId",protect,authorize("Client"),getJobAnswer)

module.exports=router