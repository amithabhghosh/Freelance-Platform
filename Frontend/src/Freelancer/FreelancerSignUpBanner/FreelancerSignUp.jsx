import React, { useState, useEffect } from "react";
import "./FreelancerSignUp.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from '../../connectApi'
export const FreelancerSignUp = () => {
const navigate=useNavigate()
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
const [buttonText,setButtonText]=useState("Sent OTP")
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
}else if(timer===0 && buttonText !== "Sent OTP"){
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
    const response=await API.post("/freelancer/verifyOtp",{email,otp},{
      headers: { "Content-Type": "application/json" } 
    })
   console.log(response.data)
   if(response.data.success){
    toast.success("OTP VERIFIED")
    setOtpButtonText("VERIFIED")
    setOtpVerified(true)
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
    <div className="freelancerSignUp">
      <div className="freelancerSignUpContainer">
        {/* Left Side - Signup Content */}
        <div className="freelancerSignUpContent">
          <p>
            🚀 Turn your <span>skills</span> into income!  
            Join the fastest-growing <span>freelancing</span> platform.  
            Work <span>remotely</span>, set your own rates, and get paid securely!  
            <br /><br /> Sign up & start earning today! 💼
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="freelancerSignUpForm">
          <div className="form">
            <input type="text" placeholder="Name" required onChange={nameHandle}/>
            <div className="error">{nameError}</div>
            <div className="email">
            <input type="email" placeholder="Email" required onChange={emailHandeler}/>
            <button onClick={otpSent} disabled={isDisabled}>{buttonText}</button>
            </div>
            <div className="error">{emailError}</div>
            <div className="otpVerify">
            <input type="text" placeholder="OTP" onChange={otpHandle}/>
            <button onClick={verifyOtp}>{otpButtonText}</button>
            </div>
            <div className="error">{otpError}</div>
            <input type="password" placeholder="Password" required onChange={passwordHandler}/>
            <div className="error">{passwordError}</div>
            <input type="password" placeholder="Confirm Password" required onChange={confirmHandler}/>
            <div className="error">{confirmPasswordError}</div>
<input type="text"  placeholder="Skills" onChange={skillHandler}/>
            {/* Country Selection */}
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
            <div className="error">{phoneNumberError}</div>

            <button type="submit" onClick={submitForm}>Sign Up As Freelancer</button>
          </div>
          <div className="alreadyAccount">
            <p>Already Have an Account? <span onClick={toFreelancerLogin}>Login</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
