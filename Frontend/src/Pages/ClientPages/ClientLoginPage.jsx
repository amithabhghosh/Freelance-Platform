import React from 'react'
import { FrontPageNavbar } from '../../CommonPage/FrontPageComponents/FrontPageNavbar/FrontPageNavbar'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
import { ClientLogin } from '../../Clients/ClientLogin/ClientLogin'

export const ClientLoginPage = () => {
  return (
    <div>
        <FrontPageNavbar/>
      <ClientLogin/>
        <FrontPageFooter/>
    </div>
  )
}
