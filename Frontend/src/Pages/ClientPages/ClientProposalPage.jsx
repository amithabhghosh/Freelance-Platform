import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientProposalList } from '../../Clients/ClientProposalList/ClientProposalList'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const ClientProposalPage = () => {
  return (
    <div> 
        <ClientNavbar/>
        <ClientProposalList/>
        <FrontPageFooter/>
    </div>
  )
}
