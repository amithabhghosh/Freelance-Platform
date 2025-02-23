const nodemailer = require("nodemailer");
require("dotenv").config();

const sentOtp=async(email,otp)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // Your email
          pass: process.env.EMAIL_PASS, // App password
        },
      });

      let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);
}

module.exports = sentOtp;