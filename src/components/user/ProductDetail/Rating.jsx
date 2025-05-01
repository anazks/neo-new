import React, { useState } from 'react';

export default function Rating() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reviews data - all with the same content to match the design
  const reviews = [
    {
      id: 1,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard for Other Component Makers to Follow",
      content: "Fan controller and it's software are stable and reliable. NZXT components are my priority for my next gaming PC build. Thanks you, NZXT engineers; keep up the great work.",
      rating: 5
    },
    {
      id: 2,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard for Other Component Makers to Follow",
      content: "Fan controller and it's software are stable and reliable. NZXT components are my priority for my next gaming PC build. Thanks you, NZXT engineers; keep up the great work.",
      rating: 5
    },
    {
      id: 3,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard for Other Component Makers to Follow",
      content: "Fan controller and it's software are stable and reliable. NZXT components are my priority for my next gaming PC build. Thanks you, NZXT engineers; keep up the great work.",
      rating: 5
    },
    {
      id: 4,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard for Other Component Makers to Follow",
      content: "Fan controller and it's software are stable and reliable. NZXT components are my priority for my next gaming PC build. Thanks you, NZXT engineers; keep up the great work.",
      rating: 5
    }
  ];

  const nextSlide = () => {
    setCurrentSlide(current => (current === reviews.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(current => (current === 0 ? reviews.length - 1 : current - 1));
  };

  const renderStars = (count) => {
    return Array(count).fill("★").map((star, index) => (
      <span key={index} className="text-red-600">★</span>
    ));
  };

  return (
    <div className="bg-white text-black w-full pt-8 pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <h1 className="text-3xl font-bold mb-2">REVIEWS</h1>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-3xl font-bold">5.0</div>
          <div className="flex text-red-600">
            {renderStars(5)}
          </div>
          <div className="text-gray-700">112 Reviews</div>
        </div>

        {/* Review Cards Section */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-hidden">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="flex-shrink-0 bg-gray-500 text-white rounded-lg p-6 w-64 h-96"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-lg">{review.author}</div>
                  <div className="text-sm text-gray-200">{review.date}</div>
                </div>
                
                <div className="flex text-red-500 mb-4">
                  {renderStars(review.rating)}
                </div>

                <h3 className="text-xl font-medium mb-4 leading-tight">{review.title}</h3>
                <p className="text-sm leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrow */}
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full 
              flex items-center justify-center shadow-md z-10"
            onClick={nextSlide}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}