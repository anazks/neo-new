import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner">
          <div className="spinner-inner"></div>
        </div>
        <p className="loading-text">Loading products...</p>
      </div>
    </div>
  );
}

export default Loader;