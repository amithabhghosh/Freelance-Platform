import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientJobDetail } from '../../Clients/ClientJobDetail/ClientJobDetail'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const ClientJobDetailPage = () => {
  return (
    <div>
        <ClientNavbar/>
        <ClientJobDetail/>
        <FrontPageFooter/>
    </div>
  )
}
