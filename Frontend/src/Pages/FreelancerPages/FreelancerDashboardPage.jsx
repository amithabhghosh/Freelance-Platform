import React from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerBanner } from '../../Freelancer/FreelancerBanner/FreelancerBanner'
import { FreelancerJobList } from '../../Freelancer/FreelancerJobLIst/FreelancerJobList'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const FreelancerDashboardPage = () => {
  return (
    <div>
      <FreelancerNavbar/>
      <FreelancerBanner/>
      <FreelancerJobList/>
      <FrontPageFooter/>
    </div>
  )
}
