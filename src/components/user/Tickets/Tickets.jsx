import React from "react";
import "./Tickets.css";
import { useState, useRef, useEffect } from 'react';

function Tickets() {
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
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

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
            <h6 className="grave_head">
              Recent tickets (Click The barcode for resolution){" "}
            </h6>

            <div className="grievance-ticket">
              <p className="grave_head">Grievance:</p>
              {/* <textarea name="" rows={7} id=""></textarea> */}
              <p className="grievance-text">
                ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
              </p>

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
            </div>
          </div>
        </div>
        <div className="right-items">
          <div className="ticket-generation">
            <div className="grievance-ticket-right">
              
              <div className="ticket-header">
                <h4 className="ticket-head-h4">LIVE TICKET</h4>
              </div>

              <div className="content">
                <span className="date-time">2025/04/01 - 11:24 AM</span>
                <div className="grieve-details">
                  <span className="h1">What Can We Help You With ///</span>
                  <p>Please describe your grievance in the space below</p>
                  <div className="grieve-form">
                    <input type="text" name="product" placeholder=" " />
                    <label htmlFor="product">Product</label>
                  </div>
                  <div className="grieve-form">
                    <input type="text" name="serialcode" id="serialcode" placeholder=" " />
                    <label htmlFor="product">Serial Code</label>
                  </div>

                  <span className="Ticket_id">Ticket Id: 12345677</span>
                </div>
                <div className="black-round">

                </div>

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

export default Tickets;
