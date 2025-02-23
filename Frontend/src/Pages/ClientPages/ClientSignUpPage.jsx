import React from 'react'
import { ClientSignUp } from '../../Clients/ClientSignUp/ClientSignUp'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'
import { FrontPageNavbar } from '../../CommonPage/FrontPageComponents/FrontPageNavbar/FrontPageNavbar'

export const ClientSignUpPage = () => {
  return (
    <div>
        <FrontPageNavbar/>
        <ClientSignUp/>
        <FrontPageFooter/>
    </div>
  )
}
