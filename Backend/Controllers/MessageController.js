const Message=require("../Models/MessageModel")


//Post Message
const messageSent=async(req,res)=>{
try {
    const { senderId, senderType, receiverId, receiverType, jobId, message } = req.body;

 
    if (!['Client', 'Freelancer'].includes(senderType) || !['Client', 'Freelancer'].includes(receiverType)) {
        return res.status(400).json({ success: false, message: 'Invalid sender or receiver type' });
    }
    const imageUrl = req.file ? req.file.path : null;

    const newMessage = new Message({ senderId, senderType, receiverId, receiverType, jobId, message,image:imageUrl });
    await newMessage.save();

   

    res.status(201).json({ success: true, message: 'Message sent successfully', data: newMessage });
} catch (error) {
    res.status(500).json({ success: false, error: error.message });
}
}


//Get conversation between a specific Client and Freelancer**
const getConversation=async(req,res)=>{
    try {
        const { clientId, freelancerId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: clientId, senderType: 'Client', receiverId: freelancerId, receiverType: 'Freelancer' },
                { senderId: freelancerId, senderType: 'Freelancer', receiverId: clientId, receiverType: 'Client' }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

const conversation=async(req,res)=>{
    
        const { jobId } = req.params;
        try {
            const messages = await Message.find({ jobId }).sort({ timestamp: 1 }); 
            res.json({ success: true, messages });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }

}
module.exports={messageSent,getConversation,conversation}