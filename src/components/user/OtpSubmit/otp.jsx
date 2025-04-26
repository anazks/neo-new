// OtpInput.jsx
import React, { useEffect, useState } from "react";
import { verifyOtp } from "../../../Services/userApi";
import { useAuth } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Varifying from '../Loader/Verifying'
import './otp.css'

const OtpInput = ({ email: propEmail }) => {
  const { setToken, setIsAdmin, isAdmin } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificstion, setVerifiction] = useState(undefined); // Use undefined as initial state
  const navigate = useNavigate();
  
  // Use email from props if available, otherwise from localStorage
  const email = propEmail || localStorage.getItem("email");
  
  useEffect(() => {
    if (!email) {
      // Redirect if no email is available
      navigate('/login');
    }
  }, [email, navigate]);
  
  const handleChangeOTP = (e) => {
    // Limit to numbers only and max length
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };
  
  const handleSubmitOTP = async () => {
    if (!otp || otp.length < 4) {
      alert("Please enter a valid OTP");
      return;
    }
    
    setLoading(true);
    setVerifiction(undefined); // Reset to initial verification state
    
    try {
      // Make API request to verify OTP
      const isVerified = await verifyOtp(email, otp, setToken, setIsAdmin, isAdmin);
      
      if (isVerified.data === true) {
        // Success case
        setVerifiction(true);
        
        // Wait to show the success animation before redirecting
        setTimeout(() => {
          localStorage.removeItem("email");
          setIsAdmin(isVerified.admin);
          navigate(isVerified.admin === true ? '/admin/dashboard' : '/');
        }, 2000);
      } else {
        // Failed verification
        setVerifiction(false);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error(
        "❌ Error verifying OTP:",
        error.response?.data || error.message
      );
      
      // API error = failed verification
      setVerifiction(false);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitOTP();
    }
  };
  
  return (
    <div className="otp-container">
      {loading && (
        <div className="verifying-overlay">
          <Varifying verificstion={verificstion} />
        </div>
      )}
      
      <input
        type="text"
        inputMode="numeric"
        value={otp}
        onChange={handleChangeOTP}
        onKeyPress={handleKeyPress}
        placeholder="Enter OTP"
        className="input-box"
        maxLength={6}
        disabled={loading}
        required
      />
      <button 
        onClick={handleSubmitOTP}
        disabled={loading || !otp}
        className={`submit-button ${loading ? 'loading' : ''}`}
      >
        Submit OTP
      </button>
    </div>
  );
};

export default OtpInput;