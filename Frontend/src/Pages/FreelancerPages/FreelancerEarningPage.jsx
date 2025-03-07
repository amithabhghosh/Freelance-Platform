import React from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerEarningDetail } from '../../Freelancer/FreelancerEarningDetails/FreelancerEarningDetail'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const FreelancerEarningPage = () => {
  return (
    <div>
         <FreelancerNavbar/>
<FreelancerEarningDetail/>
<FrontPageFooter/>
    </div>
  )
}
