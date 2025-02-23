import React from 'react'
import { FrontPageNavbar } from '../FrontPageComponents/FrontPageNavbar/FrontPageNavbar'
import { FrontPageBanner } from '../FrontPageComponents/FrontPageBanner/FrontPageBanner'
import { FrontPageColums } from '../FrontPageComponents/FrontPageColums/FrontPageColums'
import { MiniBanner } from '../FrontPageComponents/MIniBanner/MiniBanner'
import { FrontPageFooter } from '../FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const FrontPage = () => {
  return (
    <div>
        <FrontPageNavbar/>
        <FrontPageBanner/>
        <FrontPageColums/>
        <MiniBanner/>
        <FrontPageFooter/>
    </div>
  )
}
