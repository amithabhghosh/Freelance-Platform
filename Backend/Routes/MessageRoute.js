const express=require("express")
const { messageSent, getConversation, conversation } = require("../Controllers/MessageController")
const router=express.Router()
const upload = require("../Config/multerConfig");

router.post("/sent",upload.single("image"),messageSent)

router.get("/:clientId/:freelancerId",getConversation)

router.get("/:jobId",conversation)

module.exports=router