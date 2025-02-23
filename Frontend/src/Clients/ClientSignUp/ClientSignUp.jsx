import React, { useState, useEffect } from "react";
import "./ClientSignUp.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../../connectApi'
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
const [otpButtonText,setOtpButtonText]=useState("Sent OTP")
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
}else if(timer===0 && otpButtonText !== "Sent OTP"){
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
      return toast.success("OTP Sent SuccessFuly")
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
    }
  } catch (error) {
    toast.error(error.message)
  }
}
  return (
    <div className="clientSignUp">
      <div className="clientSignUpContainer">
        {/* Left Side - Content */}
        <div className="clientSignUpContent">
          <p>
            🚀 <span>Find top-tier talent</span> for your projects!  
            Whether you're looking for designers, developers, or content creators,  
            <span>build your dream team</span> today and get the job done with <span>expert freelancers.</span>  
            <br /><br /> Sign up now and start hiring! 🎯
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="clientSignUpForm">
          <div className="form">
            <input type="text" placeholder="Name" required onChange={nameHandler} />
            <div className="error">{nameError}</div>

            <div className="email">
            <input type="email" placeholder="Email" required onChange={emailHandler}/>
            <button onClick={sentOtp} disabled={isDisabled}>{otpButtonText}</button>
            </div>
            <div className="error">{emailError}</div>

<div className="otpVerify">
  <input type="text" placeholder="OTP" onChange={otpHandler}/>
  <button onClick={verifyOtp}>{verifyButton}</button>
</div>
<div className="error">{otpError}</div>

            <input type="password" placeholder="Password" required onChange={passwordHandler}/>
            <div className="error">{passwordError}</div>
            <input type="password" placeholder="Confirm Password" required onChange={confirmHandler}/>
<div className="error">{confirmError}</div>
            {/* Country Select */}
            <select value={selectedCountry} onChange={handleCountryChange} required>
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country.name}>
                  {country.name} ({country.dialCode})
                </option>
              ))}
            </select>
<div className="error">{countryError}</div>
            {/* Phone Number */}
            <div className="formPhone">
              <input type="text" value={phoneCode} readOnly className="phoneCode" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
<div className="error">{phoneError}</div>
            <button onClick={submitForm}>Sign Up as Client</button>
            <div className="al">
              <p>Already Have an Account? <span onClick={toClientLogin}>Login</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
