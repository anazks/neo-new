import React, { useState } from 'react';
import './Rating.css';

function Rating() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const reviews = [
    {
      id: 1,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
      rating: 5
    },
    {
      id: 2,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
      rating: 5
    },
    {
      id: 3,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
      rating: 5
    },
    {
      id: 4,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
      rating: 5
    },
    {
      id: 5,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
      rating: 5
    },
    {
      id: 6,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
      rating: 5
    },
    {
      id: 7,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
      rating: 5
    },
    {
      id: 8,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
      rating: 5
    },
    {
      id: 9,
      author: "Ryan",
      date: "12/04/23",
      title: "NZXT Sets the Standard",
      content: "Fan controller and it's software are stable and reliable.",
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
      <span key={index} className="star">★</span>
    ));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`rating-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme} className="theme-button">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      
      <h1 className="rating-title">REVIEWS</h1>
      
      <div className="rating-summary">
        <div className="rating-score">5.0</div>
        <div className="rating-stars">★★★★★</div>
        <div className="rating-count">115 Reviews</div>
      </div>

      <div className="reviews-carousel">
        <div className="carousel-track">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`review-card ${index === currentSlide ? 'active' : ''}`}
              style={{
                transform: `translateX(calc(${100 * (index - currentSlide)}% + ${(index - currentSlide) * 20}px))`
              }}
            >
              <div className="review-header">
                <div className="review-author">
                  <div>{review.author}</div>
                  <div className="review-stars">{renderStars(review.rating)}</div>
                </div>
                <div className="review-date">{review.date}</div>
              </div>

              <h3 className="review-title">{review.title}</h3>
              <p className="review-content">{review.content}</p>
            </div>
          ))}
        </div>

        <button className="carousel-button prev" onClick={prevSlide}>❮</button>
        <button className="carousel-button next" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
}

export default Rating;