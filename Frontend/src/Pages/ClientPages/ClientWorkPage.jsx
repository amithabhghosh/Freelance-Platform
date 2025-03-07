import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientWorkList } from '../../Clients/ClientWorkList.jsx/ClientWorkList'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const ClientWorkPage = () => {
  return (
    <div>
    <ClientNavbar/>
    <ClientWorkList/>
    <FrontPageFooter/>
    </div>
  )
}
