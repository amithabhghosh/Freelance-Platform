import React from 'react'
import './AdminClientCard.css'
import logo from '../../assets/images/NavbarLogo.png'
export const AdminClientCard = (props) => {
  return (
    <div className='AdminClientCard'>
        <div className="adminLogo">
            <img src={logo} alt="" />
        </div>
        <div className="profileImageAndName">
            <img src={props.profile} alt="" />
        <p>{props.name}</p>
        </div>
        <div className="clientPersonal">
            <p>Email: {props.email} </p>
            <p>Phone: {props.phone}</p>
            <p>Country: {props.country}</p>
        </div>
    </div>
  )
}
