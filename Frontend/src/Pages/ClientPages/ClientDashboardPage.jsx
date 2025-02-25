import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientBanner } from '../../Clients/ClientBanner/ClientBanner'
import { JobCard } from '../../Clients/JobCard/JobCard'
import { ClientJobDash } from '../../Clients/ClientJobDash/ClientJobDash'

export const ClientDashboardPage = () => {
  return (
    <div>
      <ClientNavbar/>
      <ClientBanner/>
  <ClientJobDash/>
    </div>
  )
}
