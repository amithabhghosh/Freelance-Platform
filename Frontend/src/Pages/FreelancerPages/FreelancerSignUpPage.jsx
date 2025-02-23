import React from 'react'
import { FrontPageNavbar } from '../../CommonPage/FrontPageComponents/FrontPageNavbar/FrontPageNavbar'
import { FreelancerSignUp } from '../../Freelancer/FreelancerSignUpBanner/FreelancerSignUp'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const FreelancerSignUpPage = () => {
  return (
    <div>
        <FrontPageNavbar/>
      <FreelancerSignUp/>
      <FrontPageFooter/>
    </div>
  )
}
