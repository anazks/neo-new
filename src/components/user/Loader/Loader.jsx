import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner-container">
          <div className="spinner-outer"></div>
          <div className="spinner-middle"></div>
          <div className="spinner-inner"></div>
        </div>
        <h2 className="loading-text">LOADING<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span></h2>
        <p className="loading-subtext">ACCESSING NEO TOKYO DATABASE</p>
      </div>
    </div>
  );
}

export default Loader;