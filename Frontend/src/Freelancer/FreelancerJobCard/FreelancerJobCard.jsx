import React from 'react'
import './FreelancerJobCard.css'
import logo from '../../assets/images/NavbarLogo.png'
import { useNavigate } from 'react-router-dom'
export const FreelancerJobCard = (props) => {
    const navigate=useNavigate()
const toJobDetails=()=>{
navigate(`/freelancer/${props.id}`)
}

  return (
    <div className='AdminJobCard' onClick={toJobDetails}>
           <div className="adminJobLogo">
               <img src={logo} alt="" />
           </div>
   <div className="jobCrad">
       <p>Title: <span>{props.title}</span></p>
       
       <p>Budget: <span>{props.budget}</span>$</p>
   
   </div>
   <div className="deadline">
       <p>Deadline: <span>{props.deadline} Days</span></p>
   </div>
       </div>
  )
}
