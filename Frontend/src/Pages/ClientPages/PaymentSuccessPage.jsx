import React from 'react'
import { Link } from 'react-router-dom'
export const PaymentSuccessPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Payment Successful! 🎉</h1>
            <p>Thank you for your purchase.</p>
            <Link to="/clientDashboard" style={{ textDecoration: "none", fontSize: "18px", color: "blue" }}>
                Go back to Home
            </Link>
        </div>
  )
}
