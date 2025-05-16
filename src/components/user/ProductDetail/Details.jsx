import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../Context/UserContext';
import { addTocart } from '../../../Services/userApi';
import SingeProductOverview from '../CardPage/SingleProductOverView';
import BaseURL from '../../../Static/Static';
import NavBar from '../NavBar/NavBar';
import Alert from '../Alert/Alert';
import Loader from '../Loader/Loader';
import { useNavigate } from "react-router-dom";
 

function Details({ product }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  // State for selected options and UI
  const [selectedStorage, setSelectedStorage] = useState('.5');
  const [selectedRam, setSelectedRam] = useState('8');
  const [price, setPrice] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [cartData, setCartData] = useState(false);
  const [overView, setOverView] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  
  // Refs for animations
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const videoPopupRef = useRef(null);

  // Calculate price based on selections
  useEffect(() => {
    if (product) {
      let basePrice = product.price || 0;
      
      if (selectedStorage === '1') basePrice += 1000;
      else if (selectedStorage === '2') basePrice += 3000;
      else if (selectedStorage === '3') basePrice += 6000;
      
      if (selectedRam === '16') basePrice += 1500;
      else if (selectedRam === '32') basePrice += 3500;
      else if (selectedRam === '64') basePrice += 8000;
      
      setPrice(basePrice);
    }
  }, [product, selectedStorage, selectedRam]);

  // Animation and initial setup
  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        setShowOptions(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [product]);

  // Click outside video popup to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (videoPopupRef.current && !videoPopupRef.current.contains(event.target)) {
        setShowVideoPopup(false);
      }
    };

    if (showVideoPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVideoPopup]);

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
  };

  const handleRamSelect = (ram) => {
    setSelectedRam(ram);
  };

  const handleAddToCart = async(id) => {
    try {
      console.log("Adding to cart:", id);
      let cartData = await addTocart(id);
      console.log("Cart data:", cartData);
      setCartData(cartData);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Handle variant selection
  const handleVariantSelect = (variant) => {
    console.log("Selected variant ID:", variant.id);
    setSelectedVariant(variant.id);
    // navigate(`/Details/${variant.id}`)
    // You can add additional logic here to update the product display
    // based on the selected variant
  };

  // Get YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlayVideo = () => {
    setShowVideoPopup(true);
  };
  
  const handleDownloadBrochure = () => {
    if (product?.broacher) {
      window.open(BaseURL + product.broacher, '_blank');
    } else {
      console.log("Brochure not available");
    }
  };
  
  const handleWatchYoutube = () => {
    if (product?.youtube_url) {
      window.open(product.youtube_url, '_blank');
    }
  };

  // Get product image with proper error handling
  const getProductImage = () => {
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      if (typeof product.images[0] === 'object' && product.images[0].image) {
        return product.images[0].image;
      } else if (typeof product.images[0] === 'string') {
        return product.images[0];
      }
    }
    else if (product?.image) {
      return product.image;
    }
    
    return null;
  };

  const videoId = getYoutubeVideoId(product?.youtube_url);
  
  // Format price with commas
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
  };

  const handleBuyNow = async () => {
    try {
      console.log("buy now")
      setOverView(true)
    } catch (error) {
      console.error("Error in buy now:", error);
      alert("Error in buy now:", error);
    }
  }

  if (!product) {
    return <Loader/>;
  }

  const productImage = getProductImage();

  return (
    <>
      <NavBar/>
      {cartData && (
        <div>
          <Alert
            type="success"
            message="Added to cart successfully"
            productId={null}
          />
        </div>
      )}
     {overView && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
    <div className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden animate-pop-in">
      <button 
        className="absolute top-4 right-4 z-50 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-300 transition-colors"
        onClick={() => setOverView(false)}
      >
        ×
      </button>
      <SingeProductOverview product={product} onClose={() => setOverView(false)} />
    </div>
  </div>
)}
      
      <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800">
        {/* Video Popup */}
        {showVideoPopup && videoId && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade">
            <div className="relative w-11/12 max-w-4xl" ref={videoPopupRef}>
              <button 
                className="absolute -top-10 -right-10 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-800 text-2xl cursor-pointer hover:bg-gray-200 hover:scale-110 transition-all duration-300"
                onClick={() => setShowVideoPopup(false)}
              >
                ×
              </button>
              <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
                  title="Product video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
        
        {/* Product content layout */}
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-start gap-8 opacity-0 translate-y-8 animate-fade-up">
          {/* Left side - Product image and actions */}
          <div className="w-full md:w-2/5 md:sticky md:top-20 self-start" ref={imageRef}>
            {/* Image container */}
            <div className="w-full rounded-xl overflow-hidden bg-white p-4 transition-transform duration-300 hover:-translate-y-1">
              {productImage ? (
                <div className="relative h-72 flex items-center justify-center">
                  <img
                    src={BaseURL + productImage}
                    alt={product.name || 'Product image'}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-auto object-contain max-h-72 rounded-lg transform transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  />
                  {videoId && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer" 
                      onClick={handlePlayVideo}
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400 text-white transform transition-transform duration-300 hover:scale-105 ">
                        <FaPlay className="ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-72 flex items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                  No product image available
                </div>
              )}
            </div>

            {/* Action buttons */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start items-center">
  {/* Thumbnails */}
  {product.images.map((obj, index) => (
    <div key={index} className="w-20 h-20 overflow-hidden rounded border shadow-sm">
      <img 
        src={BaseURL + obj.image} 
        alt={`Thumbnail ${index + 1}`} 
        className="w-full h-full object-cover"
      />
    </div>
  ))}

  {/* Buttons */}
</div>

          </div>
          
          {/* Right side - Product details */}
          <div 
            ref={detailsRef}
            className="w-full md:w-3/5 flex flex-col rounded-xl p-6 relative bg-white"
          >
            <div className="absolute top-0 left-0 w-full h-1"></div>
            
            <div className="mb-6">
              <h3 className="relative uppercase tracking-wider text-xs pl-3 mb-3 font-medium text-gray-500 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-3 before:bg-gradient-to-r before:from-blue-500 before:to-green-400">
                {product.subtitle || "GAMING PC"}
              </h3>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-1 uppercase tracking-tight text-gray-800" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                {product.name || "THE SPECTRE SERIES"}  <span className='ml-5'><del className="text-base mr-3 font-normal text-gray-400 align-super"style={{fontFamily: 'Rajdhani, sans-serif'}}>
                    ₹ {formatPrice(product.originalPrice)}
                  </del></span><span className="text-green-600 ml-5" style={{fontFamily: 'Rajdhani, sans-serif'}}>₹ {formatPrice(price)}/-</span>
              </h1>
              
              <div className="text-2xl font-bold mb-3 pb-3 text-gray-800" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                {product.originalPrice && (
                  <del className="text-base mr-3 font-normal text-gray-400 align-super">
                    ₹ {formatPrice(product.originalPrice)}
                  </del>
                )}
              </div>
            </div>
            
            <div className="text-sm leading-relaxed mb-4 pb-4 text-gray-600" style={{fontFamily: 'Rajdhani, sans-serif'}}>
              {product.description || "Experience the ultimate gaming performance with our custom-built gaming PC, featuring the latest technology and components designed to deliver exceptional speed, graphics, and reliability for all your gaming needs."}
              {/* <a href="" style={{color:'blue'}}>See more</a> */}
<div className="flex gap-5 mt-4">
  {videoId && (
    <button 
      className="flex items-center gap-1 text-blue-700 hover:underline focus:outline-none" 
      onClick={handlePlayVideo}
    >
      <FaPlay size={14} /> <span>Watch Video</span>
    </button>
  )}

  {product?.broacher && (
    <button 
      className="flex items-center gap-1 text-green-700 hover:underline focus:outline-none"
      onClick={handleDownloadBrochure}
    >
      <FaDownload size={14} /> <span>Download Brochure</span>
    </button>
  )}

  {videoId && (
    <button 
      className="flex items-center gap-1 text-red-700 hover:underline focus:outline-none"
      onClick={handleWatchYoutube}
    >
      <FaYoutube size={16} /> <span>Watch on YouTube</span>
    </button>
  )}
</div>

            </div>
                <div>
                </div>
            
            {/* Variants Section */}
            {product.variant_parent && product.variant_parent.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2" style={{fontFamily: 'Rajdhani, sans-serif'}}>
                  Available Variants
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {product.variant_parent.map((variant, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleVariantSelect(variant)}
                      className={`p-4 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 ${
                        selectedVariant === variant.id 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="h-20 flex items-center justify-center mb-2">
                        {variant.variant_primary_image?.image ? (
                          <img
                            src={BaseURL + variant.variant_primary_image.image}
                            alt={variant.product}
                            className="h-full object-contain"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-gray-800 truncate">{variant.product}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {variant.relationship.name}: <span className="font-semibold">{variant.relationship_value}</span>
                        </p>
                      </div>
                      {selectedVariant === variant.id && (
                        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6" style={{fontFamily: 'Rajdhani, sans-serif'}}> 
              <button 
                onClick={() => handleAddToCart(product.id)}
                className="flex-1 py-3 px-5 rounded-lg font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all duration-300 
                  bg-white text-black hover:bg-blue-50 hover:-translate-y-1"
              >
                <FaCartPlus size={16} /> <span>Add To Cart</span>
              </button>
              
              {token && (
                <button 
                  style={{width:"200px",borderRadius:"40px"}}
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-6 rounded-lg font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 
                    bg-black text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <FaBolt size={16} /> <span>Buy Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add these keyframe animations for Tailwind */}
      <style jsx>{`
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-up {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-down {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pop-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        .animate-fade { animation: fade 0.3s ease forwards; }
        .animate-fade-up { animation: fade-up 0.8s ease forwards; }
        .animate-fade-down { animation: fade-down 0.5s ease forwards; }
        .animate-pop-in { animation: pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </>
  );
}

// Icon components (remain the same as in your original code)
function FaPlay(props) {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 448 512" 
      height={props.size || "1em"} 
      width={props.size || "1em"} 
      className={props.className || ""}
      {...props}
    >
      <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
    </svg>
  );
}

function FaDownload(props) {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 512 512" 
      height={props.size || "1em"} 
      width={props.size || "1em"} 
      {...props}
    >
      <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
    </svg>
  );
}

function FaYoutube(props) {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 576 512" 
      height={props.size || "1em"} 
      width={props.size || "1em"} 
      {...props}
    >
      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
    </svg>
  );
}

function FaCartPlus(props) {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 576 512" 
      height={props.size || "1em"} 
      width={props.size || "1em"} 
      {...props}
    >
      <path d="M504.717 320H211.572l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276C523.112 414.668 536 433.828 536 456c0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548H231.176C241.553 426.165 248 440.326 248 456c0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586L93.883 64H24C10.745 64 0 53.255 0 40V24C0 10.745 10.745 0 24 0h102.529c11.401 0 21.228 8.021 23.513 19.19L159.208 64H551.99c15.401 0 26.816 14.301 23.403 29.319l-47.273 208C525.637 312.246 515.923 320 504.717 320zM408 168h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z"></path>
    </svg>
  );
}

function FaBolt(props) {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 320 512" 
      height={props.size || "1em"} 
      width={props.size || "1em"} 
      className={props.className || ""}
      {...props}
    >
      <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"></path>
    </svg>
  );
}

function FaCheck(props) {
  return (
    <svg 
      stroke="currentColor" 
      fill="currentColor" 
      strokeWidth="0" 
      viewBox="0 0 512 512" 
      height={props.size || "1em"} 
      width={props.size || "1em"} 
      {...props}
    >
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
    </svg>
  );
}

export default Details;