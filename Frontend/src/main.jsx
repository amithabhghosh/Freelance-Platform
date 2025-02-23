import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
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

const router=createBrowserRouter([

 
    {path:"/",element:<FrontPage/>},
    {path:"/clientSignUp",element:<ClientSignUpPage/>},
    {path:"/clientLogin",element:<ClientLoginPage/>},
    {path:"/adminLogin",element:<AdminLoginPage/>},
    {path:"/freelancerSignUp",element:<FreelancerSignUpPage/>},
    {path:"/freelancerLogin",element:<FreelancerLoginPage/>},

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
  </ClientAuthRoutes>}

])

createRoot(document.getElementById('root')).render(

<ContextProvider>
<RouterProvider router={router} />
<ToastContainer />
</ContextProvider>

   
 


 
)
