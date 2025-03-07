import React from 'react'
import { AdminNavbar } from '../../Admin/AdminNavbar/AdminNavbar'
import {AdminClientDetail} from '../../Admin/AdminClientDetail/AdminClientDetail'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const AdminClientDetailPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminClientDetail/>
        <FrontPageFooter/>
    </div>
  )
}
