import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientWorkDetail } from '../../Clients/ClientWorkDetail/ClientWorkDetail'

import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
export const ClientWorDetailPage = () => {
  return (
    <div style={{position:"relative"}}>
         <ClientNavbar/>
         <ClientWorkDetail/>
         
         <FrontPageFooter/>
    </div>
  )
}
