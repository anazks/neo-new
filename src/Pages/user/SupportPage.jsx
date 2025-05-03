import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import cityImage from "../../Images/city.png"; // Update this path to your background image

import NavBar from '../../components/user/NavBar/NavBar';
import Footer from '../../components/user/Footer/Footer';

// This is your original Support component content
const SupportContent = () => {
  return (
    <div  className="min-h-screen bg-gradient-to-r from-white to-emerald-500 flex justify-center items-center p-5 w-[90vw] mx-auto rounded-3xl box-border">
      <div className="w-full max-w-[80vw] flex flex-col gap-5">
        <div className="w-full rounded-lg overflow-hidden">
          {/* Heading Section */}
          <div className="flex flex-wrap p-5 gap-px items-center">
            <div className="flex-1">
              <h2 className="text-4xl m-0 font-sans">Support</h2>
            </div>
            <div className="flex justify-center items-center">
              <div className="h-[50px] w-[150px] bg-black rounded-3xl flex items-center justify-start">
                <div className="h-10 w-10 rounded-full ml-[3px] bg-white"></div>
                <span className="text-white ml-4">Live Chat</span>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-[9px] rounded bg-black mx-0 my-2.5"></div>
          
          {/* Content Body */}
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-wrap gap-5 justify-between">
              {/* Content Box 1 */}
              <div className="flex-1 min-w-[300px] p-5 rounded-lg bg-white shadow-md border-3 border-black">
                <h2 className="text-2xl mt-2.5 mb-2.5">Customer Support</h2>
                <h3 className="text-xl mt-2.5 mb-2.5">How can we help you?</h3>
                <ul className="list-none my-1.5 p-0">
                  <li className="my-2">✓ 24/7 Technical Support</li>
                  <li className="my-2">✓ Product Information</li>
                  <li className="my-2">✓ Order Status & Tracking</li>
                  <li className="my-2">✓ Returns & Exchanges</li>
                  <li className="my-2">✓ Warranty & Repairs</li>
                </ul>
              </div>
              
              {/* Content Box 2 */}
              <div className="flex-1 min-w-[300px] p-5 rounded-lg bg-white shadow-md border-3 border-blue-600">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-xl mt-0 mb-2.5">Contact Information</h3>
                    
                    <div className="flex items-center gap-2.5">
                      <div className="flex-none w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <ul className="m-0 text-sm">
                          <li><strong>Phone:</strong> (555) 123-4567</li>
                          <li><strong>Hours:</strong> 24/7 Support Line</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      <div className="flex-none w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <ul className="m-0 text-sm">
                          <li><strong>Email:</strong> support@example.com</li>
                          <li><strong>Response:</strong> Within 24 hours</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      <div className="flex-none w-10 h-10 bg-black rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <ul className="m-0 text-sm">
                          <li><strong>Address:</strong> 123 Tech Plaza</li>
                          <li><strong>Location:</strong> Silicon Valley, CA 94025</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Business Card */}
                  <div className="h-[35vh] w-full rounded-xl bg-black text-white flex justify-center items-center shadow-lg p-2">
                    <div className="h-[30vh] w-full p-4">
                      <div className="flex h-[20vh] w-full">
                        <div className="w-1/3 flex items-center justify-center">
                          <h1 className="text-5xl font-bold">TECH</h1>
                        </div>
                        <div className="w-2/3 flex flex-col justify-center">
                          <h2 className="text-3xl font-sans">SUPPORT CENTER</h2>
                          <p className="text-base">Always here to help you.</p>
                        </div>
                      </div>
                      <div className="h-[10vh] w-full flex items-end p-2">
                        <div className="w-full">
                          <p className="font-sans">www.techsupport.example.com</p>
                          <p className="text-yellow-300">support@example.com • (555) 123-4567</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional support content if you want to split the page
const SupportFAQs = () => (
  <div className="min-h-screen bg-gradient-to-r from-white to-emerald-500 flex justify-center items-center p-5 w-[90vw] mx-auto rounded-3xl box-border">
    <div className="w-full max-w-[80vw] bg-white rounded-lg p-8 shadow-md">
      <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">How do I track my order?</h3>
          <p>You can track your order by logging into your account and navigating to the "Orders" section. Alternatively, you can use the tracking number provided in your confirmation email.</p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">What is your return policy?</h3>
          <p>We offer a 30-day return policy for most items. Products must be in their original condition with all packaging and accessories. Some exclusions may apply for customized items.</p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">How can I request a refund?</h3>
          <p>Refunds can be requested through your account dashboard or by contacting our support team. Once approved, refunds typically process within 3-5 business days to your original payment method.</p>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">Do you offer international shipping?</h3>
          <p>Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can see specific shipping information during checkout.</p>
        </div>
      </div>
    </div>
  </div>
);

function SupportPage() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        // setScrollY(wrapperRef.current.scrollTop);
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) wrapper.addEventListener("scroll", handleScroll);

    return () => {
      if (wrapper) wrapper.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Components to be stacked
  const components = [
    SupportContent,
    SupportFAQs,
    Footer
  ];

  return (
    <motion.div ref={wrapperRef}>
      <NavBar />
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vh",
          height: "100%",
          backgroundImage: `url(${cityImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          filter: "blur(3px)",
        }}
        animate={{ scale: 5 }}
        transition={{ ease: "easeOut" }}
      />
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: -1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Ensure there's enough top padding to account for the navbar */}
      <div className="pt-16">
        {components.map((Component, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }} // Slide-up effect
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }} // Decreased to trigger animation earlier
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "sticky",
              top: 0,
              minHeight: "100vh",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: index + 1,
              transform: `translateY(${index * 10}px)`,
              paddingBottom: index === components.length - 1 ? "10vh" : 0, // Add padding for last component
            }}
          >
            <Component />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default SupportPage;