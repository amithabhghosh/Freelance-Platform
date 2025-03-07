const express=require("express")
const router=express.Router()
const protect=require("../MiddleWares/authMiddleware")
const authorize=require("../MiddleWares/authorize")
const { getCheckOutSession } = require("../Controllers/PaymentController")
const { stripeWebhookHandler } = require("../Controllers/webHookController")


router.post("/checkout-session/:proposalId",protect,authorize("Client"),getCheckOutSession)



module.exports=router