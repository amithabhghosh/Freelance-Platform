import React, { useState, useEffect } from "react";

import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../../connectApi'
import SignUpCover from '../../assets/images/SignUpCover.jpg'


export const FreelancerSignUp = () => {
const navigate=useNavigate()
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
const [buttonText,setButtonText]=useState("OTP")
const [isDisabled,setIsDisabled]=useState(false)
const [timer,setTimer]=useState(0)
const [email,setEmail]=useState("")
const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const [emailError,setEmailError]=useState("")
const [nameError,setNameError]=useState("")
const [name,setName]=useState("")
const [password,setPassword]=useState("")
const [passwordError,setPasswordError]=useState("")
const [confirmPassword,setConfirmPassword]=useState("")
const [confirmPasswordError,setConfirmPasswordError]=useState("")
const [otpButtonText,setOtpButtonText]=useState("VERIFY")
const [otp,setOtp]=useState("")
const [otpError,setOtpError]=useState("")
const [otpVerified,setOtpVerified]=useState(false)
const [countryError,setCountryError]=useState("")
const [phoneNumberError,setPhoneNumberError]=useState("")
const [skill,setSkill]=useState("")
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryList = data
          .map((country) => ({
            name: country.name.common,
            dialCode: country.idd?.root
              ? `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ""}`
              : "",
          }))
          .filter((country) => country.dialCode)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

useEffect(()=>{
if(timer>0){
  setIsDisabled(true)
setButtonText(`Resend (${timer})`)
const interval=setInterval(()=>{
  setTimer((prev)=>prev-1)
},1000)
return()=> clearInterval(interval)
}else if(timer===0 && buttonText !== "OTP"){
setIsDisabled(false)
setButtonText("Resend")
}
},[timer])

  const handleCountryChange = (e) => {
    const selected = countries.find((c) => c.name === e.target.value);
    setSelectedCountry(selected?.name || "");
    setPhoneCode(selected?.dialCode || "");
  };




const emailHandeler=(e)=>{
setEmail(e.target.value)
}
const nameHandle=(e)=>{
setName(e.target.value)
}
const passwordHandler=(e)=>{
  setPassword(e.target.value)
}
const confirmHandler=(e)=>{
  setConfirmPassword(e.target.value)
}
const otpHandle=(e)=>{
  setOtp(e.target.value)
}
const skillHandler=(e)=>{
  setSkill(e.target.value)
}


const toFreelancerLogin=()=>{
  navigate("/freelancerLogin")
}


const otpSent=async()=>{
 const value= await emailRegex.test(email)
if(!value){
  return setEmailError("Invalid Email")
}
setEmailError("")
setButtonText("Resend (30)")
setIsDisabled(true)
setTimer(30)
try {
  const response=await API.post("/freelancer/sentOtp",{email}, {
    headers: { "Content-Type": "application/json" } 
  })
 
  if(response.data.success){
    return null
  }else{
    toast.error(response.data.message)
  }
} catch (error) {
  return toast.error(error.message)
}

}

const verifyOtp=async()=>{

  try {
    const response=await API.post("/freelancer/verifyOtp",{email,otp},{
      headers: { "Content-Type": "application/json" } 
    })
   console.log(response.data)
   if(response.data.success){
    toast.success("OTP VERIFIED")
    setOtpButtonText("VERIFIED")
    setOtpVerified(true)
   }else{
    toast.error(response.data.message)
   }
  } catch (error) {
    toast.error(error.message)
  }
}



const submitForm=async()=>{
  if(!otpVerified){
    return setOtpError("OTP Not Verified")
  }
  setNameError("")
  setPasswordError("")
  setConfirmPasswordError("")
  setCountryError("")
  setPasswordError("")
  setCountryError("")
  setPhoneNumberError("")
if(!name){
return setNameError("Enter Your Name")
}

if(!password){
  return setPasswordError("Enter A Password")
}

if(!confirmPassword){
  return setConfirmPasswordError("Enter the Password")
}
if(confirmPassword!==password){
  return setConfirmPasswordError("Password Don't Match")
}
if(!selectedCountry){
  return setCountryError("Select Country")
}
if(!phoneNumber){
  return setPhoneNumberError("Phone Number Required")
}

try {
  const response=await API.post("/freelancer/register",{name,email,password,country:selectedCountry,phone:phoneNumber,skills:skill},{
    headers: { "Content-Type": "application/json" } 
  })
  if(response.data.success){
    toast.success("FREELANCE REGISTRATION SUCCESSFULL")
navigate("/freelancerLogin")
  }
} catch (error) {
  toast.error(error.message)
}

}
  return (




<div className="relative flex items-center justify-center mt-20 mx-4 sm:mx-6 mb-6 p-6 sm:p-8 rounded-2xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${SignUpCover})` }}>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-6 sm:gap-10">
    
    {/* Left Side - Signup Content */}
    <div className="text-white text-center md:text-left font-bold text-base sm:text-lg md:text-2xl leading-relaxed max-w-lg">
      🚀 Turn your <span className="text-orange-500">skills</span> into income!  
      Join the fastest-growing <span className="text-orange-500">freelancing</span> platform.  
      Work <span className="text-orange-500">remotely</span>, set your own rates, and get paid securely!  
      <br /><br /> Sign up & start earning today! 💼
    </div>

    {/* Right Side - Form */}
    <div className="bg-white/20 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg text-white w-full md:w-3/5 lg:w-1/2 max-w-lg">
      <div className="flex flex-col gap-3 sm:gap-4">
        <input type="text" placeholder="Name" required onChange={nameHandle} className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" />
        <div className="text-red-500 text-xs sm:text-sm">{nameError}</div>

        <div className="flex gap-2 sm:gap-3">
          <input type="email" placeholder="Email" required onChange={emailHandeler} className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" />
          <button onClick={otpSent} disabled={isDisabled}            className="bg-orange-500 px-3 sm:px-4 py-2 sm:py-2 rounded-lg text-white font-bold hover:bg-orange-600 transition-all text-sm sm:text-base w-28 sm:w-32 lg:w-40">{buttonText}</button>
        </div>
        <div className="text-red-500 text-xs sm:text-sm">{emailError}</div>

        <div className="flex gap-2 sm:gap-3">
          <input type="text" placeholder="OTP" onChange={otpHandle} className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" />
          <button onClick={verifyOtp}             className="bg-orange-500 px-3 sm:px-4 py-2 sm:py-2 rounded-lg text-white font-bold hover:bg-orange-600 transition-all text-sm sm:text-base w-28 sm:w-32 lg:w-40" >{otpButtonText}</button>
        </div>
        <div className="text-red-500 text-xs sm:text-sm">{otpError}</div>

        <input type="password" placeholder="Password" required onChange={passwordHandler} className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" />
        <div className="text-red-500 text-xs sm:text-sm">{passwordError}</div>

        <input type="password" placeholder="Confirm Password" required onChange={confirmHandler} className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" />
        <div className="text-red-500 text-xs sm:text-sm">{confirmPasswordError}</div>

        <input type="text" placeholder="Skills" onChange={skillHandler} className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base"/>

        {/* Country Selection */}
        <select value={selectedCountry} onChange={handleCountryChange} required className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base">
          <option value="">Select a country</option>
          {countries.map((country, index) => (
            <option key={index} value={country.name} className="text-black">
              {country.name} ({country.dialCode})
            </option>
          ))}
        </select>
        <div className="text-red-500 text-xs sm:text-sm">{countryError}</div>

        {/* Phone Number */}
        <div className="flex gap-2 sm:gap-3">
          <input type="text" value={phoneCode} readOnly className="inputField w-12 sm:w-16 text-center bg-white/30 text-white rounded-lg text-sm sm:text-base" />
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" required className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" />
        </div>
        <div className="text-red-500 text-xs sm:text-sm">{phoneNumberError}</div>

        <button type="submit" onClick={submitForm} className="bg-orange-500 p-2 sm:p-3 rounded-lg text-white font-bold hover:bg-orange-600 transition-all text-sm sm:text-base w-full">Sign Up As Freelancer</button>
      </div>

      <div className="text-center mt-3 sm:mt-4">
        <p className="text-sm sm:text-base">Already Have an Account? <span onClick={toFreelancerLogin} className="text-orange-500 font-bold cursor-pointer">Login</span></p>
      </div>
    </div>
  </div>
</div>



  );
};
