import React from "react";
import "./Ticketsresolved.css";
import { useState, useRef, useEffect } from "react";

function TicketsResolved() {
  const [text, setText] = useState("");
  const [rows, setRows] = useState([]);
  const textareaRef = useRef(null);
  const lineHeight = 24; // Line height in pixels

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

  // State to track container width
  const [containerWidth, setContainerWidth] = useState(0);
  const [circleSize, setCircleSize] = useState(12);
  const [dashWidth, setDashWidth] = useState(2);

  // Reference to the container element
  const containerRef = React.useRef(null);

  // Function to update dimensions based on screen size
  const updateDimensions = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);

      // Adjust circle size based on container width
      if (width < 400) {
        setCircleSize(8); // Smaller circles on small screens
        setDashWidth(1);
      } else if (width < 768) {
        setCircleSize(10); // Medium circles on medium screens
        setDashWidth(2);
      } else {
        setCircleSize(12); // Large circles on large screens
        setDashWidth(2);
      }
    }
  };

  // Set up resize listener
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const [activeTab, setActiveTab] = useState("RESOLUTION");

  const tabContent = {
    RESOLUTION: (
      <div>
        <p className="mb-4 text-sm">
          This is a sample data space to fill how you see fit. This data is just
          to see how the space will look filled. Well this looks damn good. Am I
          right? So what do you think. Will this workout for this space.
        </p>
        <p className="text-sm">
          This is a sample data space to fill how you see fit. This data is just
          to see how the space will look filled. Well this looks damn good. Am I
          right? So what do you think. Will this workout for this space.
        </p>
      </div>
    ),
    DEVICE: (
      <div>
        <p className="mb-4 text-sm">
          Device information would be displayed here. This might include device
          type, serial number, and other relevant details.
        </p>
        <p className="text-sm">
          Additional device specifications and information can be included in
          this section as needed.
        </p>
      </div>
    ),
    CONCLUSION: (
      <div>
        <p className="mb-4 text-sm">
          Conclusion details would be shown in this area. This might include
          final resolution status and next steps.
        </p>
        <p className="text-sm">
          Any closing remarks or additional information related to the
          conclusion would be presented here.
        </p>
      </div>
    ),
  };

  return (
    <div className="neo-tickets">
      <div className="tickets-container">
        <div className="left-items">
          <div className="priority-one">
            <div className="neo-logo-footer">
              <h1 className="neo-heading-footer">
                NT <br />
                KO{" "}
              </h1>
            </div>
            <div className="neo-description-footer">
              <span className="neo-secheading-footer">
                Priority One By Neo Tokyo{" "}
              </span>
            </div>
          </div>
          <div className="grievance-tab">
            

            <div className="grievance-ticket">
              <div className="flex w-full max-w-3xl rounded-lg overflow-hidden ">
                {/* Left side with barcode and tabs */}
                <div className="w-2/5 flex flex-col border-1 border-dashed border-black">
                  {/* Barcode section with black background */}
                  <div className=" text-white p-3 flex flex-col h-full">
                    {/* Barcode */}

                    {/* Rotated "RESOLVED TICKET" text */}
                    <div className="transform rotate-90 origin-center mt-3 mb-6 font-bold text-sm tracking-widest text-center">
                      RESOLVED TICKET
                    </div>
                    {/* NT KO text */}
                    <div className="priority-one">
                      <div className="neo-logo-footer">
                        <h1 className="neo-heading-footer">
                          NT <br />
                          KO{" "}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle section with tabs and content */}
                <div className="flex flex-col w-3/5">
                  {/* Green header */}
                  <div className=" py-2 text-center font-bold text-md text-white border-l border-dashed border-black">
                    RESOLVED
                  </div>

                  {/* Content area */}
                  <div className="flex h-full">
                    {/* Tabs side */}
                    <div className="w-1/3 flex flex-col border-l border-dashed border-black">
                      {["RESOLUTION", "DEVICE", "CONCLUSION"].map((tab) => (
                        <button
                          key={tab}
                          className={`py-3 px-2 text-left text-sm font-medium transition-colors resolution-button ${
                            activeTab === tab
                              ? "bg-gray-200 text-gray-800"
                              : "text-gray-600 hover:bg-green-600 hover:bg-opacity-20"
                          }`}
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Content side */}
                    <div className="w-2/3  p-4">
                      <div className="bg-white rounded-md shadow-sm p-2">
                        <h2 className="text-lg font-bold text-gray-700">
                          RESOLUTION
                        </h2>
                      </div>
                      <div
                        className=" rounded-md p-3 text-gray-800 bg-white"
                        style={{ overflow: "scroll", height: "200px", fontSize: "8px" }}
                      >
                        {tabContent[activeTab]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-items">
          <div className="ticket-generation">
            <div className="grievance-ticket-right">
              <div className="ticket-header">
                <h4 className="ticket-head-h4">MANAGE TICKETS</h4>
              </div>

              <div className="content">
                <span className="date-time">2025/04/01 - 11:24 AM</span>
                <div className="grieve-details">
                  <span className="h1">Times we helped you out ///</span>
                  <p>
                    Hope we were helpful and could resolve the issue entirely{" "}
                  </p>
                  <div className="grieve-form">
                    <input
                      type="text"
                      name="product"
                      value={"Product GAMING PC"}
                      readOnly
                      placeholder=" "
                    />
                    {/* <label htmlFor="product">Product</label> */}
                  </div>
                  <div className="grieve-form">
                    <input
                      type="text"
                      name="serialcode"
                      value={"Serial Code 12345"}
                      readOnly
                      id="serialcode"
                      placeholder=" "
                    />
                    {/* <label htmlFor="product">Serial Code</label> */}
                  </div>

                  <span className="Ticket_id">Ticket Id: 12345677</span>
                </div>
                <div className="black-round"></div>

                <div className="grievance">
                  <p className="grave_head">Grievance:</p>

                  <div className="relative">
                    {/* Dashed lines container */}
                    <div className="absolute inset-0 pointer-events-none">
                      {rows.map((_, index) => (
                        <div
                          key={index}
                          className="border-b border-dashed border-gray-400"
                          style={{
                            height: `${lineHeight}px`,
                            marginTop: index === 0 ? "8px" : "0", // Adjust for textarea padding
                          }}
                        ></div>
                      ))}
                    </div>

                    {/* Actual textarea */}
                    <textarea
                      ref={textareaRef}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full p-2 bg-transparent text-base resize-none outline-none"
                      rows={7}
                      style={{
                        lineHeight: `${lineHeight}px`,
                        backgroundColor: "rgba(255, 255, 255, 0.4)",
                      }}
                      placeholder="Start typing here..."
                    />
                  </div>

                  <div
                    className="barcode-container"
                    style={{ textAlign: "center", margin: "20px 0" }}
                  >
                    <img
                      src="https://barcode.tec-it.com/barcode.ashx?data=12345677&code=Code128&dpi=96"
                      alt="Ticket Barcode"
                      style={{ width: "100%", height: "20px" }}
                    />
                  </div>

                  <button className="grievance-submit-button">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketsResolved;
