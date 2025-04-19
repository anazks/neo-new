import React, { useEffect } from 'react'
import './Pbanner.css'
import image from '../../../Images/Rectangle 532.jpg'
import { IoArrowForwardCircleSharp } from 'react-icons/io5'
import { FaComputer, FaFire, FaMemory, FaHardDrive } from 'react-icons/fa6'
import "@fontsource/rajdhani"; // Default font weight
import "@fontsource/rajdhani/700.css"; // Optional: specific font weight (600)

function ProductBanner() {
  // Animation setup on component mount
  useEffect(() => {
    // Animate elements when component mounts
    const animateElements = () => {
      const elements = [
        '.Headers',
        '.textContenst',
        '.smallText',
        '.rate',
        '.team-buttons',
        '.shape-circle',
        '.shape-square',
        '.shape-triangle'
      ];
      
      elements.forEach((selector, index) => {
        const items = document.querySelectorAll(selector);
        items.forEach(item => {
          // Add animation with delay based on index
          setTimeout(() => {
            item.classList.add('animated');
          }, index * 200);
        });
      });
    };
    
    animateElements();
    
    // Floating animation for shapes
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach(shape => {
      setInterval(() => {
        shape.classList.toggle('float-up');
      }, 3000);
    });
  }, []);

  return (
   <>
    {/* Animated shapes - positioned absolutely */}
    <div className="shape-container">
      <div className="shape-circle floating-shape"></div>
      <div className="shape-square floating-shape"></div>
      <div className="shape-triangle floating-shape"></div>
      <div className="shape-circle shape-sm floating-shape"></div>
      <div className="shape-square shape-sm floating-shape"></div>
    </div>
    
    <div className='ProductBanneBox'>
            <div className="LeftBox">
                    {/* <div className="Headers">
                            <div><h1>GAME BEYOND</h1></div>
                    </div> */}
                    <div className="textContenst">
                        <span>FRAMES SPEAKS MORE <br /> THAN SPECS. <br />
                            MEET THE  <br />
                            FPS <u><span className='MONGER'>MONGER</span></u>
                        </span>
                    
                    </div>
                    <div className='smallText'>
                        <div className="spec-item">
                            <FaComputer className="spec-icon" />
                            <span>Intel Core i7 14700K - 5.6GHz Max Clock</span>
                        </div>
                        <div className="spec-item">
                            <FaFire className="spec-icon" />
                            <span>Nvidia RTX 4070Ti - 8GB DDR6 VRAM</span>
                        </div>
                        <div className="spec-item">
                            <FaMemory className="spec-icon" />
                            <span>Corsair Vengeance DDR5 - 16GB</span>
                        </div>
                        <div className="spec-item">
                            <FaHardDrive className="spec-icon" />
                            <span>Samsung 970 Evo Pro - 1TB</span>
                        </div>
                    </div>
                    <div className="rate">
                        <span style={{color:'grey'}}><del>₹2,77,990</del></span> 
                        <span style={{color:'#AD43DE'}} className="price-highlight">₹2,57,990</span>
                        <div className="discount-badge">SAVE ₹20,000</div>
                    </div>

                {/* <button className="buy-Now">
                    <IoArrowForwardCircleSharp className='iconsbtn-teams' />
                    <span className='Team' style={{ color: 'white' }}>BUY NOW</span>
                </button> */}
                <button className='Buy-now'>Buy Now</button>

                {/* Particles for button hover effect */}
                <div className="particles">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="particle"></span>
                    ))}
                </div>
                    
            </div>
            <div className="rightBox">
           
                <div className="image-containersx">
                    <img src={image} alt="gaming pc" />
                    <div className="image-overlay">
                        <div className="pulse-circle"></div>
                        <div className="feature-point" style={{top: '20%', left: '30%'}}>
                            <div className="feature-dot"></div>
                            <div className="feature-label">RGB Lighting</div>
                        </div>
                        <div className="feature-point" style={{top: '40%', left: '70%'}}>
                            <div className="feature-dot"></div>
                            <div className="feature-label">Air Cooling</div>
                        </div>
                        <div className="feature-point" style={{bottom: '30%', left: '55%'}}>
                            <div className="feature-dot"></div>
                            <div className="feature-label">GPU Power</div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
   </>
  )
}

export default ProductBanner