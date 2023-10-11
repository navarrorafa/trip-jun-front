import React from 'react'
import { FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';



export const IconsContact = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center h-full">
   
      <p className="flex items-center justify-center md:justify-start mb-2">
        <FaPhone className="text-blue-500 mr-2" />
        Teléfono: (34) 663 33 33 xx
      </p>
      <p className="flex items-center justify-center md:justify-start mb-2">
        <FaEnvelope className="text-blue-500 mr-2" />
        info@example.com
      </p>
      <p className="flex items-center justify-center md:justify-start">
        <FaInstagram className="text-blue-500 mr-2" />
        @example
      </p>
    </div>
  )
}
