import React, { useEffect, useState } from 'react';
import './inside.css';

function Inside({ product }) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>Loading specifications...</h2>
      </div>
    );
  }

  const warrantyInfo = "1 Year Onsite Warranty";
  const insideBox = product.whats_inside || "No information available";

  const groupAttributesByCategory = () => {
    if (!product.attributes || !product.attributes.length) return {};
    
    const grouped = {};
    product.attributes.forEach(attr => {
      const categoryName = attr.attribute.category.name;
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(attr);
    });
    
    return grouped;
  };

  const groupedAttributes = groupAttributesByCategory();

  return (
    <div className={`container ${isAnimated ? 'fade-in' : ''}`}>
      <div className="header">
        <h1>WHAT'S INSIDE</h1>
        <p className="package-content">{insideBox}</p>
      </div>

      {Object.keys(groupedAttributes).length > 0 ? (
        Object.entries(groupedAttributes).map(([categoryName, attributes]) => (
          <div key={categoryName} className="specs-section">
            <h3 className="specs-category-title">{categoryName.toUpperCase()}</h3>
            <div className="specs-table-container">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr) => (
                    <tr key={attr.id} className="specs-row">
                      <td className="specs-label">{attr.attribute.name}</td>
                      <td className="specs-value">
                        {attr.details.map((detail, idx) => (
                          <span key={detail.id} className="specs-detail-chip">
                            {detail.value}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      ) : (
        <div className="specs-section">
          {/* <h2>SPECIFICATIONS</h2> */}
          <p>No specifications available.</p>
        </div>
      )}
    </div>
  );
}

export default Inside;