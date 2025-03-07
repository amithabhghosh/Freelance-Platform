import React, { useState } from 'react'
import { FreelancerNavbar } from '../../Freelancer/FreelancerNavbar/FreelancerNavbar'
import { FreelancerBanner } from '../../Freelancer/FreelancerBanner/FreelancerBanner'
import { FreelancerJobList } from '../../Freelancer/FreelancerJobLIst/FreelancerJobList'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const FreelancerDashboardPage = () => {
  const [searchQuery, setSearchQuery] =useState("")
  return (
    <div>
      <FreelancerNavbar/>
      <FreelancerBanner setSearchQuery={setSearchQuery}/>
      <FreelancerJobList searchQuery={searchQuery}/>
      <FrontPageFooter/>
    </div>
  )
}
