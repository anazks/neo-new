import { useState, useEffect, useRef } from "react";
import { ArrowRight, Shield, ArrowRightCircle, Flame } from "lucide-react";
import Top from './Tob'
export default function GamingPCShowcase() {
  // Add CSS for custom animation and font
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
      
      @keyframes floating {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      .animate-floating {
        animation: floating 3s ease-in-out infinite;
      }
      
      body, html {
        font-family: 'Rajdhani', sans-serif;
      }
      
      .product-scroll-container {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .product-scroll-container::-webkit-scrollbar {
        display: none;
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
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease-out forwards;
      }
      
      .product-card {
        background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
      }
      
      .parallelogram {
        transform: skew(-15deg);
        overflow: hidden;
      }
      
      .parallelogram-content {
        transform: skew(15deg);
      }
      
      .product-image-container {
        transition: all 0.5s ease;
      }
      
      .product-info {
        transition: all 0.5s ease;
      }
      
      .product-hover .product-info {
        opacity: 0;
        height: 0;
        overflow: hidden;
      }
      
      .product-hover .product-image-container {
        transform: scale(1.2);
        opacity: 1;
      }
      
      .buy-now-btn {
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
      }
      
      .product-hover .buy-now-btn {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const hoverTimerRef = useRef(null);
  const productRowRef = useRef(null);
  
  // Auto-scroll functionality
  useEffect(() => {
    const productContainer = productRowRef.current;
    if (!productContainer) return;
    
    let animationFrame;
    let startTime;
    let scrollDistance = productContainer.scrollWidth - productContainer.clientWidth;
    let duration = 30000;
    
    const scroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      productContainer.scrollLeft = progress * scrollDistance;
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(scroll);
      } else {
        setTimeout(() => {
          productContainer.scrollLeft = 0;
          startTime = null;
          animationFrame = requestAnimationFrame(scroll);
        }, 2000);
      }
    };
    
    animationFrame = requestAnimationFrame(scroll);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  const products = [
    { 
      id: 'aspire', 
      name: 'Aspire Series', 
      price: '$1,40,000/-', 
      description: 'Performance Minimal, Sleek',
      image: "https://www.pngmart.com/files/4/Gaming-Computer-PNG-Free-Download.png",
      specs: [
        "Intel Core i9-13900K",
        "NVIDIA RTX 4090",
        "32GB DDR5 RAM",
        "2TB NVMe SSD"
      ]
    },
    { 
      id: 'ion', 
      name: 'Ion Drive', 
      price: '$95,000/-', 
      description: 'Compact Power',
      image: "https://static.vecteezy.com/system/resources/previews/038/849/048/original/3d-rendered-gaming-pc-free-png.png",
      specs: [
        "AMD Ryzen 7 7800X",
        "NVIDIA RTX 4070",
        "16GB DDR5 RAM",
        "1TB NVMe SSD"
      ]
    },
    { 
      id: 'e75', 
      name: 'E-75', 
      price: '$1,20,000/-', 
      description: 'Professional Grade',
      image: "https://www.nicepng.com/png/full/921-9213076_gaming-pcs-personal-computer.png",
      specs: [
        "Intel Core i7-13700K",
        "NVIDIA RTX 4080",
        "32GB DDR5 RAM",
        "1TB NVMe SSD + 2TB HDD"
      ]
    },
    { 
      id: 'phantom', 
      name: 'Phantom', 
      price: '$1,60,000/-', 
      description: 'Ultimate Gaming',
      image: "https://www.nicepng.com/png/full/921-9213076_gaming-pcs-personal-computer.png",
      specs: [
        "AMD Ryzen 9 7950X",
        "NVIDIA RTX 4090",
        "64GB DDR5 RAM",
        "2TB NVMe SSD + 4TB HDD"
      ]
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (productRowRef.current) {
      const items = productRowRef.current.querySelectorAll('.product-item');
      items.forEach(item => observer.observe(item));
    }

    return () => {
      if (productRowRef.current) {
        const items = productRowRef.current.querySelectorAll('.product-item');
        items.forEach(item => observer.unobserve(item));
      }
    };
  }, []);

  const handleMouseEnter = (productId) => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setHoveredProduct(productId);
    }, 50);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimerRef.current);
    setHoveredProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 rounded-3xl overflow-hidden p-4 md:p-6" 
      style={{
        width: "97vw", 
        height: "95vh", 
        fontFamily: "'Rajdhani', sans-serif"
      }}>
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden p-2 md:p-4 flex flex-col">
        {/* Banner Section */}
        <div 
          // style={{backgroundImage: 'url(https://images.prismic.io/aftershock-singapore/ZpXxtR5LeNNTxLMm_DTBanner.png?auto=format,compress)'}}
          className="w-full bg-white rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 mb-4"
        >
          <Top/>
        </div>

        {/* Products Section */}
        <div className="w-full overflow-x-auto pb-6 px-1 product-scroll-container">
          <div 
            ref={productRowRef}
            className="flex space-x-6 md:space-x-8"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`
                  product-item flex-shrink-0 overflow-hidden 
                  relative transition-all duration-500 ease-in-out 
                  shadow-lg parallelogram
                  ${hoveredProduct === product.id 
                    ? 'product-hover transform scale-105 -translate-y-2 w-72 md:w-80 lg:w-96 h-80 lg:h-96 z-20 shadow-xl' 
                    : 'w-60 md:w-64 lg:w-72 h-80 lg:h-96'
                  }
                `}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center product-image-container"
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                
                {/* Content overlay */}
                <div className="relative z-10 h-full w-full p-5 flex flex-col justify-between parallelogram-content">
                  {/* Product info */}
                  <div className="product-info">
                    <div className="flex items-center justify-center text-xs text-white/90 mb-2">
                      <Shield className="mr-1 animate-pulse" size={16} />
                      <span>CUSTOM GAMING PC</span>
                    </div>
                    
                    <h2 className="text-lg md:text-xl font-bold text-white text-center">{product.name}</h2>
                    
                    {/* Specs */}
                    <div className="mb-4 mt-4">
                      {product.specs.map((spec, index) => (
                        <div key={index} className="flex items-center text-xs text-white/80 mb-1">
                          <span className="w-1 h-1 rounded-full bg-red-500 mr-2"></span>
                          {spec}
                          <img src={product.image} alt=""  style={{width:'200px'}}/>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="product-info text-center">
                    <p className="text-lg font-bold text-white mb-3">{product.price}</p>
                  </div>
                  {/* Buy Now Button - only visible on hover */}
                  <div className="buy-now-btn absolute inset-0 flex items-center justify-center">
                    <button className="flex items-center mx-auto px-6 py-3 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-all duration-300 ease-in-out group">
                      <span>Buy Now</span>
                      <ArrowRightCircle className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                    </button>
                  </div>
                  
                  {/* Glow effects on hover */}
                  <div className={`
                    absolute -right-20 -bottom-20 w-64 h-64 bg-red-600/20 rounded-full blur-3xl
                    transition-opacity duration-700 ease-in-out pointer-events-none
                    ${hoveredProduct === product.id ? 'opacity-70' : 'opacity-0'}
                  `}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}