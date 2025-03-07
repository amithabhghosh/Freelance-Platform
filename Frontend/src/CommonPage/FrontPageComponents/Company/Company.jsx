import React from 'react'
import Company from '../../../assets/images/Company page banner.webp'
import connect from '../../../assets/images/connect.png'
import couple from '../../../assets/images/couple.png'
import scales from '../../../assets/images/scales.png'
import { useNavigate } from 'react-router-dom'

export const Jobo = () => {
  const navigate=useNavigate()

  return (
    <div className="p-6 sm:p-10 md:p-12 lg:p-20 bg-gray-50 mt-20 sm:mt-16 lg:mt-20">
  
 
  <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">

    <div className="max-w-lg text-center md:text-left">
      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Join our team</h3>
      <h5 className="text-gray-600 mt-4 text-base sm:text-lg">
        Discover remote-friendly and flexible opportunities on Jobo. Join our mission to connect people with others that empower them to earn, grow, and simplify their work-life journey.
      </h5>
      <button 
        onClick={() => navigate("/freelancerLogin")} 
        className="mt-6 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
      >
        OPPORTUNITIES
      </button>
    </div>

    
    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-auto flex justify-center">
      <img src={Company} alt="Company" className="w-full max-w-sm rounded-lg shadow-lg" />
    </div>
  </div>

 
  <div className="mt-12 sm:mt-16 text-center">
    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Jobo: Redefining the Future of Work</h3>
    <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
      We connect people worldwide with opportunities to earn, grow, and succeed. Our platform empowers individuals to access flexible work and achieve their goals. Join us in shaping a future of work that's:
    </p>
  </div>

  
  <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
    {[
      { img: connect, title: "Connected", desc: "We bring freelancers and businesses together, no matter the distance. Through our platform, people connect across borders and time zones to create opportunities and achieve success." },
      { img: couple, title: "Equitable", desc: "We're committed to empowering everyone, Jobo is a place where talent and hard work lead to opportunities, regardless of background or location." },
      { img: scales, title: "Empowering", desc: "We believe work should fit your life. With Jobo, you decide where and how you work, giving you the freedom to grow on your own terms." }
    ].map((item, index) => (
      <div key={index} className="p-6 bg-white shadow-lg rounded-lg transition-all hover:scale-105 hover:shadow-xl text-center">
        <img src={item.img} alt={item.title} className="w-14 sm:w-16 mx-auto" />
        <p className="text-lg sm:text-xl font-semibold text-gray-800 mt-4">{item.title}</p>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">{item.desc}</p>
      </div>
    ))}
  </div>

</div>

  )
}
