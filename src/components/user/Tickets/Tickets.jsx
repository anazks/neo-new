import React, { useState, useRef, useEffect } from "react";
import ModernNavbar from "../NavBar/NavBar";
import ProductFooter from "../Footer/ProductFooter";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
  const [formData, setFormData] = useState({
    product: null,
    product_serial_number: "",
    grievance: "",
    is_concluded: false
  });
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const textareaRef = useRef(null);
  const lineHeight = 24; // Line height in pixels
  const containerRef = useRef(null);
  const navigate = useNavigate();
  
  // Update the dashed lines when grievance text changes
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const numberOfLines = Math.max(
        textarea.scrollHeight / lineHeight,
        7 // Minimum number of rows
      );
      setRows(Array(Math.ceil(numberOfLines)).fill(0));
    }
  }, [formData.grievance]);
  
  const handleTicketResolution = () => {
    navigate("/ticketsresolved");
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert product to integer if it's the product field
    const processedValue = name === "product" ? 
      (value === "" ? null : parseInt(value)) : 
      value;
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.grievance || formData.grievance.trim() === "") {
      newErrors.grievance = "Grievance is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Prepare final data
    const submissionData = {
      ...formData,
      is_concluded: false // Default value
    };
    
    console.log("Submitting ticket:", submissionData);
    
    // Here you would typically send the data to an API
    // For now, we'll just navigate to the resolved page
    navigate("/ticketsresolved");
  };
  
  return (
    <>
      <ModernNavbar />
      <div className="w-full bg-black p-3 md:p-5 rounded-xl">
        <div className="flex flex-col md:flex-row justify-between gap-5 p-3 md:p-5" ref={containerRef}>
          {/* Left Column */}
          <div className="w-full md:w-1/2 transition-all duration-300">
            <div className="flex items-baseline text-white">
              <div className="mr-2">
                <h1 className="text-2xl md:text-3xl font-bold">
                  NT <br />
                  KO
                </h1>
              </div>
              <div>
                <span className="text-sm md:text-base">
                  Priority One By Neo Tokyo
                </span>
              </div>
            </div>
            
            <div className="text-white mt-10 md:mt-24 transition-all duration-300">
              <h6 className="font-mono mb-5 font-semibold">
                Recent tickets (Click The barcode for resolution)
              </h6>

              <div className="bg-gray-100 p-4 md:p-5 w-full md:w-4/5 rounded-b-2xl transition-all duration-300 hover:shadow-lg">
                <p className="font-mono mb-5 text-black">Grievance:</p>
                <p className="text-gray-400 overflow-hidden whitespace-normal break-words mb-5 border-b border-dashed border-gray-400 pb-5">
                  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                </p>

                <div className="text-center my-5 transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={handleTicketResolution}>
                  <img
                    src="https://t3.ftcdn.net/jpg/02/55/97/94/360_F_255979498_vewTRAL5en9T0VBNQlaDBoXHlCvJzpDl.jpg"
                    alt="Ticket Barcode"
                    className="w-full h-5"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 transition-all duration-300">
            <div className="w-full">
              <div className="bg-gray-100 w-full md:w-4/5 mx-auto rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="bg-gray-300 p-3 text-center">
                  <h4 className="font-mono tracking-widest font-bold">LIVE TICKET</h4>
                </div>

                <form onSubmit={handleSubmit} className="p-3 md:p-5">
                  <span className="text-xs font-semibold text-black pl-2">2025/04/01 - 11:24 AM</span>
                  
                  <div className="p-3 md:p-5 border-b border-dashed border-gray-400">
                    <span className="text-2xl md:text-3xl font-black block mb-2">What Can We Help You With ///</span>
                    <p className="mb-4 text-sm md:text-base">Please describe your grievance in the space below</p>
                    
                    <div className="relative mt-5 group">
                      <input 
                        type="number" 
                        name="product" 
                        id="product"
                        value={formData.product || ""}
                        onChange={handleChange}
                        placeholder=" " 
                        className="w-full p-2 text-base border border-gray-800 rounded-lg outline-none bg-white focus:border-gray-100 transition-all duration-200"
                      />
                      <label 
                        htmlFor="product" 
                        className="absolute top-2 left-2 text-gray-700 text-xs transition-all duration-200 pointer-events-none group-focus-within:top-[-8px] group-focus-within:left-2 group-focus-within:text-xs group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-black"
                      >
                        Product (number)
                      </label>
                    </div>
                    
                    <div className="relative mt-5 group">
                      <input 
                        type="text" 
                        name="product_serial_number" 
                        id="product_serial_number" 
                        value={formData.product_serial_number}
                        onChange={handleChange}
                        maxLength="100"
                        placeholder=" " 
                        className="w-full p-2 text-base border-none rounded-lg outline-none bg-gray-300 transition-all duration-200"
                      />
                      <label 
                        htmlFor="product_serial_number" 
                        className="absolute top-2 left-2 text-gray-700 text-xs transition-all duration-200 pointer-events-none group-focus-within:top-[-8px] group-focus-within:left-2 group-focus-within:text-xs group-focus-within:bg-gray-300 group-focus-within:px-1 group-focus-within:text-black"
                      >
                        Product Serial Number (max 100 chars)
                      </label>
                    </div>

                    <span className="text-right font-mono text-xs text-gray-500 tracking-tighter block mt-2">Ticket Id: 12345677</span>
                  </div>

                  <div className="p-3 md:p-5">
                    <p className="font-mono mb-5 text-black">Grievance:</p>
                    {errors.grievance && (
                      <p className="text-red-500 text-sm mb-2">{errors.grievance}</p>
                    )}

                    <div className="relative">
                      {/* Dashed lines container */}
                      <div className="absolute inset-0 pointer-events-none">
                        {rows.map((_, index) => (
                          <div
                            key={index}
                            className="border-b border-dashed border-gray-400"
                            style={{
                              height: `${lineHeight}px`,
                              marginTop: index === 0 ? "8px" : "0",
                            }}
                          />
                        ))}
                      </div>

                      {/* Actual textarea */}
                      <textarea
                        ref={textareaRef}
                        name="grievance"
                        value={formData.grievance}
                        onChange={handleChange}
                        className="w-full p-2 bg-transparent text-base resize-none outline-none"
                        style={{
                          lineHeight: `${lineHeight}px`,
                          backgroundColor: "rgba(255, 255, 255, 0.4)",
                        }}
                        rows={7}
                        placeholder="Start typing here..."
                        required
                      />
                    </div>

                    <div className="text-center my-5 transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={handleTicketResolution}>
                      <img
                        src="https://tse2.mm.bing.net/th?id=OIP.y1ztqwIPRHhG3FAbArBZvAHaDT&pid=Api&P=0&h=180"
                        alt="Ticket Barcode"
                        className="w-full h-5"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full p-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-mono transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductFooter />
    </>
  );
};

export default Tickets;