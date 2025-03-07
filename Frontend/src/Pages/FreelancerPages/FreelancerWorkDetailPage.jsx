import React from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerWorkDetails } from '../../Freelancer/FreelancerWorkDetail/FreelancerWorkDetails'
import { FreelancerAnswerSubmission } from '../../Freelancer/FreelancerAnswerSubmission/FreelancerAnswerSubmission'

import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const FreelancerWorkDetailPage = () => {
  return (
    <div>
        <FreelancerNavbar/>
        <FreelancerWorkDetails/>
      <FrontPageFooter/>
    </div>
  )
}
