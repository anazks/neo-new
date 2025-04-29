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

  // Extract warranty info and inside box content dynamically
  const warrantyInfo = "1 Year Onsite Warranty";  // You might want to extract from API if available
  const insideBox = product.whats_inside || "No information available";

  // Group attributes by category for better organization
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
    <div className={`dark-container ${isAnimated ? 'dark-fade-in' : ''}`}>
      <div className="dark-header">
        <h1>WHAT'S INSIDE</h1>
        <p className="dark-package-content">{insideBox}</p>
      </div>

      

      {/* Display specifications in enhanced table format grouped by category */}
      {Object.keys(groupedAttributes).length > 0 ? (
        Object.entries(groupedAttributes).map(([categoryName, attributes]) => (
          <div key={categoryName} className="dark-specs-section">
            <h3 className="dark-specs-category-title">{categoryName.toUpperCase()}</h3>
            <div className="dark-specs-table-container">
              <table className="dark-specs-table">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr) => (
                    <tr key={attr.id} className="dark-specs-row">
                      <td className="dark-specs-label">{attr.attribute.name}</td>
                      <td className="dark-specs-value">
                        {attr.details.map((detail, idx) => (
                          <span key={detail.id} className="dark-specs-detail-chip">
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
        <div className="dark-specs-section">
          <h2>SPECIFICATIONS</h2>
          <p>No specifications available.</p>
        </div>
      )}
    </div>
  );
}

export default Inside;