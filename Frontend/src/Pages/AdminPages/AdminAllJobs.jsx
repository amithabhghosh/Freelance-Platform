import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import { AdminJobList } from '../../Admin/AdminJobList/AdminJobList'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const AdminAllJobs = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminJobList/>
        <FrontPageFooter/>
    </div>
  )
}
