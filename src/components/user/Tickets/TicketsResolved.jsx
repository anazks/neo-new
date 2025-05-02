import React, { useState, useRef, useEffect } from "react";
import ModernNavbar from "../NavBar/NavBar";
import ProductFooter from "../Footer/ProductFooter";

const TicketManagement = () => {
  const [text, setText] = useState("");
  const [rows, setRows] = useState(Array(7).fill(0));
  const textareaRef = useRef(null);
  const lineHeight = 24;
  const [activeTab, setActiveTab] = useState("RESOLUTION");

  // Update the dashed lines when text changes
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const numberOfLines = Math.max(
        textarea.scrollHeight / lineHeight,
        7 // Minimum number of rows
      );
      setRows(Array(Math.ceil(numberOfLines)).fill(0));
    }
  }, [text]);

  const tabContent = {
    RESOLUTION: (
      <div>
        <p className="mb-4 text-xs sm:text-sm font-['Raleway',_sans-serif]">
          This is a sample data space to fill how you see fit. This data is just
          to see how the space will look filled. Well this looks damn good. Am I
          right? So what do you think. Will this workout for this space.
        </p>
        <p className="text-xs sm:text-sm font-['Raleway',_sans-serif]">
          This is a sample data space to fill how you see fit. This data is just
          to see how the space will look filled. Well this looks damn good. Am I
          right? So what do you think. Will this workout for this space.
        </p>
      </div>
    ),
    DEVICE: (
      <div>
        <p className="mb-4 text-xs sm:text-sm font-['Raleway',_sans-serif]">
          Device information would be displayed here. This might include device
          type, serial number, and other relevant details.
        </p>
        <p className="text-xs sm:text-sm font-['Raleway',_sans-serif]">
          Additional device specifications and information can be included in
          this section as needed.
        </p>
      </div>
    ),
    CONCLUSION: (
      <div>
        <p className="mb-4 text-xs sm:text-sm font-['Raleway',_sans-serif]">
          Conclusion details would be shown in this area. This might include
          final resolution status and next steps.
        </p>
        <p className="text-xs sm:text-sm font-['Raleway',_sans-serif]">
          Any closing remarks or additional information related to the
          conclusion would be presented here.
        </p>
      </div>
    ),
  };

  return (
    <>
   <ModernNavbar/>
        <div className="w-full min-h-screen  p-4 sm:p-6 md:p-8" style={{ backgroundColor: "black" }}>
      <div className="max-w-7xl mx-auto">
        {/* Logo and Header section */}
        <div className="flex items-start lg:items-center mb-12 lg:mb-6">
          <div className="text-white text-4xl font-bold leading-none mr-4 font-['Rajdhani',_sans-serif]">
            <div>NT</div>
            <div>KO</div>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xl font-bold font-['Rajdhani',_sans-serif]">Priority One</span>
            <span className="text-white text-sm font-['Raleway',_sans-serif]">PREMIUM MEMBERSHIP</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Ticket - Resolved Ticket */}
          <div className="w-full lg:w-1/2">
            <div className="bg-[#63a375] rounded-2xl p-3 sm:p-4 overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden h-full">
                {/* Left side with barcode */}
                <div className="w-full sm:w-2/5 bg-[#4A5F53] border-r border-dashed border-black rounded-l-lg flex flex-col relative">
                  {/* Barcode */}
                  <div className="h-32 flex items-center justify-center">
                    <div className="w-16 h-full transform -rotate-90 flex items-center">
                      <div className="w-full h-full bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url('/api/placeholder/64/200')`}}></div>
                    </div>
                  </div>
                  
                  {/* Rotated "RESOLVED TICKET" text */}
                  <div className="transform rotate-90 origin-center absolute top-1/2 right-0 -mr-10 font-bold text-sm tracking-widest text-white font-['Rajdhani',_sans-serif]">
                    RESOLVED TICKET
                  </div>
                  
                  {/* NT KO Logo */}
                  <div className="absolute bottom-4 left-4 text-white text-2xl font-bold leading-none font-['Rajdhani',_sans-serif]">
                    <div>NT</div>
                    <div>KO</div>
                  </div>
                </div>

                {/* Right side with content */}
                <div className="w-full sm:w-3/5 bg-[#63a375] rounded-r-lg flex flex-col">
                  {/* Header */}
                  <div className="bg-[#63a375] text-white py-2 text-center font-bold border-l border-dashed border-black font-['Rajdhani',_sans-serif]">
                    RESOLVED
                  </div>

                  {/* Content area */}
                  <div className="flex h-full">
                    {/* Tabs */}
                    <div className="w-1/3 flex flex-col border-l border-dashed border-black">
                      {["RESOLUTION", "DEVICE", "CONCLUSION"].map((tab) => (
                        <button
                          key={tab}
                          className={`py-2 px-2 text-left text-xs font-medium transition-all duration-200 font-['Rajdhani',_sans-serif] ${
                            activeTab === tab
                              ? "bg-white text-gray-800 font-bold rounded-lg mx-1 my-1"
                              : "text-gray-100 hover:bg-[#5a9369]"
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="w-2/3 p-2 sm:p-3">
                      <div className="bg-[#DDEBE2] rounded-md p-2">
                        <h2 className="text-sm sm:text-lg font-bold text-gray-700 font-['Rajdhani',_sans-serif]">
                          RESOLUTION
                        </h2>
                      </div>
                      <div className="rounded-md p-2 text-gray-800 bg-[#DDEBE2]"
                        style={{ maxHeight: "180px", overflow: "auto" }}>
                        {tabContent[activeTab]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Ticket - Manage Tickets */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
              {/* Header */}
              <div className="bg-gray-300 py-2 text-center">
                <h4 className="font-['Rajdhani',_sans-serif] text-base sm:text-lg tracking-widest font-bold">MANAGE TICKETS</h4>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Date/Time */}
                <span className="text-xs font-semibold text-gray-800 font-['Raleway',_sans-serif]">2025/04/01 - 11:24 AM</span>
                
                {/* Main Content */}
                <div className="border-b border-dashed border-gray-400 py-4">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-['Rajdhani',_sans-serif]">Times we helped you out ///</h1>
                  <p className="text-sm mb-6 font-['Raleway',_sans-serif]">Hope we were helpful and could resolve your issue entirely</p>
                  
                  {/* Form fields */}
                  <div className="space-y-4 mb-2">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-800 rounded-lg text-sm bg-white font-['Raleway',_sans-serif]"
                        value="PRODUCT          GAMING PC"
                        readOnly
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-800 rounded-lg text-sm bg-gray-200 font-['Raleway',_sans-serif]"
                        value="SERIAL CODE      19213871"
                        readOnly
                      />
                    </div>
                  </div>
                  
                  <span className="block text-right text-xs text-gray-500 font-['Courier_New',_monospace]">Ticket Id: 12768119</span>
                </div>

                {/* Grievance Section */}
                <div className="py-4">
                  <p className="font-['Courier_New',_monospace] mb-4 font-semibold">Grievance:</p>
                  
                  {/* Textarea with dashed lines */}
                  <div className="relative mb-6">
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
                        ></div>
                      ))}
                    </div>

                    {/* Textarea */}
                    <textarea
                      ref={textareaRef}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full p-2 bg-transparent text-sm resize-none outline-none font-['Raleway',_sans-serif]"
                      rows={7}
                      style={{
                        lineHeight: `${lineHeight}px`,
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                      }}
                      placeholder="Start typing here..."
                    />
                  </div>

                  {/* Barcode */}
                  <div className="text-center mb-6">
                    <div className="bg-contain bg-no-repeat bg-center h-6 w-full" style={{backgroundImage: `url('/api/placeholder/320/24')`}}></div>
                  </div>

                  {/* Submit Button */}
                  <button className="w-full py-2 bg-[#63a375] text-white font-['Courier_New',_monospace] rounded-lg transition-all duration-200 hover:bg-[#5a9369]">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ProductFooter/>
    </>
  );
};

export default TicketManagement;