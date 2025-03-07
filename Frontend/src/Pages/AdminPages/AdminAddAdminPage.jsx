import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import { AdminAddAdmin } from '../../Admin/AdminAddAdmin/AdminAddAdmin'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const AdminAddAdminPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminAddAdmin/>
        <FrontPageFooter/>
    </div>
  )
}
