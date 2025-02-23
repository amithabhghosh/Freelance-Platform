import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import { AdminLogin } from '../../Admin/AdminLogin/AdminLogin'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const AdminLoginPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminLogin/>
        <FrontPageFooter/>
    </div>
  )
}
