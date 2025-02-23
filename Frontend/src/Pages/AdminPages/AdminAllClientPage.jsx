import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import { AdminClientList } from '../../Admin/AdminClientList/AdminClientList'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const AdminAllClientPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminClientList/>
        <FrontPageFooter/>
    </div>
  )
}
