import React from 'react'
import { ClientNavbar } from '../../Clients/ClientNavbar/ClientNavbar'
import { ClientJobPost } from '../../Clients/ClientJobPost/ClientJobPost'
import { FrontPageFooter } from '../../CommonPage/FrontPageComponents/FrontPageFooter/FrontPageFooter'

export const ClientJobPostPage = () => {
  return (
    <div>
        <ClientNavbar/>
        <ClientJobPost/>
        <FrontPageFooter/>
    </div>
  )
}
