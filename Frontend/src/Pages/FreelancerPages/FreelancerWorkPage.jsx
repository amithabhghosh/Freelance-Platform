import React from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerWork } from '../../Freelancer/FreelancerWork/FreelancerWork'

import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const FreelancerWorkPage = () => {
  return (
    <div>
        <FreelancerNavbar/>
        <FreelancerWork/>
       <FrontPageFooter/>
    </div>
  )
}
