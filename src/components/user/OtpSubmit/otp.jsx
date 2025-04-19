// OtpInput.jsx
import React, { useEffect, useState } from "react";
import { verifyOtp } from "../../../Services/userApi";
import { useAuth } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const OtpInput = ({ email: propEmail }) => {
  const {  setToken, setIsAdmin, isAdmin } = useAuth(); // Consistent casing
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
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
    
    try {
      // Make API request to verify OTP - pass the correctly cased setIsAdmin
      const isVerified = await verifyOtp(email, otp, setToken, setIsAdmin,isAdmin);
      
      if (isVerified.data === true) {

        localStorage.removeItem("email");
        console.log(isVerified.admin,"isadmin")
        setIsAdmin(isVerified.admin)
        navigate(isVerified.admin === true ? '/admin/dashboard' : '/');
      } else {
        alert("⚠️ Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(
        "❌ Error verifying OTP:",
        error.response?.data || error.message
      );
      alert("⚠️ Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
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
        {loading ? 'Verifying...' : 'Submit OTP'}
      </button>
    </div>
  );
};

export default OtpInput;



