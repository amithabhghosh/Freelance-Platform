const express=require("express")
const { registerAdmin, loginAdmin, getAllClient,getAllFreelancer, getAllJobs, getOneFreelancer, getOneClient, getOneJob, freelancerUpdate, getTotalAmountGained, getAllpayments, sentAdminOtp, verifyOtp, getAllAdmins, deleteAdminOtpsent, verifyDeleteOtp, deleteAdmin, updateAdminPassword, sentResetOtp, getChartData, inactiveFreelancer, inActiveClient, activateClient} = require("../Controllers/AdminController")
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
router.get("/client/:id",protect,authorize("Admin"),getOneClient)

//Get Single Job
router.get("/job/:id",protect,authorize("Admin"),getOneJob)

//Update Freelancer Status
router.put("/updateFreelancerStatus/:id",protect,authorize("Admin"),freelancerUpdate)   //used

router.get("/getTotalAmountGained",protect,authorize("Admin"),getTotalAmountGained)

router.get("/getAllpayments",protect,authorize("Admin"),getAllpayments)

router.post("/sentOtp",sentAdminOtp)

router.post("/verifyOtp",verifyOtp)

router.get("/getAllAdmins",protect,authorize("Admin"),getAllAdmins)

router.post("/deleteAdminOtpsent",protect,authorize("Admin"),deleteAdminOtpsent)

router.post("/verifyDeleteOtp",protect,authorize("Admin"),verifyDeleteOtp)

router.delete("/deleteAdmin/:adminId",protect,authorize("Admin"),deleteAdmin)

router.put("/updateAdminPassword",updateAdminPassword)

router.post("/sentResetOtp",sentResetOtp)

router.get("/getChartData",protect,authorize("Admin"),getChartData)

router.put("/inactiveFreelancer/:freelancerId",protect,authorize("Admin"),inactiveFreelancer)

router.put("/inActiveClient/:clientId",protect,authorize("Admin"),inActiveClient)

router.put("/activateClient/:clientId",protect,authorize("Admin"),activateClient)
module.exports=router
