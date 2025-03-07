import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation(); // Detects route changes

  useEffect(() => {
  
    window.scrollTo({ top: 0, behavior: "smooth" });// Ensure it scrolls to top instantly
  }, [pathname]); /// Runs when the route changes
  
    
  return (
    <>
 
    <Outlet/>
  </>
  )
}
