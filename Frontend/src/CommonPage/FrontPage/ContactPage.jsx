import React from 'react'
import { FrontPageNavbar } from '../FrontPageComponents/FrontPageNavbar/FrontPageNavbar'
import { Contact } from '../FrontPageComponents/Contact/Contact'
import { FrontPageFooter } from '../FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const ContactPage = () => {
  return (
    <div>
        <FrontPageNavbar/>
        <Contact/>
        <FrontPageFooter/>
    </div>
  )
}
