import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import { AdminFreelancerDetails } from '../../Admin/AdminFreelancerDetails/AdminFreelancerDetails'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const AdminFreelancer = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminFreelancerDetails/>
        <FrontPageFooter/>
    </div>
  )
}
