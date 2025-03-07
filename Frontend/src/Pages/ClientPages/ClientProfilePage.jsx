import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientProfile } from '../../Clients/ClientProfile/ClientProfile'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const ClientProfilePage = () => {
  return (
    <div>
      <ClientNavbar/>
      <ClientProfile/>
      <FrontPageFooter/>
    </div>
  )
}
