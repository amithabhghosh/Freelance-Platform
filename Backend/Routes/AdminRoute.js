const express=require("express")
const { registerAdmin, loginAdmin, getAllClient,getAllFreelancer, getAllJobs, getOneFreelancer, getOneClient, getOneJob, freelancerUpdate} = require("../Controllers/AdminController")
const router=express.Router()
const protect=require("../MiddleWares/authMiddleware")
const authorize=require("../MiddleWares/authorize")
// Register Admin Route
router.post("/register",registerAdmin)   //used

//Login Admin Route
router.post("/login",loginAdmin)   //used

//Get All Freelancers List Route
router.get("/allFreelancers",protect,authorize("Admin"),getAllFreelancer)   //used

//Get All Clients List Route
router.get("/allClients",protect,authorize("Admin"),getAllClient)  //used

//Get All Jobs List
router.get("/allJobs",protect,authorize("Admin"),getAllJobs)   //used

//Get Single Freelancer
router.get("/freelancer/:id",protect,authorize("Admin"),getOneFreelancer)  //used

//Get Single Client
router.get("/client/:id",getOneClient)

//Get Single Job
router.get("/job/:id",getOneJob)

//Update Freelancer Status
router.put("/updateFreelancerStatus/:id",protect,authorize("Admin"),freelancerUpdate)   //used
module.exports=router
