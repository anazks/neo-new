import React, { useEffect, useState, useRef } from 'react';
import { getRatings, addRatings } from '../../../Services/userApi';

export default function Rating({ product }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [reviews, setReviews] = useState([]);

  const prevProductId = useRef(null);

  const fetchReviews = async (productId) => {
    try {
      const response = await getRatings(productId);
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    if (product?.id && product.id !== prevProductId.current) {
      prevProductId.current = product.id;
      fetchReviews(product.id);
    }
  }, [product?.id]);

  const handleSubmit = async () => {
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear().toString().slice(-2)}`;

    const newReview = {
      id: reviews.length + 1,
      author: "You",
      date: dateStr,
      title,
      content: comment,
      rating,
    };

    try {
      const response = await addRatings({
        product_id: product.id,
        rating,
        title,
        comment,
      });

      if (response.status === 400) {
        setAlertMessage("Review already exists");
        setAlert(true);
        return;
      }

      setReviews([...reviews, newReview]);
      setAlertMessage("Review added successfully");
      setAlert(true);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting review:", error);
      setAlertMessage("An error occurred while submitting your review.");
      setAlert(true);
    }
  };

  const renderStars = (count) =>
    Array(count).fill().map((_, i) => (
      <span key={i} className="text-red-600">★</span>
    ));

  const renderEmptyStars = (count) =>
    Array(count).fill().map((_, i) => (
      <span key={i} className="text-gray-300">★</span>
    ));

  const renderStarRating = (selected, onClick) =>
    [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onClick(star)}
        className={`text-2xl ${star <= selected ? 'text-red-600' : 'text-gray-300'}`}
      >
        ★
      </button>
    ));

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="bg-white text-black w-full py-8 font-sans">
      {alert && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 max-w-6xl mx-auto">
          <p>{alertMessage}</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">REVIEWS</h1>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setRating(5);
              setTitle('');
              setComment('');
              setSubmitted(false);
              setAlert(false);
            }}
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

        <div className="relative overflow-hidden">
          <div className="flex gap-6 transition-transform duration-300" style={{ transform: `translateX(-${currentSlide * 280}px)` }}>
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 border border-gray-200 rounded-lg p-6 w-64 h-80 flex-shrink-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-lg">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
                <div className="flex text-red-500 mb-4">
                  {renderStars(review.rating)}
                  {renderEmptyStars(5 - review.rating)}
                </div>
                <h3 className="text-xl font-medium mb-4">{review.title}</h3>
                <p className="text-sm text-gray-700">{review.content}</p>
              </div>
            ))}
          </div>

          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full shadow-md border border-gray-200"
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
          >
            ←
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full shadow-md border border-gray-200"
            onClick={() => setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
          >
            →
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {submitted ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
                <p className="mb-6">Your review has been submitted successfully.</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Write a Review</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">{renderStarRating(rating, setRating)}</div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Summarize your experience"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Review</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
                      placeholder="Tell us about your experience..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-700 mr-4 px-4 py-2">Cancel</button>
                    <button
                      onClick={handleSubmit}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
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
