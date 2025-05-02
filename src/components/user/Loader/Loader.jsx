import React, { useEffect, useState } from 'react';

export default function SimpleLoader() {
  const [dots, setDots] = useState('');
  
  // Animate the dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      {/* Single spinner circle */}
      <div className="w-6 h-6 mr-3 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      
      {/* Simple loading text */}
      <span className="text-gray-700 font-medium">
        Loading{dots}
      </span>
    </div>
  );
}