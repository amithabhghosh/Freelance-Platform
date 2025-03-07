import React from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerProposal } from '../../Freelancer/FreelancerProposals/FreelancerProposal'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const FreelancerProposalPage = () => {
  // setInterval(() => {
  //   checkTokenExpiration();
  // }, 5 * 60 * 1000);
  return (
    <div>
    <FreelancerNavbar/>
    <FreelancerProposal/>
    <FrontPageFooter/>
    </div>
  )
}
