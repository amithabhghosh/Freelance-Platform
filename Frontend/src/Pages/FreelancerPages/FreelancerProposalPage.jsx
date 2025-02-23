import React from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerProposal } from '../../Freelancer/FreelancerProposals/FreelancerProposal'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const FreelancerProposalPage = () => {
  return (
    <div>
    <FreelancerNavbar/>
    <FreelancerProposal/>
    <FrontPageFooter/>
    </div>
  )
}
