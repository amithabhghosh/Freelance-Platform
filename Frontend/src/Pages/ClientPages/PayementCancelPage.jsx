import React from 'react'
import { Link } from 'react-router-dom'
export const PayementCancelPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
    <h1>Payment Canceled ❌</h1>
    <p>Your payment was not completed. You can try again.</p>
    <Link to="/clientDashboard" style={{ textDecoration: "none", fontSize: "18px", color: "blue" }}>
        Go Back to Home
    </Link>
</div>
  )
}
