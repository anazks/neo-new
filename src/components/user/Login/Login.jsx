import React, { useState, useEffect } from 'react';
import { IoArrowForwardCircleSharp, IoArrowBackCircleSharp } from 'react-icons/io5';
import './login.css';
import { useNavigate } from 'react-router-dom';

// Import your images
import Apple from '../../../Images/LoginWith/apple.png';
import Linkedin from '../../../Images/LoginWith/Linkedin.png';
import Google from '../../../Images/LoginWith/Google.png';
import logo from '../../../Images/LoginWith/neo_tokyo-logo.png';
import OtpInput from '../OtpSubmit/otp';
import { submitOTP } from '../../../Services/userApi';
import GoogleAuth from '../Google/GoogleAuth';
const Login = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [googleAuth,setGoogleAuth] = useState(false)
  // const [FormData,setFormData] = useState("")
  
  const LoginWith = async(data)=>{
    try {
 
          setGoogleAuth(true)
          navigate('/GoogleAuth')
          console.log(googleAuth,"googleAuth")
          
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeOTP = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSendOTP = async () => {
    const email = formData.email;
    // Send OTP logic here using the email
    console.log('Sending OTP to:', email);
    localStorage.setItem("email",email)
    let  OTPResponse = await submitOTP(email)
    console.log(OTPResponse)
    // Add your OTP request logic here (e.g., API call)
  };
  

  // Sample data for development/testing
  const sampleData = {
    email: "anazksunil2@gmail.com",
    password: "anazksunil@123",
    first_name: "John",
    last_name: "Doe",
    phone_number: "+918606414384",
    date_of_birth: "1990-01-01",
    pin_code: "123456",
    age: "33",
    district: "Sample District",
    state: "Sample State",
    address: "123 Sample Street",
    role: "user"
  };
  
  // Initialize form data with empty values (or sample data for testing)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    pin_code: '',
    age: '',
    district: '',
    state: '',
    address: '',
    role: 'user'
  });
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [currentField, setCurrentField] = useState('email');
  const [formFieldsVisible, setFormFieldsVisible] = useState({
    email: true,
    password: false,
    terms: false,
    first_name: false,
    last_name: false,
    phone_number: false,
    date_of_birth: false,
    pin_code: false,
    district: false,
    state: false,
    address: false,
    submit: false
  });
  
  // Define the sequence of fields to show
  const registrationFields = [
    'email',
    'password',
    'terms', // Special case for checkbox
    'first_name',
    'last_name',
    'phone_number',
    'date_of_birth',
    'pin_code',
    'district',
    'state',
    'address',
    'submit'  // Special case for submit button
  ];

  // Calculate the current progress percentage
  const calculateProgress = () => {
    const currentIndex = registrationFields.indexOf(currentField);
    if (currentIndex === -1) return 0;
    return (currentIndex / (registrationFields.length - 1)) * 100;
  };

  // Calculate age based on date of birth
  useEffect(() => {
    if (formData.date_of_birth) {
      const birthDate = new Date(formData.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prev => ({ ...prev, age: age.toString() }));
    }
  }, [formData.date_of_birth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you would typically make an API call to register the user
    alert("Registration successful!");
    setIsLogin(true);
  };

  // Move to the next field in the sequence
  const moveToNextField = () => {
    const currentIndex = registrationFields.indexOf(currentField);
    if (currentIndex < registrationFields.length - 1) {
      const nextField = registrationFields[currentIndex + 1];
      setCurrentField(nextField);
      
      // Update visibility of fields
      setFormFieldsVisible(prev => {
        const updated = { ...prev };
        // Keep all previous fields visible
        for (let i = 0; i <= currentIndex + 1; i++) {
          updated[registrationFields[i]] = true;
        }
        return updated;
      });
    }
  };

  // Move to the previous field in the sequence
  const moveToPreviousField = () => {
    const currentIndex = registrationFields.indexOf(currentField);
    if (currentIndex > 0) {
      setCurrentField(registrationFields[currentIndex - 1]);
    }
  };

  // Group fields by section for progress display
  const getStepFromField = (field) => {
    if (['email', 'password', 'terms'].includes(field)) return 1;
    if (['first_name', 'last_name', 'phone_number'].includes(field)) return 2;
    if (['date_of_birth', 'pin_code'].includes(field)) return 3;
    if (['district', 'state', 'address', 'submit'].includes(field)) return 4;
    return 1;
  };

  // Get current step (1-4) for progress indicator
  const getCurrentStep = () => {
    return getStepFromField(currentField);
  };

  // Check if the current field has a value
  const isFieldValid = (fieldName) => {
    if (fieldName === 'terms') return agreedToTerms;
    if (fieldName === 'submit') return true;
    if (fieldName === 'last_name') return true; // Last name is optional
    if (fieldName === 'address') return true; // Address can be optional
    return !!formData[fieldName];
  };

  // Render the sequential registration form
  const renderSequentialRegistration = () => {
    const currentStep = getCurrentStep();
    
    return (
      <>
    
        {/* Step indicator */}
        <div className="step-indicator">
          <div className="steps">
            {[1, 2, 3, 4].map(step => (
              <div 
                key={step} 
                className={`step ${currentStep >= step ? 'active' : ''}`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="step-progress-bar">
            <div 
              className="progress" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
        
        {/* Display headings based on current step */}
        {currentStep === 1 && (
          <>
            <h2>What's Your Email</h2>
            <p>Psst.. It's a secret. we've got your back</p>
          </>
        )}
        
        {currentStep === 2 && (
          <>
            <h2>Personal Information</h2>
            <p>Tell us a bit about yourself</p>
          </>
        )}
        
        {currentStep === 3 && (
          <>
            <h2>Date & Location</h2>
            <p>Help us know you better</p>
          </>
        )}
        
        {currentStep === 4 && (
          <>
            <h2>Address Information</h2>
            <p>Almost there!</p>
          </>
        )}
        
        {/* Form fields */}
        <div className="sequential-fields-container">
          {/* Email field - always visible first */}
          {formFieldsVisible.email && (
            <div className={`field-container ${currentField === 'email' ? 'active-field' : ''}`}>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                className="input-box" 
                required
              />
              {currentField === 'email' && isFieldValid('email') && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Password field */}
          {formFieldsVisible.password && (
            <div className={`field-container ${currentField === 'password' ? 'active-field' : ''}`}>
              {currentField === 'password' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" 
                className="input-box" 
                required
              />
              {currentField === 'password' && isFieldValid('password') && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Terms checkbox */}
          {formFieldsVisible.terms && (
            <div className={`field-container ${currentField === 'terms' ? 'active-field' : ''}`}>
              {currentField === 'terms' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <div className="check">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                    required
                  />
                  <span>
                    Yes; nEO tOKYO may use and share my email to enable personalized advertising with third parties (e.g. Google, Twitch) and to send me info about new releases, updates, events, or other related content.
                  </span>
                </div>
              </div>
              {currentField === 'terms' && isFieldValid('terms') && (
                <button 
                  className="next-field-button terms-next"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
              
              {currentField === 'terms' && (
                <>
                  {/* Social login options */}
                  <p className="text-gray-500 uppercase text-sm font-medium mt-6">
                    yOU CAN ALSO CREATE AN aCCOUNT WITH
                  </p>
                  
                  <div className="icons">
                    {[Google, Apple, Linkedin].map((icon, index) => (
                      <div 
                        key={index}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <img 
                          src={icon} 
                          alt={`Social ${index + 1}`} 
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* First name field */}
          {formFieldsVisible.first_name && (
            <div className={`field-container ${currentField === 'first_name' ? 'active-field' : ''}`}>
              {currentField === 'first_name' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <input 
                type="text" 
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name" 
                className="input-box" 
                required
              />
              {currentField === 'first_name' && isFieldValid('first_name') && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Last name field */}
          {formFieldsVisible.last_name && (
            <div className={`field-container ${currentField === 'last_name' ? 'active-field' : ''}`}>
              {currentField === 'last_name' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <input 
                type="text" 
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name" 
                className="input-box" 
              />
              {currentField === 'last_name' && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Phone number field */}
          {formFieldsVisible.phone_number && (
            <div className={`field-container ${currentField === 'phone_number' ? 'active-field' : ''}`}>
              {currentField === 'phone_number' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <input 
                type="tel" 
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number" 
                className="input-box" 
                required
              />
              {currentField === 'phone_number' && isFieldValid('phone_number') && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Date of birth field */}
          {formFieldsVisible.date_of_birth && (
            <div className={`field-container ${currentField === 'date_of_birth' ? 'active-field' : ''}`}>
              {currentField === 'date_of_birth' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <label>Date of Birth</label>
              <input 
                type="date" 
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="input-box" 
                required
              />
              
              {formData.age && (
                <div className="age-display">
                  <span>Age: {formData.age}</span>
                </div>
              )}
              
              {currentField === 'date_of_birth' && isFieldValid('date_of_birth') && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* PIN code field */}
          {formFieldsVisible.pin_code && (
            <div className={`field-container ${currentField === 'pin_code' ? 'active-field' : ''}`}>
              {currentField === 'pin_code' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <input 
                type="number" 
                name="pin_code"
                value={formData.pin_code}
                onChange={handleChange}
                placeholder="PIN Code" 
                className="input-box" 
                required
              />
              {currentField === 'pin_code' && isFieldValid('pin_code') && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* District field */}
          {formFieldsVisible.district && (
            <div className={`field-container ${currentField === 'district' ? 'active-field' : ''}`}>
              {currentField === 'district' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <input 
                type="text" 
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="District" 
                className="input-box" 
                required
              />
              {currentField === 'district' && isFieldValid('district') && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* State field */}
          {formFieldsVisible.state && (
            <div className={`field-container ${currentField === 'state' ? 'active-field' : ''}`}>
              {currentField === 'state' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <input 
                type="text" 
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State" 
                className="input-box" 
                required
              />
              {currentField === 'state' && isFieldValid('state') && (
                <button 
                  className="next-field-button"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Address field */}
          {formFieldsVisible.address && (
            <div className={`field-container ${currentField === 'address' ? 'active-field' : ''}`}>
              {currentField === 'address' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <textarea 
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Full Address" 
                className="input-box textarea" 
              />
              {currentField === 'address' && (
                <button 
                  className="next-field-button address-next"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Submit button */}
          {formFieldsVisible.submit && (
            <div className={`field-container ${currentField === 'submit' ? 'active-field' : ''}`}>
              {currentField === 'submit' && (
                <div className="back-button-small" onClick={moveToPreviousField}>
                  <IoArrowBackCircleSharp />
                </div>
              )}
              <p>Please review your information and submit when ready:</p>
              <button 
                className="team-buttons submit-button"
                onClick={handleSubmit}
              >
                <span className="teams">SUBMIT</span>
              </button>
            </div>
          )}
        </div>
        
        <h3>
          ALREADY HAVE AN ACCOUNT?{' '}
          <button 
            onClick={() => setIsLogin(true)}
          >
            SIGN IN
          </button>
        </h3>
      </>
    );
  };

  // Function to load sample data for testing
  const loadSampleData = () => {
    setFormData(sampleData);
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="quote-container">
          <p className="quote animate-fade-in">
            𝖭𝖤𝖶 𝖳𝖧𝖨𝖭𝖪𝖨𝖭𝖦 𝖤𝖭𝖣𝖫𝖤𝖲𝖲 𝖯𝖮𝖲𝖲𝖨𝖡𝖨𝖫𝖨𝖳𝖨𝖤𝖲
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="button-container">
          <button
            className={`btn ${isLogin ? 'black-btn' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`btn ${!isLogin ? 'black-btn' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setCurrentField('email');
              setFormFieldsVisible({
                email: true,
                password: false,
                terms: false,
                first_name: false,
                last_name: false,
                phone_number: false,
                date_of_birth: false,
                pin_code: false,
                district: false,
                state: false,
                address: false,
                submit: false
              });
            }}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <div className="form-container animate-slide-up">
            <h2>Welcome Back</h2>
            
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChangeOTP}
              placeholder="Email" 
              className="input-box" 
            />
           <button onClick={handleSendOTP} className="send-otp-button">Send OTP</button>
            {/* <input 
              type="number"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter OTP " 
              className="input-box" 
            />
            <button onClick={handleSendOTP}>Submit OTP</button> */}
            <OtpInput/>
            
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            
            <div className="icons">
              {[Google, Apple, Linkedin].map((icon, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={()=>LoginWith(index)}
                >
                  <img 
                    src={icon} 
                    alt={`Social ${index + 1}`} 
                  />
                </div>
              ))}
            </div>
            
            <button 
              className="team-buttons"
              onMouseEnter={() => setIsHovered('login')}
              onMouseLeave={() => setIsHovered(false)}
            >
              <IoArrowForwardCircleSharp className="text-2xl" />
              <span className="teams">Login</span>
            </button>
          </div>
        ) : (
          <div className="Register-Container animate-slide-up">
            {renderSequentialRegistration()}
          </div>
        )}
        
        {/* For development only - comment this out in production */}
        {/* <button 
          onClick={loadSampleData} 
          style={{position: 'fixed', bottom: '10px', right: '10px', background: '#ccc', padding: '5px', borderRadius: '5px'}}
        >
          Load Sample Data
        </button> */}
      </div>
    </div>
  );
};

export default Login;