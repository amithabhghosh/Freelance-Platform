import React from 'react'
import { Jobo } from '../FrontPageComponents/Company/Company'
import { FrontPageNavbar } from '../FrontPageComponents/FrontPageNavbar/FrontPageNavbar'
import { FrontPageFooter } from '../FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const CompanyPage = () => {
  return (
    <div>
        <FrontPageNavbar/>
     <Jobo/>
     <FrontPageFooter/>
    </div>
  )
}
