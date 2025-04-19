import React, { useState, useEffect } from 'react';

function Alert({ message = "Limited time offer! Gaming PC bundle with RTX 4080 now available!", type  ,setAlertData}) {
  const [visible, setVisible] = useState(true); 
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`gaming-alert ${type}`}>
      <style>{`
        .gaming-alert {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 320px;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(31, 255, 200, 0.3);
          font-family: 'Consolas', monospace;
          overflow: hidden;
          animation: slideIn 0.5s ease-out;
          z-index: 9999;
          background-color: #0f1923;
          border-left: 4px solid;
          color: #e0e0e0;
        }

        .gaming-alert.success {
          border-color: #00ff9d;
          background: linear-gradient(90deg, rgba(0, 50, 20, 0.9), #0f1923);
        }

        .gaming-alert.error {
          border-color: #ff2a6d;
          background: linear-gradient(90deg, rgba(50, 0, 20, 0.9), #0f1923);
        }

        .gaming-alert.warning {
          border-color: #ffb400;
          background: linear-gradient(90deg, rgba(50, 30, 0, 0.9), #0f1923);
        }

        .gaming-alert.info {
          border-color: #05d9e8;
          background: linear-gradient(90deg, rgba(0, 20, 50, 0.9), #0f1923);
        }

        .alert-content {
          display: flex;
          padding: 16px;
          align-items: center;
        }

        .alert-icon {
          width: 24px;
          height: 24px;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .alert-icon svg {
          width: 100%;
          height: 100%;
        }

        .alert-message {
          flex-grow: 1;
        }

        .alert-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 4px;
          letter-spacing: 0.5px;
          text-shadow: 0 0 5px currentColor;
        }

        .alert-subtitle {
          font-size: 12px;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .close-button {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 4px;
          margin-left: 8px;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .close-button:hover {
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .progress-bar {
          position: relative;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .progress-bar-inner {
          position: absolute;
          height: 100%;
          width: 100%;
          background-image: linear-gradient(90deg, #05d9e8, #00ff9d);
          animation: progress 5s linear forwards;
        }

        .rainbow-line {
          height: 2px;
          background: linear-gradient(90deg, #ff2a6d, #ffb400, #05d9e8, #00ff9d);
          animation: pulse 1.5s infinite alternate;
        }

        @keyframes progress {
          0% { width: 100%; }
          100% { width: 0%; }
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        @keyframes slideIn {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }

        .success .alert-icon {
          color: #00ff9d;
        }
        .error .alert-icon {
          color: #ff2a6d;
        }
        .warning .alert-icon {
          color: #ffb400;
        }
        .info .alert-icon {
          color: #05d9e8;
        }
      `}</style>
      <div className="rainbow-line"></div>
      <div className="alert-content">
        <div className="alert-icon">
          {type === "success" && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
          {type === "error" && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
          {type === "warning" && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          )}
          {type === "info" && (
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
        </div>

        <div className="alert-message">
          <div className="alert-title">{message}</div>
          <div className="alert-subtitle">AUTO-CLOSING IN 5s</div>
        </div>

        <button className="close-button" onClick={() => setVisible(false)}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-inner"></div>
      </div>
    </div>
  );
}

export default Alert;