import React, { useState } from 'react';

export default function Rating() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Dummy product
  const product = { id: 123 };

  // Dummy reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "Sarah J.",
      date: "4/15/25",
      title: "Exceeded my expectations!",
      content: "This product is absolutely amazing. The quality is outstanding and it arrived earlier than expected. Would definitely recommend to friends and family.",
      rating: 5
    },
    {
      id: 2,
      author: "Michael T.",
      date: "4/10/25",
      title: "Good but could be better",
      content: "Overall a solid product. Has most features I was looking for, but battery life could be improved. Customer service was helpful when I had questions.",
      rating: 4
    },
    {
      id: 3,
      author: "Elena R.",
      date: "4/2/25",
      title: "Not worth the price",
      content: "I was disappointed with this purchase. The material feels cheap and it doesn't work as advertised. I expected better quality for the premium price.",
      rating: 2
    },
    {
      id: 4,
      author: "James K.",
      date: "3/27/25",
      title: "Perfect for my needs",
      content: "This is exactly what I was looking for. Easy to use, well-designed, and durable. I've used it daily for two weeks with no issues. Very satisfied!",
      rating: 5
    },
    {
      id: 5,
      author: "Priya M.",
      date: "3/15/25",
      title: "Good value for money",
      content: "Reasonably priced and does the job well. Not perfect but definitely worth considering if you're on a budget. Shipping was fast and packaging was secure.",
      rating: 4
    }
  ]);

  const nextSlide = () => {
    setCurrentSlide(current => (current === reviews.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(current => (current === 0 ? reviews.length - 1 : current - 1));
  };

  const renderStars = (count) => {
    return Array(count).fill().map((_, index) => (
      <span key={index} className="text-red-600">★</span>
    ));
  };

  const renderEmptyStars = (count) => {
    return Array(count).fill().map((_, index) => (
      <span key={index} className="text-gray-300">★</span>
    ));
  };

  const renderStarRating = (selectedRating, onClick) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onClick(star)}
        className={`text-2xl ${star <= selectedRating ? 'text-red-600' : 'text-gray-300'}`}
      >
        ★
      </button>
    ));
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Reset form
    setRating(5);
    setTitle('');
    setComment('');
    setSubmitted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAlert(false);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Create a new review
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear().toString().substr(-2)}`;
    
    const newReview = {
      id: reviews.length + 1,
      author: "You",
      date: dateStr,
      title: title,
      content: comment,
      rating: rating
    };
    
    // Add the new review to the list
    setReviews([...reviews, newReview]);
    setAlert(true);
    setAlertMessage("Review added successfully");
    setSubmitted(true);
  };

  // Calculate overall rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="bg-white text-black w-full py-8 font-sans">
      {alert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 max-w-6xl mx-auto">
          <p>{alertMessage}</p>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">REVIEWS</h1>
          <button 
            onClick={openModal}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Write a Review
          </button>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
          <div className="flex text-2xl">
            {renderStars(Math.floor(averageRating))}
            {renderEmptyStars(5 - Math.floor(averageRating))}
          </div>
          <div className="text-gray-700">{reviews.length} Reviews</div>
        </div>

        {/* Review Cards Section */}
        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="flex-shrink-0 bg-gray-100 border border-gray-200 rounded-lg p-6 w-64 h-80 transition-transform duration-300"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  position: 'relative',
                  left: index * 280 + 'px'
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-lg">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                
                <div className="flex text-red-500 mb-4">
                  {renderStars(review.rating)}
                  {renderEmptyStars(5 - review.rating)}
                </div>

                <h3 className="text-xl font-medium mb-4 leading-tight">{review.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{review.content}</p>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full 
              flex items-center justify-center shadow-md z-10 border border-gray-200"
            onClick={prevSlide}
          >
            ←
          </button>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full 
              flex items-center justify-center shadow-md z-10 border border-gray-200"
            onClick={nextSlide}
          >
            →
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {submitted ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                <p className="mb-6">Your review has been submitted successfully.</p>
                <button
                  onClick={closeModal}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Write a Review</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">
                      {renderStarRating(rating, setRating)}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Summarize your experience"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="comment" className="block text-gray-700 mb-2">Review</label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                      placeholder="Tell us more about your experience with this product..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-700 mr-4 px-4 py-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                      disabled={!title || !comment}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}