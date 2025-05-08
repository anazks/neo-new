// OtpInput.jsx
import React, { useEffect, useState } from "react";
import { verifyOtp } from "../../../Services/userApi";
import { useAuth } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Varifying from '../Loader/Verifying';
import { IoArrowForwardCircleSharp, IoArrowBackCircleSharp } from 'react-icons/io5';
// No need for otp.css as we're using Tailwind now

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
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Varifying verificstion={verificstion} />
        </div>
      )}
      
      <div className="w-full text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Code</h2>
        <p className="text-gray-600">
          We've sent a verification code to
          <span className="font-medium text-blue-600 block mt-1">{email}</span>
        </p>
      </div>
      
      <input
        type="text"
        inputMode="numeric"
        value={otp}
        onChange={handleChangeOTP}
        onKeyPress={handleKeyPress}
        placeholder="Enter OTP"
        className="w-full px-4 py-3 text-center text-lg font-medium border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 mb-4"
        maxLength={6}
        disabled={loading}
        required
      />
      <button 
                  className={`"w-full bg-black text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colorsloading || !otp ? 'opacity-60 cursor-not-allowed' : ''
        }`}
                  onClick={handleSubmitOTP}
                  disabled={loading || !otp}
                >
                  
                  <IoArrowForwardCircleSharp className="text-xl" />
                  {loading ? 'Verifying...' : 'Submit OTP'}
                </button>
    
      
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Didn't receive a code? <button className="text-blue-600 font-medium hover:text-blue-800">Resend OTP</button>
        </p>
      </div>
    </div>
  );
};

export default OtpInput;