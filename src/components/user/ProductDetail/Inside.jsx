import React from 'react';
import './inside.css';

function Inside({ product }) {  // ✅ Receive product as a prop
  if (!product) {
    return <h2>Loading specifications...</h2>; // ✅ Handle loading state
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
    <div className="pc-specs-container">
      <div className="pc-specs-header">
        <h1>WHAT'S INSIDE</h1>
        <p className="package-content">{insideBox}</p> {/* ✅ Dynamic inside-box content */}
      </div>

      <div className="warranty-section">
        <h2>WARRANTY INFO</h2>
        <p>{warrantyInfo}</p> {/* ✅ Display warranty */}
        <div className="warranty-bundles">
          <p>AMC Bundles Available at Checkout (Years)</p>
          <div className="warranty-buttons">
            <button>+1</button>
            <button>+2</button>
            <button>+3</button>
          </div>
        </div>
      </div>

      <div className="specs-section">
        <h2>SPECIFICATIONS</h2>
        <div className="specs-grid">
          {specs.length > 0 ? (
            specs.map((spec, index) => (
              <div key={index} className="spec-item">
                <div className="spec-label">{spec.label}</div>
                <div className="spec-value">{spec.value}</div>
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
