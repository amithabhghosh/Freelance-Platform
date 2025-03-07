import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import {BrowserRouter, createBrowserRouter,RouterProvider, useLocation} from 'react-router-dom'
import { FrontPage } from './CommonPage/FrontPage/FrontPage.jsx'
import { ClientSignUpPage } from './Pages/ClientPages/ClientSignUpPage.jsx'
import { ClientLoginPage } from './Pages/ClientPages/ClientLoginPage.jsx'
import { FreelancerSignUpPage } from './Pages/FreelancerPages/FreelancerSignUpPage.jsx'
import { FreelancerLoginPage } from './Pages/FreelancerPages/FreelancerLoginPage.jsx'
import { FreelancerDashboardPage } from './Pages/FreelancerPages/FreelancerDashboardPage.jsx';
import { ClientDashboardPage } from './Pages/ClientPages/ClientDashboardPage.jsx';
import { FreelancerAuthRoutes } from './AuthRoutes/FreelancerAuthRoutes.jsx';
import { ClientAuthRoutes } from './AuthRoutes/ClientAuthRoutes.jsx';
import { FreelancerProfilePage } from './Pages/FreelancerPages/FreelancerProfilePage.jsx';
import { ClientProfilePage } from './Pages/ClientPages/ClientProfilePage.jsx';
import ContextProvider from './ContextAPI/ContextAPI.jsx';
import { ClientJobPostPage } from './Pages/ClientPages/ClientJobPostPage.jsx';
import { AdminLoginPage } from './Pages/AdminPages/AdminLoginPage.jsx';
import { AdminAuthRoutes } from './AuthRoutes/AdminAuthRoutes.jsx';
import { AdminAllFreelancerPage } from './Pages/AdminPages/AdminAllFreelancerPage.jsx';
import { AdminAllClientPage } from './Pages/AdminPages/AdminAllClientPage.jsx';
import { AdminAllJobs } from './Pages/AdminPages/AdminAllJobs.jsx';
import { AdminFreelancer } from './Pages/AdminPages/AdminFreelancer.jsx';
import { FreelancerJobDetailPage } from './Pages/FreelancerPages/FreelancerJobDetailPage.jsx';
import { FreelancerProposalPage } from './Pages/FreelancerPages/FreelancerProposalPage.jsx';
import { FreelancerProposalDetailPage } from './Pages/FreelancerPages/FreelancerProposalDetailPage.jsx';
import { ClientProposalPage } from './Pages/ClientPages/ClientProposalPage.jsx';
import { ClientProposalDetailPage } from './Pages/ClientPages/ClientProposalDetailPage.jsx';
import { PaymentSuccessPage } from './Pages/ClientPages/PaymentSuccessPage.jsx';
import { PayementCancelPage } from './Pages/ClientPages/PayementCancelPage.jsx';
import { ClientWorkPage } from './Pages/ClientPages/ClientWorkPage.jsx';
import { FreelancerWorkPage } from './Pages/FreelancerPages/FreelancerWorkPage.jsx';
import { FreelancerWorkDetailPage } from './Pages/FreelancerPages/FreelancerWorkDetailPage.jsx';
import { ClientWorDetailPage } from './Pages/ClientPages/ClientWorDetailPage.jsx';
import { FreelancerEarningPage } from './Pages/FreelancerPages/FreelancerEarningPage.jsx';
import { AdminEarningsPage } from './Pages/AdminPages/AdminEarningsPage.jsx';
import { AdminAddAdminPage } from './Pages/AdminPages/AdminAddAdminPage.jsx';
import { AdminClientDetailPage } from './Pages/AdminPages/AdminClientDetailPage.jsx';
import { AdminJobDetailPage } from './Pages/AdminPages/AdminJobDetailPage.jsx';

import { ClientJobDetailPage } from './Pages/ClientPages/ClientJobDetailPage.jsx';
import { ClientJobPage } from './Pages/ClientPages/ClientJobPage.jsx';
import { CompanyPage } from './CommonPage/FrontPage/CompanyPage.jsx';
import { ContactPage } from './CommonPage/FrontPage/ContactPage.jsx';
import { ScrollToTop } from './ScrollToTop.jsx';

const router=createBrowserRouter([

 {path: "/",
  element: <ScrollToTop/>, // Wrap all routes with Layout
  children:[
    {path:"/",element:<FrontPage/>},
    {path:"/clientSignUp",element:<ClientSignUpPage/>},
    {path:"/clientLogin",element:<ClientLoginPage/>},
    {path:"/adminLogin",element:<AdminLoginPage/>},
    {path:"/freelancerSignUp",element:<FreelancerSignUpPage/>},
    {path:"/freelancerLogin",element:<FreelancerLoginPage/>},
{path:"/jobo",element:<CompanyPage/>},
{path:"/job/contact",element:<ContactPage/>},

    {path:"/freelancerDashboard",element:<FreelancerAuthRoutes>
      <FreelancerDashboardPage/>
    </FreelancerAuthRoutes>},
    {path:"/clientDashboard",element:<ClientAuthRoutes>
      <ClientDashboardPage/>
    </ClientAuthRoutes>},
    {path:"/freelancerProfile",element:<FreelancerAuthRoutes>
      <FreelancerProfilePage/>
    </FreelancerAuthRoutes>},
    {path:"/clientProfile",element:<ClientAuthRoutes>
      <ClientProfilePage/>
    </ClientAuthRoutes>},
    {path:"/postJob",element:<ClientAuthRoutes>
      <ClientJobPostPage/>
    </ClientAuthRoutes>},
  {path:"/adminFreelancers",element:<AdminAuthRoutes>
    <AdminAllFreelancerPage/>
  </AdminAuthRoutes>},
  {path:"/adminClients",element:<AdminAuthRoutes>
    <AdminAllClientPage/>
  </AdminAuthRoutes>},
  {path:"/adminJobs",element:<AdminAuthRoutes>
    <AdminAllJobs/>
  </AdminAuthRoutes>},
  {path:"/adminFreelancer/:freelancerId",element:<AdminAuthRoutes>
    <AdminFreelancer/>
  </AdminAuthRoutes>},
  {path:"/freelancer/:jobId",element:<FreelancerAuthRoutes>
    <FreelancerJobDetailPage/>
  </FreelancerAuthRoutes>},
  {path:"/freelancer/proposals",element:<FreelancerAuthRoutes>
    <FreelancerProposalPage/>
  </FreelancerAuthRoutes>},
  {path:"/freelancer/proposal/:proposalId",element:<FreelancerAuthRoutes>
    <FreelancerProposalDetailPage/>
  </FreelancerAuthRoutes>},
  {path:"/client/proposals",element:<ClientAuthRoutes>
    <ClientProposalPage/>
  </ClientAuthRoutes>},
  {path:"/client/proposal/:proposalId",element:<ClientAuthRoutes>
    <ClientProposalDetailPage/>
  </ClientAuthRoutes>},
  {path:"/checkout-success/:proposalId",element:<ClientAuthRoutes>
    <PaymentSuccessPage/>
  </ClientAuthRoutes>},
  {path:"/payment_Cancelled/:proposalId",element:<ClientAuthRoutes>
    <PayementCancelPage/>
  </ClientAuthRoutes>},
  {path:"/client/orders",element:<ClientAuthRoutes>
    <ClientWorkPage/>
  </ClientAuthRoutes>},
  {path:"/freelancer/Works",element:<FreelancerAuthRoutes>
    <FreelancerWorkPage/>
  </FreelancerAuthRoutes>},
  {path:"/freelancer/Works/:jobId",element:<FreelancerAuthRoutes>
    <FreelancerWorkDetailPage/>
  </FreelancerAuthRoutes>},
  {path:"/client/Works/:jobId",element:<ClientAuthRoutes>
    <ClientWorDetailPage/>
  </ClientAuthRoutes>},
  {path:"/freelancer/earnings",element:<FreelancerAuthRoutes>
    <FreelancerEarningPage/>
  </FreelancerAuthRoutes>},
  {path:"/admin/earnings",element:<AdminAuthRoutes>
    <AdminEarningsPage/>
  </AdminAuthRoutes>},
  {path:"/admin/addAdmin",element:<AdminAuthRoutes>
    <AdminAddAdminPage/>
  </AdminAuthRoutes>},
  {path:"/admin/clientDetail/:clientId",element:<AdminAuthRoutes>
    <AdminClientDetailPage/>
  </AdminAuthRoutes>},
  {path:"/admin/job/:jobId",element:<AdminAuthRoutes>
    <AdminJobDetailPage/>
  </AdminAuthRoutes>},
  {path:"/client/job/:jobId",element:<ClientAuthRoutes>
    <ClientJobDetailPage/>
  </ClientAuthRoutes>},
  {path:"/client/job/info",element:<ClientAuthRoutes>
    <ClientJobPage/>
      </ClientAuthRoutes>}
  ]}
    

])




createRoot(document.getElementById('root')).render(

  <ContextProvider>
 
    <RouterProvider router={router} future={{ scrollRestoration: true }} />
    <ToastContainer  />
  </ContextProvider>

   
 


 
)
