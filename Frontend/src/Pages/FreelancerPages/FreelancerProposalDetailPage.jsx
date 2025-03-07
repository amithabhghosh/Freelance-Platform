import React from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerProposalDetails } from '../../Freelancer/FreelancerProposalDetails/FreelancerProposalDetails'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const FreelancerProposalDetailPage = () => {
  return (
    <div>
        <FreelancerNavbar/>
        <FreelancerProposalDetails/>
        <FrontPageFooter/>
    </div>
  )
}
