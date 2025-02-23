import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientProposalDetail } from '../../Clients/ClientProposalDetails/ClientProposalDetail'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const ClientProposalDetailPage = () => {
  return (
    <div>
        <ClientNavbar/>
        <ClientProposalDetail/>
        <FrontPageFooter/>
    </div>
  )
}
