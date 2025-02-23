import React from 'react'
import './AdminJobCard.css'
import logo from '../../assets/images/NavbarLogo.png'
export const AdminJobCard = (props) => {
  return (
    <div className='AdminJobCard'>
        <div className="adminJobLogo">
            <img src={logo} alt="" />
        </div>
<div className="jobCrad">
    <p>Title: <span>{props.title}</span></p>
    
    <p>Budget: <span>{props.budget}</span>$</p>
<p>status: <span>{props.status}</span></p>
</div>
<div className="deadline">
    <p>Deadline: <span>{props.deadline} Days</span></p>
</div>
    </div>
  )
}
