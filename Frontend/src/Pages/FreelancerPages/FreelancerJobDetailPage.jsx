import React from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerJobDetails } from '../../Freelancer/FreelancerJobDetails/FreelancerJobDetails'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const FreelancerJobDetailPage = () => {
  return (
    <div>
        <FreelancerNavbar/>
        <FreelancerJobDetails/>
        <FrontPageFooter/>
    </div>
  )
}
