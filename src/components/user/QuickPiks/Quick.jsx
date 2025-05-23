import { useState, useEffect, useRef } from "react";
import { ArrowRightCircle, Shield } from "lucide-react";
import Top from './Tob';
import {featuredProduct} from '../../../Services/Products'
import { useNavigate } from "react-router-dom";



export default function GamingPCShowcase() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const hoverTimerRef = useRef(null);
  const productRowRef = useRef(null);
 const navigate = useNavigate();
  // Add custom styles for parallelogram and animations
  const getProducts = async () => {
    try {
      const response = await featuredProduct();
      console.log(response.data,"fe--------")
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    getProducts()
    const style = document.createElement('style');
    style.innerHTML = `
      .parallelogram-card {
        transform: skew(-15deg);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      
      .parallelogram-card:hover {
        transform: skew(-15deg) scale(1.05);
        z-index: 10;
      }
      
      .parallelogram-content {
        transform: skew(15deg);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
      }
      
      .product-scroll-container::-webkit-scrollbar {
        display: none;
      }
      
      .product-scroll-container {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      .glow-effect {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
        pointer-events: none;
      }
      
      .parallelogram-card:hover .glow-effect {
        opacity: 1;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      .floating-animation {
        animation: float 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const container = productRowRef.current;
    if (!container) return;

    let frame;
    let start;
    const distance = container.scrollWidth - container.clientWidth;
    const duration = 25000;

    const scroll = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      container.scrollLeft = progress * distance;

      if (progress < 1) {
        frame = requestAnimationFrame(scroll);
      } else {
        setTimeout(() => {
          container.scrollLeft = 0;
          start = null;
          frame = requestAnimationFrame(scroll);
        }, 2000);
      }
    };

    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseEnter = (id) => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setHoveredProduct(id);
    }, 50);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimerRef.current);
    setHoveredProduct(null);
  };

  const BuyNow = (id) => {
    // Handle the Buy Now button click
    console.log("Buy Now clicked");
    navigate(`/Details/${id}`);
    // Add your logic here, e.g., redirecting to a purchase page or opening a modal
  }
  return (
    <>
      <div 
        className="bg-gray-900"
        style={{
          width: "97vw",
          height: "94vh",
          fontFamily: "'Rajdhani', sans-serif",
          overflow: "hidden",
          borderRadius: "30px",
          backgroundColor:'white',
        }}
      >
        <Top/>
        
        <div 
          className="mx-auto  flex flex-col"
          style={{
            maxWidth: "90%",
            paddingTop: "1rem"
          }}
        >
          {/* Products Container */}
          <div className="product-scroll-container overflow-x-auto flex-grow flex items-center">
            <div 
              ref={productRowRef}
              className="flex space-x-6 min-w-max h-full items-center"
              style={{ 
                paddingLeft: '2rem', 
                paddingRight: '2rem',
                alignItems: "center"
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`parallelogram-card flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl cursor-pointer
                    ${hoveredProduct === product.id 
                      ? 'w-72 h-80' 
                      : 'w-60 h-64'
                    }`}
                  onMouseEnter={() => handleMouseEnter(product.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    borderRadius: '1rem',
                    background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url(${product.banner_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Glow Effect */}
                  <div className="glow-effect"></div>
                  
                  {/* Content */}
                  <div className="parallelogram-content">
                    {/* Top Section - GPU Badge */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center mb-2">
                        <div className="flex items-center bg-red-600/20 backdrop-blur-sm rounded-full px-3 py-1 border border-red-500/30">
                          <Shield className="mr-2 text-red-400 floating-animation" size={14} />
                          <span className="text-red-300 text-xs font-semibold">
                            {product.gpu}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section - Product Info */}
                    <div className="flex-grow flex flex-col justify-center text-center">
                      <h2 className="text-lg font-bold text-white mb-2 leading-tight">
                        {product.featured_name}
                      </h2>
                      
                      <div className="mb-2">
                        <div className="flex items-center justify-center text-gray-300 text-xs mb-1">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                          {product.product_details.name}
                        </div>
                      </div>

                      <div className="text-xl font-bold text-white mb-2">
                        {product.product_details.mrp}
                      </div>
                    </div>

                    {/* Bottom Section - Buy Button */}
                    <div className="flex-shrink-0 flex justify-center">
                      <button onClick={()=>BuyNow(product.product_details.id)} className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-semibold transition-all duration-300 ease-in-out group shadow-lg hover:shadow-red-500/25">
                        <span>Buy Now</span>
                        <ArrowRightCircle className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}