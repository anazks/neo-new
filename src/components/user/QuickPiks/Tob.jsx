import React from 'react'
import City from '../../../Images/city.png'
function Tob() {
  return (
    <div className="flex flex-row  rounded-lg overflow-hidden shadow-lg bg-gray-100" style={{ height: '200px' }}>
      {/* Left side with gaming setup image */}
      <div className="w-2/3 relative">
        <div className="bg-black h-48 md:h-64 w-full rounded-l-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 mix-blend-overlay"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src={City} 
              alt="Gaming setup with multiple computers in a dark room with RGB lighting" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
      
      {/* Right side with text and button */}
      <div className="w-1/3 p-4 bg-gray-50 flex flex-col justify-between">
        <div>
          <p className="text-xs uppercase font-semibold text-gray-500">Gaming Squad</p>
          <h2 className="text-xl font-bold text-gray-800">Radicle Gaming</h2>
          <p className="text-sm text-gray-600">Exclusive partnership</p>
        </div>
        
        <div className="mt-4">
          <p className="text-xs text-gray-600 mb-2">Subscribe for Exclusive Content</p>
          <button className="bg-black text-white rounded-full px-4 py-2 flex items-center justify-center space-x-2 w-full">
            <span>Subscribe</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        
        {/* Right arrow for navigation */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="bg-white rounded-full p-2 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tob