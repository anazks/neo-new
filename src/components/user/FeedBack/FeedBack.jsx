import { useState, useEffect } from "react";

export default function FeedbackComponent() {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Neo Tokyo delivered a gaming system that exceeded all my expectations. The attention to detail and build quality is outstanding.",
      author: "Alex Chen",
      role: "Professional Gamer"
    },
    {
      text: "As a content creator, I needed a powerful workstation that could handle demanding tasks. Neo Tokyo built me the perfect system.",
      author: "Sarah Johnson",
      role: "Digital Artist"
    },
    {
      text: "The enterprise solution Neo Tokyo designed for our startup has been flawless. Their technical support is second to none.",
      author: "Michael Torres",
      role: "Tech Entrepreneur"
    }
  ];

  useEffect(() => {
    // Set visibility after a small delay to trigger animations
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Counter animation
    const counterInterval = setInterval(() => {
      setCounter(prev => {
        if (prev < 1000) {
          return prev + 20;
        } else {
          clearInterval(counterInterval);
          return 1000;
        }
      });
    }, 30);

    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearTimeout(visibilityTimer);
      clearInterval(counterInterval);
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length]);

  return (
    <div className={`feedback-wrapper ${isVisible ? 'feedback-visible' : ''}`}  style={{
        width:"97vw", 
        height:"95vh", 
        fontFamily: "'Rajdhani', sans-serif"
      }}>
      <div className="feedback-left-section">
        <h1 className="feedback-main-title">Don't Just Take our Word, Listen to Our Customers</h1>
        
        <div className="feedback-red-line"></div>
        
        <div className="feedback-stats-section">
          <h2 className="feedback-subtitle">Neo Tokyo In Numbers</h2>
          
          <div className="feedback-counter-box">
            <div className="feedback-counter">
              {counter}<span className="feedback-plus">+</span>
            </div>
            <span className="feedback-counter-label">Completed Builds</span>
          </div>
          
          <div className="feedback-additional-stats">
            <div className="feedback-stat-item feedback-stat-item-1">50+ Business Entities</div>
            <div className="feedback-stat-item feedback-stat-item-2">500+ Active Customers</div>
          </div>
        </div>
      </div>
      
      <div className="feedback-right-section">
        <div className="feedback-content-box">
          <div className="testimonial-container">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial ${activeTestimonial === index ? 'active' : ''}`}
              >
                <div className="testimonial-text">"{testimonial.text}"</div>
                <div className="testimonial-author">{testimonial.author}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            ))}
          </div>
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <span 
                key={index} 
                className={`indicator ${activeTestimonial === index ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile testimonial box that appears below stats in mobile view */}
      <div className="mobile-testimonial-section">
        <div className="mobile-testimonial-box">
          <div className="mobile-testimonial-container">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`mobile-testimonial ${activeTestimonial === index ? 'active' : ''}`}
              >
                <div className="mobile-testimonial-text">"{testimonial.text}"</div>
                <div className="mobile-testimonial-author">{testimonial.author}</div>
                <div className="mobile-testimonial-role">{testimonial.role}</div>
              </div>
            ))}
          </div>
          <div className="mobile-testimonial-indicators">
            {testimonials.map((_, index) => (
              <span 
                key={index} 
                className={`mobile-indicator ${activeTestimonial === index ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Poppins:wght@300;400;600;700&display=swap');
        
        .feedback-wrapper {
          width: 100%;
          height: 98vh;
          padding: 40px;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        .feedback-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .feedback-left-section {
          width: 48%;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        
        .feedback-visible .feedback-left-section {
          opacity: 1;
          transform: translateX(0);
        }
        
        .feedback-main-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 2.5rem;
          font-weight: 300;
          line-height: 1.2;
          color: #222;
          margin-bottom: 1rem;
          position: relative;
          animation: fadeInDown 1s ease forwards;
          opacity: 0;
          animation-delay: 0.5s;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .feedback-red-line {
          width: 120px;
          height: 4px;
          background-color: #ff0055;
          margin: 1rem 0 2rem 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 1s ease;
          animation: expandLine 1.2s ease forwards;
          animation-delay: 0.8s;
        }
        
        @keyframes expandLine {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        .feedback-subtitle {
          font-family: 'Poppins', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #333;
          opacity: 0;
          animation: fadeIn 1s ease forwards;
          animation-delay: 1s;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .feedback-stats-section {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s ease forwards;
          animation-delay: 1.2s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .feedback-counter-box {
          margin-bottom: 1.5rem;
        }
        
        .feedback-counter {
          font-family: 'Montserrat', sans-serif;
          font-size: 3.5rem;
          font-weight: 700;
          color: #222;
          display: flex;
          align-items: center;
        }
        
        .feedback-plus {
          font-size: 2.5rem;
          margin-left: 5px;
          color: #ff0055;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .feedback-counter-label {
          display: block;
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
          color: #555;
          margin-top: 0.5rem;
        }
        
        .feedback-additional-stats {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }
        
        .feedback-stat-item {
          padding: 10px 15px;
          background-color: #222;
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 4px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          opacity: 0;
        }
        
        .feedback-stat-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .feedback-stat-item-1 {
          animation: slideIn 0.5s ease forwards;
          animation-delay: 1.5s;
        }
        
        .feedback-stat-item-2 {
          animation: slideIn 0.5s ease forwards;
          animation-delay: 1.7s;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .feedback-right-section {
          width: 48%;
          height: 80vh;
          opacity: 0;
          transform: translateX(20px);
          animation: fadeInRight 1s ease forwards;
          animation-delay: 1s;
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .feedback-content-box {
          width: 100%;
          height: 100%;
          background-color: #f5f5f5;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 30px;
        }
        
        .feedback-content-box:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .feedback-content-box::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #ff0055, #ff6b6b);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        
        .feedback-content-box:hover::after {
          transform: scaleX(1);
        }
        
        /* Testimonial styling for desktop */
        .testimonial-container {
          width: 100%;
          position: relative;
          height: 70%;
        }
        
        .testimonial {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 20px;
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .testimonial.active {
          opacity: 1;
          transform: translateX(0);
        }
        
        .testimonial-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.3rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 20px;
        }
        
        .testimonial-author {
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #222;
        }
        
        .testimonial-role {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          color: #666;
          margin-top: 5px;
        }
        
        .testimonial-indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        
        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ddd;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .indicator.active {
          background-color: #ff0055;
        }
        
        /* Mobile testimonial box - hidden by default */
        .mobile-testimonial-section {
          display: none;
          width: 100%;
          margin-top: 30px;
        }
        
        .mobile-testimonial-box {
          width: 100%;
          background-color: #f5f5f5;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          padding: 20px;
          position: relative;
        }
        
        .mobile-testimonial-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #ff0055, #ff6b6b);
        }
        
        .mobile-testimonial-container {
          position: relative;
          height: 160px;
        }
        
        .mobile-testimonial {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        
        .mobile-testimonial.active {
          opacity: 1;
          transform: translateY(0);
        }
        
        .mobile-testimonial-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          line-height: 1.5;
          color: #333;
          margin-bottom: 15px;
        }
        
        .mobile-testimonial-author {
          font-family: 'Poppins', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #222;
        }
        
        .mobile-testimonial-role {
          font-family: 'Poppins', sans-serif;
          font-size: 0.8rem;
          color: #666;
          margin-top: 3px;
        }
        
        .mobile-testimonial-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
        }
        
        .mobile-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ddd;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .mobile-indicator.active {
          background-color: #ff0055;
        }
        
        /* Media Queries for Responsive Design */
        @media screen and (max-width: 992px) {
          .feedback-wrapper {
            flex-direction: column;
            padding: 30px;
            height: 98vh;
          }
          
          .feedback-left-section {
            width: 100%;
            margin-bottom: 30px;
          }
          
          .feedback-right-section {
            display: none; /* Hide the right box in responsive view */
          }
          
          .mobile-testimonial-section {
            display: block; /* Show mobile testimonial section */
            animation: fadeIn 0.5s ease forwards;
            animation-delay: 2s;
            opacity: 0;
          }
          
          .feedback-red-line {
            width: 100px;
            margin: 1rem 0 1.5rem 0;
          }
        }
        
        @media screen and (max-width: 768px) {
          .feedback-main-title {
            font-size: 2rem;
          }
          
          .feedback-subtitle {
            font-size: 1.3rem;
          }
          
          .feedback-counter {
            font-size: 3rem;
          }
          
          .feedback-red-line {
            height: 3px;
            width: 80px;
          }
        }
        
        @media screen and (max-width: 576px) {
          .feedback-wrapper {
            padding: 25px 20px;
            height: 98vh;
          }
          
          .feedback-additional-stats {
            flex-direction: column;
            gap: 15px;
          }
          
          .feedback-main-title {
            font-size: 1.8rem;
          }
          
          .feedback-counter {
            font-size: 2.5rem;
          }
          
          .feedback-subtitle {
            font-size: 1.2rem;
          }
          
          .feedback-red-line {
            width: 60px;
            margin: 0.8rem 0 1.2rem 0;
          }
          
          .feedback-stat-item {
            width: 100%;
            text-align: center;
          }
          
          .mobile-testimonial-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}