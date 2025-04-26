import React, { useEffect, useState } from 'react';
import './inside.css';

function Inside({ product }) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Add animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return (
      <div className="dark-loading">
        <div className="dark-spinner"></div>
        <h2>Loading specifications...</h2>
      </div>
    );
  }

  // Extract warranty info, inside box content, and attributes dynamically
  const warrantyInfo = "1 Year Onsite Warranty";  // You might want to extract from API if available
  const insideBox = product.whats_inside || "No information available"; 

  // Extract specifications from the response
  const specs = product.attributes.map(attr => ({
    label: attr.attribute.name.toUpperCase(),
    value: attr.details.length > 0 ? attr.details[0].value : "Not specified"
  }));

  return (
    <div className={`dark-container ${isAnimated ? 'dark-fade-in' : ''}`}>
      <div className="dark-header">
        <h1>WHAT'S INSIDE</h1>
        <p className="dark-package-content">{insideBox}</p>
      </div>

      <div className="dark-warranty">
        <h2>WARRANTY INFO</h2>
        <p>{warrantyInfo}</p>
        <div className="dark-warranty-bundles">
          <p>AMC Bundles Available at Checkout (Years)</p>
          <div className="dark-warranty-options">
            <button>+1</button>
            <button>+2</button>
            <button>+3</button>
          </div>
        </div>
      </div>

      <div className="dark-specs">
        <h2>SPECIFICATIONS</h2>
        <div className="dark-specs-grid">
          {specs.length > 0 ? (
            specs.map((spec, index) => (
              <div key={index} className="dark-spec-card">
                <div className="dark-spec-title">{spec.label}</div>
                <div className="dark-spec-data">{spec.value}</div>
              </div>
            ))
          ) : (
            <p>No specifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inside;