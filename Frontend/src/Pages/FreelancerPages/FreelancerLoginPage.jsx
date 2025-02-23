import React from 'react'
import { FrontPageNavbar } from '../../CommonPage/FrontPageComponents/FrontPageNavbar/FrontPageNavbar'
import { FreelancerLogin } from '../../Freelancer/FreelancerLoginBanner/FreelancerLogin'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const FreelancerLoginPage = () => {
  return (
    <div>
        <FrontPageNavbar/>
        <FreelancerLogin/>
        <FrontPageFooter/>
    </div>
  )
}
