import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import { AdminJobDetails } from '../../Admin/AdminJobDetails/AdminJobDetails'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const AdminJobDetailPage = () => {

  return (
  <div>
    <AdminNavbar/>
    <AdminJobDetails/>
    <FrontPageFooter/>
  </div>
  )
}
