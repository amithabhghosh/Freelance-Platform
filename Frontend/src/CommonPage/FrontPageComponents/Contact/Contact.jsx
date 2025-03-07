import React from 'react'
import contactimage from '../../../assets/images/contactimage.webp'
export const Contact = () => {
  return (
    <section className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8 mt-12 sm:mt-16">
  

    <div className="w-full sm:w-3/4 md:w-1/2 flex justify-center">
      <img
        src={contactimage}
        alt="Contact Us"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
  
    
    <div className="w-full sm:w-3/4 md:w-1/2 bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#00d4ff]">Contact Us</h2>
      <p className="text-gray-200 mb-4 text-base sm:text-lg">
        Feel free to reach out to us for any inquiries or support.
      </p>
  
    
      <div className="mb-4">
        <p className="font-semibold text-lg text-white">📍 Address:</p>
        <p className="text-gray-300">123 Main Street, California, USA</p>
      </div>
  

      <div className="mb-4">
        <p className="font-semibold text-lg text-white">📞 Phone:</p>
        <p className="text-gray-300">+123 456 7890</p>
      </div>
  
    
      <div className="mb-4">
        <p className="font-semibold text-lg text-white">✉️ Email:</p>
        <p className="text-gray-300">jobo@gmail.com</p>
      </div>
  
     
      <div className="flex gap-4 mt-4">
        <a href="#" className="text-white text-2xl transition-transform duration-300 hover:text-[#00d4ff] hover:scale-110">
          <ion-icon name="logo-instagram"></ion-icon>
        </a>
        <a href="#" className="text-white text-2xl transition-transform duration-300 hover:text-[#00d4ff] hover:scale-110">
          <ion-icon name="logo-facebook"></ion-icon>
        </a>
        <a href="#" className="text-white text-2xl transition-transform duration-300 hover:text-[#00d4ff] hover:scale-110">
          <ion-icon name="logo-twitter"></ion-icon>
        </a>
      </div>
    </div>
  
  </section>
  
  )
}
