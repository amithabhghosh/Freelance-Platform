const express=require("express")
const { messageSent, getConversation } = require("../Controllers/MessageController")
const router=express.Router()


router.post("/sent",messageSent)

router.get("/:clientId/:freelancerId",getConversation)

module.exports=router