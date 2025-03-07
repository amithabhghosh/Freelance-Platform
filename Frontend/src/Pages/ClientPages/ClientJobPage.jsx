import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientJob } from '../../Clients/ClientJob/ClientJob'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const ClientJobPage = () => {
  return (
    <div>
        <ClientNavbar/>
        <ClientJob/>
        <FrontPageFooter/>
    </div>
  )
}
