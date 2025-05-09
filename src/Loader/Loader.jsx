import React from 'react';

export default function SimpleSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-transparent">
      <div className="relative">
        {/* Outer spinner */}
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* Inner spinner (rotating in opposite direction) */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-gray-200 border-b-blue-400 rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <div className="mt-4 text-center text-gray-700 font-semibold">Loading...</div>
      </div>
    </div>
  );
}