import { useState, useEffect, useRef } from "react";
import { ArrowRight, Shield, ArrowRightCircle, Flame } from "lucide-react";

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
      
      .auto-scroll {
        animation: autoScroll 20s linear infinite;
      }
      
      @keyframes autoScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // State to track which product is being hovered
  const [hoveredProduct, setHoveredProduct] = useState(null);
  // Ref for hover timers to avoid race conditions
  const hoverTimerRef = useRef(null);
  // Ref for intersection observer to trigger entrance animations
  const productRowRef = useRef(null);
  // Auto-scroll functionality
  useEffect(() => {
    const productContainer = document.querySelector('.product-scroll-container');
    if (productContainer) {
      const scrollToBottom = () => {
        const scrollDistance = productContainer.scrollWidth - productContainer.clientWidth;
        let currentScroll = 0;
        
        const scroll = () => {
          if (currentScroll < scrollDistance) {
            currentScroll += 1;
            productContainer.scrollLeft = currentScroll;
            setTimeout(scroll, 20);
          } else {
            // Reset to beginning after a pause
            setTimeout(() => {
              productContainer.scrollLeft = 0;
              currentScroll = 0;
              setTimeout(scrollToBottom, 2000);
            }, 2000);
          }
        };
        
        scroll();
      };
      
      // Start auto-scrolling after initial delay
      const scrollTimeout = setTimeout(scrollToBottom, 1000);
      
      return () => {
        clearTimeout(scrollTimeout);
      };
    }
  }, []);
  
  // Ref for parallax effect on the banner
  const bannerRef = useRef(null);
  
  // Product data
  const products = [
    { 
      id: 'aspire', 
      name: 'Aspire Series', 
      price: '$1,40,000/-', 
      description: 'Performance Minimal, Sleek',
      image: "https://www.pngmart.com/files/4/Gaming-Computer-PNG-Free-Download.png",
      color: "red"
    },
    { 
      id: 'ion', 
      name: 'Ion Drive', 
      price: '$95,000/-', 
      description: 'Compact Power',
      image: "https://www.pngmart.com/files/4/Gaming-Computer-PNG-Free-Download.png",
    },
    { 
      id: 'e75', 
      name: 'E-75', 
      price: '$1,20,000/-', 
      description: 'Professional Grade',
      image: "https://www.pngmart.com/files/4/Gaming-Computer-PNG-Free-Download.png",
    },
    { 
      id: 'phantom', 
      name: 'Phantom', 
      price: '$1,60,000/-', 
      description: 'Ultimate Gaming',
      image: "https://www.pngmart.com/files/4/Gaming-Computer-PNG-Free-Download.png",
    },
  ];

  // Set up intersection observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && productRowRef.current) {
          productRowRef.current.classList.add('opacity-100');
          productRowRef.current.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });

    if (productRowRef.current) {
      observer.observe(productRowRef.current);
    }

    return () => {
      if (productRowRef.current) {
        observer.unobserve(productRowRef.current);
      }
    };
  }, []);

  // Handle mouseEnter with slight delay to prevent accidental hovers
  const handleMouseEnter = (productId) => {
    // Clear any existing timers to prevent race conditions
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    // Set a slight delay for better user experience
    hoverTimerRef.current = setTimeout(() => {
      setHoveredProduct(productId);
    }, 50);
  };

  // Handle mouseLeave with a slight delay for smoother transitions
  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    hoverTimerRef.current = setTimeout(() => {
      setHoveredProduct(null);
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-100 rounded-3xl overflow-hidden p-4 md:p-6" 
      style={{
        width:"96%", 
        height:"95vh", 
        fontFamily: "'Rajdhani', sans-serif"
      }}>
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden p-2 md:p-4 flex flex-col">
        {/* Banner Section */}
        <div 
          ref={bannerRef}
          style={{backgroundImage:'url(https://images.prismic.io/aftershock-singapore/ZpXxtR5LeNNTxLMm_DTBanner.png?auto=format,compress)'}}
          className="w-full bg-white rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 mb-4"
        >
          <div className="relative h-48 md:h-56 lg:h-64 w-full bg-gray-800 overflow-hidden">
            {/* Placeholder image with red overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-purple-900/30 z-10"></div>
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 tracking-wider font-rajdhani">INFERNO GAMING</p>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center font-rajdhani">
                  Gaming Rigs 
                  <span className="ml-2 text-red-600">
                    <Flame className="inline-block animate-pulse" size={20} />
                  </span>
                </h2>
                <p className="text-xs text-gray-600 font-rajdhani">Built with cutting-edge components</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="text-right mb-2">
                  <ArrowRight className="ml-auto text-red-600 animate-pulse" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2 text-center font-rajdhani">Unlock exclusive gaming deals & early access</p>
                  <button className="flex items-center justify-center mx-auto px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 ease-in-out group font-rajdhani">
                    <span>Subscribe</span>
                    <ArrowRightCircle className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full overflow-x-auto pb-6 px-1 product-scroll-container" style={{ scrollBehavior: 'smooth' }}>
          <div 
            ref={productRowRef}
            className="flex space-x-6 md:space-x-8 opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className={`
                  flex-shrink-0 rounded-lg overflow-hidden 
                  relative transition-all duration-500 ease-in-out 
                  bg-gradient-to-br
                  ${hoveredProduct === product.id 
                    ? 'transform scale-110 -translate-y-2 w-72 md:w-80 lg:w-96 h-80 lg:h-96 z-20' 
                    : 'w-60 md:w-64 lg:w-72 h-80 lg:h-96'
                  }
                `}
                style={{
                  clipPath: hoveredProduct === product.id 
                    ? "polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)" 
                    : "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
                  backgroundColor:"gray"
                }}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Red glow effect */}
                <div className={`absolute inset-0 bg-red-500/10 opacity-0 transition-opacity duration-300 ${hoveredProduct === product.id ? 'opacity-100' : ''}`}></div>
                
                <div className="relative z-10 h-full w-full p-5 flex flex-col justify-center items-center">
                  {/* Content visible when hovered */}
                  <div className={`
                    transition-all duration-500 ease-in-out w-full text-center
                    ${hoveredProduct === product.id 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10 absolute'
                    }
                    font-rajdhani
                  `}>
                    <div className="flex items-center justify-center text-xs text-white/90 mb-2">
                      <Shield className="mr-1 animate-pulse" size={16} />
                      {/* <span>CUSTOM GAMING PC</span> */}
                    </div>
                    
                    <h2 className="text-lg md:text-xl font-bold text-white font-rajdhani">{product.name}</h2>
                    <p className="text-xs md:text-sm text-white/80 mb-3">{product.description}</p>
                    
                    {/* Specs - added for expanded view */}
               
                    
                    {/* Color options */}
                    {/* <div className="flex justify-center space-x-3 my-2">
                      <div className="w-4 h-4 rounded-full bg-red-600 cursor-pointer hover:scale-125 transition-transform duration-200"></div>
                      <div className="w-4 h-4 rounded-full bg-red-800 cursor-pointer hover:scale-125 transition-transform duration-200"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-900 cursor-pointer hover:scale-125 transition-transform duration-200"></div>
                      <div className="w-4 h-4 rounded-full bg-gray-600 cursor-pointer hover:scale-125 transition-transform duration-200"></div>
                    </div> */}
                    
                    <p className="text-lg font-bold text-white mb-3">{product.price}</p>
                    
                    <button className="flex items-center mx-auto px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-all duration-300 ease-in-out group font-rajdhani">
                      <span>Buy Now</span>
                      <ArrowRightCircle className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                    </button>
                  </div>
                  
                  {/* Content visible when not hovered */}
                  <div className={`
                    flex flex-col items-center justify-center h-full
                    transition-all duration-500 ease-in-out
                    font-rajdhani
                    ${hoveredProduct === product.id 
                      ? 'opacity-0 absolute' 
                      : 'opacity-100'
                    }
                  `}>
                    <div className="w-32 h-32 mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain filter drop-shadow-[0_5px_5px_rgba(255,0,0,0.3)] hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-white font-bold text-center">{product.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{product.price}</p>
                  </div>
                  
                  {/* Image that shows on hover */}
                  <div className={`
                    absolute bottom-4 right-4 w-1/2 transition-all duration-700 ease-in-out
                    ${hoveredProduct === product.id 
                      ? 'opacity-100 translate-y-0 translate-x-0' 
                      : 'opacity-0 translate-y-16 translate-x-8'
                    }
                  `}>
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_8px_8px_rgba(255,0,0,0.4)] animate-floating"
                    />
                  </div>
                  
                  {/* Red glow effects on hover */}
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