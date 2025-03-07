import React from 'react'
import { FreelancerProfile } from '../../Freelancer/FreelancerProfile/FreelancerProfile'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const FreelancerProfilePage = () => {
  return (
    <div>
      <FreelancerNavbar/>
      <FreelancerProfile/>
           <FrontPageFooter/>
    </div>
  )
}
