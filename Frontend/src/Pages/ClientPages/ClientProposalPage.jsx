import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientProposalList } from '../../Clients/ClientProposalList/ClientProposalList'

export const ClientProposalPage = () => {
  return (
    <div>
        <ClientNavbar/>
        <ClientProposalList/>
    </div>
  )
}
