import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import { AdminFreelancersList } from '../../Admin/AdminFreelancersLIst/AdminFreelancersList'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const AdminAllFreelancerPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminFreelancersList/>
        <FrontPageFooter/>
    </div>
  )
}
