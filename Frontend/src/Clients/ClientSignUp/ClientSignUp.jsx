import React, { useState, useEffect } from "react";
// import "./ClientSignUp.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../../connectApi'
import ClientSignUpBanner from '../../assets/images/ClientSignUpBanner.jpg'
export const ClientSignUp = () => {
  const navigate=useNavigate()
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name,setName]=useState("")
  const [nameError,setNameError]=useState("")
const [email,setEmail]=useState("")
const [emailError,setEmailError]=useState("")
const [otp,setOtp]=useState("")
const [otpError,setOtpError]=useState("")
const [password,setPassword]=useState("")
const [passwordError,setPasswordError]=useState("")
const [confirmPassword,setConfirmPassword]=useState("")
const [confirmError,setConfirmError]=useState("")
const [countryError,setCountryError]=useState("")
const [phoneError,setPhoneError]=useState("")
const [otpButtonText,setOtpButtonText]=useState("OTP")
const [isDisabled,setIsDisabled]=useState(false)
const [timer,setTimer]=useState(0)
const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const [verifyButton,setVerifyButton]=useState("VERIFY")
const [isOtpVerified,setIsOtpVerified]=useState(false)
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
setOtpButtonText(`Resend (${timer})`)
const interval=setInterval(()=>{
  setTimer((prev)=>prev-1)
},1000)
return()=> clearInterval(interval)
}else if(timer===0 && otpButtonText !== "OTP"){
  setIsDisabled(false)
  setOtpButtonText("Resend")
  }
},[timer])



  const handleCountryChange = (e) => {
    const selected = countries.find((c) => c.name === e.target.value);
    setSelectedCountry(selected?.name || "");
    setPhoneCode(selected?.dialCode || "");
  };

const nameHandler=(e)=>{
  setName(e.target.value)
}
const emailHandler=(e)=>{
  setEmail(e.target.value)
}
const otpHandler=(e)=>{
  setOtp(e.target.value)
}
const passwordHandler=(e)=>{
  setPassword(e.target.value)
}
const confirmHandler=(e)=>{
  setConfirmPassword(e.target.value)
}

const toClientLogin=()=>{
  navigate("/clientLogin")
}


const sentOtp=async()=>{
  const value= await emailRegex.test(email)
  if(!value){
    return setEmailError("Invalid Email")
  }
  setEmailError("")
  setOtpButtonText("Resend (30)")
  setIsDisabled(true)
  setTimer(30)
  try {
    const response=await API.post("/client/sentOtp",{email}, {
      headers: { "Content-Type": "application/json" } 
    })
    console.log(response.data)
    if(response.data.success){
      return null
    }else{
      toast.success(response.data.message)
    }
  } catch (error) {
    return toast.error(error.message)
  }
}

const verifyOtp=async()=>{
  try {
    const response=await API.post("/client/verifyOtp",{email,otp},{
      headers: { "Content-Type": "application/json" } 
    })
   console.log(response.data)
   if(response.data.success){
    toast.success("OTP VERIFIED")
    setVerifyButton("VERIFIED")
    setIsOtpVerified(true)
   }
  } catch (error) {
    toast.error(error.message)
  }
}

const submitForm=async()=>{
  setNameError("")
  setPasswordError("")
  setConfirmError("")
  setCountryError("")
  setPasswordError("")
  setCountryError("")
  setPhoneError("")
  if(!isOtpVerified){
   return setOtpError("OTP Not Verified")
  }
  if(!password){
    return setPasswordError("Enter A Password")
  }
  
  if(!confirmPassword){
    return setConfirmError("Enter the Password")
  }
  if(confirmPassword!==password){
    return setConfirmError("Password Don't Match")
  }
  if(!selectedCountry){
    return setCountryError("Select Country")
  }
  if(!phoneNumber){
    return setPhoneError("Phone Number Required")
  }
  try {
    const response=await API.post("/client/register",{name,email,password,country:selectedCountry,phone:phoneNumber},{
      headers: { "Content-Type": "application/json" } 
    })
    if(response.data.success){
      toast.success("CLIENT REGISTRATION SUCCESSFULL")
  navigate("/clientLogin")
    }else{
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
  return (



<div 
  className="relative flex items-center justify-center mt-20 mx-4 sm:mx-6 mb-6 p-6 sm:p-8 rounded-2xl overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url(${ClientSignUpBanner})` }}
>

  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-6 sm:gap-10">
    
    
    <div className="w-full md:w-1/2 text-white text-center md:text-left font-bold text-base sm:text-lg md:text-2xl leading-relaxed max-w-lg">
      🚀 <span className="text-orange-500">Find top-tier talent</span> for your projects!  
      Build your dream team with <span className="text-orange-500">expert freelancers.</span>  
      <br /><br /> Sign up now and start hiring! 🎯
    </div>

    {/* Right Side - Form */}
    <div className="bg-white/20 backdrop-blur-lg p-4 sm:p-6 rounded-xl shadow-lg text-white w-full md:w-3/5 lg:w-1/2 max-w-lg">
      <div className="flex flex-col gap-3 sm:gap-4">
        <input type="text" placeholder="Name" required 
          className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" 
          onChange={nameHandler} 
        />
        <div className="text-red-500 text-xs sm:text-sm">{nameError}</div>

        {/* Email & Send OTP */}
        <div className="flex gap-2 sm:gap-3">
          <input type="email" placeholder="Email" required 
            className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" 
            onChange={emailHandler} 
          />
          <button 
            className="bg-orange-500 px-3 sm:px-4 py-2 sm:py-2 rounded-lg text-white font-bold hover:bg-orange-600 transition-all text-sm sm:text-base w-28 sm:w-32 lg:w-40" 
            onClick={sentOtp} disabled={isDisabled}
          >
            {otpButtonText}
          </button>
        </div>
        <div className="text-red-500 text-xs sm:text-sm">{emailError}</div>

        {/* OTP & Verify OTP */}
        <div className="flex gap-2 sm:gap-3">
          <input type="text" placeholder="OTP"
            className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" 
            onChange={otpHandler} 
          />
          <button 
            className="bg-orange-500 px-3 sm:px-4 py-2 sm:py-2 rounded-lg text-white font-bold hover:bg-orange-600 transition-all text-sm sm:text-base w-28 sm:w-32 lg:w-40" 
            onClick={verifyOtp}
          >
            {verifyButton}
          </button>
        </div>
        <div className="text-red-500 text-xs sm:text-sm">{otpError}</div>

        {/* Password Fields */}
        <input type="password" placeholder="Password" required 
          className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" 
          onChange={passwordHandler} 
        />
        <div className="text-red-500 text-xs sm:text-sm">{passwordError}</div>

        <input type="password" placeholder="Confirm Password" required 
          className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base" 
          onChange={confirmHandler} 
        />
        <div className="text-red-500 text-xs sm:text-sm">{confirmError}</div>

        {/* Country Selection */}
        <select className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base"
          value={selectedCountry} onChange={handleCountryChange} required
        >
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
          <input type="text" value={phoneCode} readOnly 
            className="w-12 sm:w-16 text-center p-2 sm:p-3 bg-white/30 rounded-lg text-white text-sm sm:text-base" 
          />
          <input type="text" placeholder="Phone number"
            className="p-2 sm:p-3 bg-white/30 rounded-lg text-white placeholder-white outline-none w-full text-sm sm:text-base"  
            value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="text-red-500 text-xs sm:text-sm">{phoneError}</div>

        {/* Sign Up Button */}
        <button 
className="bg-orange-500 p-2 sm:p-3 rounded-lg text-white font-bold hover:bg-orange-600 transition-all text-sm sm:text-base w-full"  
          onClick={submitForm}
        >
          Sign Up as Client
        </button>

        {/* Already have an account */}
        <p className="text-center text-sm sm:text-base mt-2">
          Already Have an Account? <span className="text-orange-500 cursor-pointer font-bold" onClick={toClientLogin}>Login</span>
        </p>
      </div>
    </div>

  </div>
</div>


  );
};
