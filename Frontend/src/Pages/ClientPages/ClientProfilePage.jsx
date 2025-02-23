import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientProfile } from '../../Clients/ClientProfile/ClientProfile'

export const ClientProfilePage = () => {
  return (
    <div>
      <ClientNavbar/>
      <ClientProfile/>
    </div>
  )
}
