const jwt = require('jsonwebtoken');
const Admin = require('../Models/AdminModel');
const Freelancer = require('../Models/FreelancerModel');
const Client = require('../Models/ClientModel');
require("dotenv").config()

const protect=async(req,res,next)=>{
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success:false,message: "No token, authorization denied" });
    }
try {
    const decoded =await jwt.verify(token, process.env.SECRET_KEY);  
    let user = await Admin.findById(decoded.id) || 
    await Freelancer.findById(decoded.id) || 
    await Client.findById(decoded.id);
if (!user) {
return res.status(404).json({ success: false, message: 'User not found' });
}
// Assign role dynamically based on user type
const role = user instanceof Admin ? "Admin" : 
      user instanceof Freelancer ? "Freelancer" : "Client";
if(!user){
    return res.status(404).json({ success: false, message: 'User not found' });
}
req.user = { _id: user.id, role };
next();
} catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' }); 
}
}
module.exports=protect