import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import { AdminEarnings } from '../../Admin/AdminEarnings/AdminEarnings'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const AdminEarningsPage = () => {
  return (
    <div>
            <AdminNavbar/>
            <AdminEarnings/>
            <FrontPageFooter/>
    </div>
  )
}
