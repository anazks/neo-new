import React, { useState, useEffect } from 'react';
import { IoArrowForwardCircleSharp, IoArrowBackCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import {RegisterUser} from '../../../Services/userApi';
import Apple from '../../../Images/LoginWith/apple.png';
import Linkedin from '../../../Images/LoginWith/Linkedin.png';
import Google from '../../../Images/LoginWith/Google.png';
import logo from '../../../Images/LoginWith/neo_tokyo-logo.png';
import OtpInput from '../OtpSubmit/otp';
import { submitOTP } from '../../../Services/userApi';
import Alert from '../Alert/Alert';
import Pro from '../../../Images/pro.jpg';
import GoogleLoginComponent from '../../user/Google/GoogleLoginComponent';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);
  const [sentingotp, setsentingtOtp] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(true);

  const LoginWith = async (data) => {
    try {
      setGoogleAuth(true);
      navigate('/GoogleAuth');
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleChangeOTP = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSendOTP = async () => {
    const email = formData.email;
    if (email === "") {
      setsentingtOtp(false);
    } else {
      setShowEmailInput(false);
      setTimeout(() => {
        setsentingtOtp(true);
      }, 300);
    }
    localStorage.setItem("email", email);
    let OTPResponse = await submitOTP(email);
    console.log(OTPResponse);
  };

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

  const registrationFields = [
    'email',
    'password',
    'terms',
    'first_name',
    'last_name',
    'phone_number',
    'date_of_birth',
    'pin_code',
    'district',
    'state',
    'address',
    'submit'
  ];

  const calculateProgress = () => {
    const currentIndex = registrationFields.indexOf(currentField);
    if (currentIndex === -1) return 0;
    return (currentIndex / (registrationFields.length - 1)) * 100;
  };

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const registrationData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone_number: formData.phone_number,
      date_of_birth: formData.date_of_birth,
      pin_code: formData.pin_code,
      age: formData.age,
      district: formData.district,
      state: formData.state,
      address: formData.address,
      role: 'user'
    };
    
    console.log("Registration Data:", registrationData);
    let response = await RegisterUser(registrationData);
    console.log(response, "response from register user");
      if(response.status === 400) {
        console.log(response.response.datal, "error message")
        setErrorMessage(response.response.data.detail);
      }else{
        setMessage(response.data.message);
      }
  
    setIsLogin(true);
  };

  const moveToNextField = () => {
    const currentIndex = registrationFields.indexOf(currentField);
    if (currentIndex < registrationFields.length - 1) {
      const nextField = registrationFields[currentIndex + 1];
      setCurrentField(nextField);
      
      setFormFieldsVisible(prev => {
        const updated = { ...prev };
        for (let i = 0; i <= currentIndex + 1; i++) {
          updated[registrationFields[i]] = true;
        }
        return updated;
      });
    }
  };

  const moveToPreviousField = () => {
    const currentIndex = registrationFields.indexOf(currentField);
    if (currentIndex > 0) {
      setCurrentField(registrationFields[currentIndex - 1]);
    }
  };

  const getStepFromField = (field) => {
    if (['email', 'password', 'terms'].includes(field)) return 1;
    if (['first_name', 'last_name', 'phone_number'].includes(field)) return 2;
    if (['date_of_birth', 'pin_code'].includes(field)) return 3;
    if (['district', 'state', 'address', 'submit'].includes(field)) return 4;
    return 1;
  };

  const getCurrentStep = () => {
    return getStepFromField(currentField);
  };

  const isFieldValid = (fieldName) => {
    if (fieldName === 'terms') return agreedToTerms;
    if (fieldName === 'submit') return true;
    if (fieldName === 'last_name') return true;
    if (fieldName === 'address') return true;
    return !!formData[fieldName];
  };

  const renderSequentialRegistration = () => {
    const currentStep = getCurrentStep();
    
    return (
      <div className="w-full max-w-md mx-auto" style={{minHeight: '600px'}}>
        {/* Step indicator */}
        <div className="flex flex-col mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(step => (
              <div 
                key={step} 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-black h-2 rounded-full" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
        
        {/* Headings */}
        <div className="mb-6">
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-2">What's Your Email</h2>
              <p className="text-gray-600">Psst.. It's a secret. we've got your back</p>
            </>
          )}
          {currentStep === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="text-gray-600">Tell us a bit about yourself</p>
            </>
          )}
          {currentStep === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Date & Location</h2>
              <p className="text-gray-600">Help us know you better</p>
            </>
          )}
          {currentStep === 4 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Address Information</h2>
              <p className="text-gray-600">Almost there!</p>
            </>
          )}
        </div>
        
        {/* Form fields */}
        <div className="space-y-4">
          {formFieldsVisible.email && (
            <div className={`relative ${currentField === 'email' ? '' : 'hidden'}`}>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {currentField === 'email' && isFieldValid('email') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {formFieldsVisible.password && (
            <div className={`relative ${currentField === 'password' ? '' : 'hidden'}`}>
              {currentField === 'password' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {currentField === 'password' && isFieldValid('password') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {formFieldsVisible.terms && (
            <div className={`relative ${currentField === 'terms' ? '' : 'hidden'}`}>
              {currentField === 'terms' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-600">
                  Yes; NEO TOKYO may use and share my email to enable personalized advertising with third parties (e.g. Google, Twitch) and to send me info about new releases, updates, events, or other related content.
                </span>
              </div>
              {currentField === 'terms' && isFieldValid('terms') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* First Name field */}
          {formFieldsVisible.first_name && (
            <div className={`relative ${currentField === 'first_name' ? '' : 'hidden'}`}>
              {currentField === 'first_name' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <input 
                type="text" 
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {currentField === 'first_name' && isFieldValid('first_name') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Last Name field */}
          {formFieldsVisible.last_name && (
            <div className={`relative ${currentField === 'last_name' ? '' : 'hidden'}`}>
              {currentField === 'last_name' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <input 
                type="text" 
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {currentField === 'last_name' && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Phone Number field */}
          {formFieldsVisible.phone_number && (
            <div className={`relative ${currentField === 'phone_number' ? '' : 'hidden'}`}>
              {currentField === 'phone_number' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <input 
                type="tel" 
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {currentField === 'phone_number' && isFieldValid('phone_number') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Date of Birth field */}
          {formFieldsVisible.date_of_birth && (
            <div className={`relative ${currentField === 'date_of_birth' ? '' : 'hidden'}`}>
              {currentField === 'date_of_birth' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <input 
                type="date" 
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {currentField === 'date_of_birth' && isFieldValid('date_of_birth') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Pin Code field */}
          {formFieldsVisible.pin_code && (
            <div className={`relative ${currentField === 'pin_code' ? '' : 'hidden'}`}>
              {currentField === 'pin_code' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <input 
                type="text" 
                name="pin_code"
                value={formData.pin_code}
                onChange={handleChange}
                placeholder="Pin Code" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {currentField === 'pin_code' && isFieldValid('pin_code') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* District field */}
          {formFieldsVisible.district && (
            <div className={`relative ${currentField === 'district' ? '' : 'hidden'}`}>
              {currentField === 'district' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <input 
                type="text" 
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="District" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {currentField === 'district' && isFieldValid('district') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* State field */}
          {formFieldsVisible.state && (
            <div className={`relative ${currentField === 'state' ? '' : 'hidden'}`}>
              {currentField === 'state' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <input 
                type="text" 
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {currentField === 'state' && isFieldValid('state') && (
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {/* Address field */}
          {formFieldsVisible.address && (
            <div className={`relative ${currentField === 'address' ? '' : 'hidden'}`}>
              {currentField === 'address' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address" 
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              />
              {currentField === 'address' && (
                <button 
                  className="absolute right-2 top-1/4 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )}
            </div>
          )}
          
          {formFieldsVisible.submit && (
            <div className={`relative ${currentField === 'submit' ? '' : 'hidden'}`}>
              {currentField === 'submit' && (
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )}
              <div className="bg-gray-100 p-4 rounded-lg mb-4" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <h3 className="font-medium mb-2">Review Your Information:</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Name:</strong> {formData.first_name} {formData.last_name}</p>
                  <p><strong>Phone:</strong> {formData.phone_number}</p>
                  <p><strong>Date of Birth:</strong> {formData.date_of_birth} (Age: {formData.age})</p>
                  <p><strong>Location:</strong> {formData.district}, {formData.state}, {formData.pin_code}</p>
                  <p><strong>Address:</strong> {formData.address}</p>
                </div>
              </div>
              <button 
                className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ALREADY HAVE AN ACCOUNT?{' '}
              <button 
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-medium"
              >
                SIGN IN
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-[95%] h-[98%] mx-auto shadow-xl rounded-xl overflow-hidden bg-white flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/2 relative text-white p-8 flex flex-col justify-between">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-black opacity-60 absolute z-10"></div>
            <img src={Pro} alt="Background" className="w-full h-full object-cover" />
          </div>
          
          <div className="mb-8 relative z-20">
            <img src={logo} alt="Logo" className="h-12" />
          </div>
          <div className="text-center md:text-left relative z-20">
            <p className="text-xl md:text-2xl font-light italic">
              𝖭𝖤𝖶 𝖳𝖧𝖨𝖭𝖪𝖨𝖭𝖦 𝖤𝖭𝖣𝖫𝖤𝖲𝖲 𝖯𝖮𝖲𝖲𝖨𝖡𝖨𝖫𝖨𝖳𝖨𝖤𝖲
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center" style={{minHeight: '600px'}}>
          <div className="flex justify-center space-x-4 mb-8">
            <button
              className={`px-6 py-2 rounded-full transition-colors ${isLogin ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-colors ${!isLogin ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
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

          {sentingotp && (
            <div className="mb-4">
              <Alert 
                type="success"
                message="OTP sent successfully!"
                productId={null}
              />
            </div>
          )}

          { message && (
            <div className="mb-4">
              <Alert
                type="success"
                message={message}
                productId={null}
              />
            </div>
          )}
          {
            errorMessage && (
              <div className="mb-4">
                <Alert
                  type="error"
                  message={errorMessage}
                  productId={null}
                />
              </div>
            )
          }
          {isLogin ? (
            <div className="max-w-md w-full" style={{minHeight: '500px'}}>
              <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
              
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {showEmailInput && (
                    <motion.div
                      key="email-input"
                      initial={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChangeOTP}
                        placeholder="Email" 
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {showEmailInput && (
                    <motion.div
                      key="otp-button"
                      initial={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 bg-white rounded-xl"
                    >
                      <button 
                        onClick={handleSendOTP} 
                        style={{
                          backgroundColor:"black",
                          height:"40px",
                          width:"200px"
                        }}
                        className="top-1/2 transform -translate-y-1/2 bg- text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Generate OTP
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {sentingotp && (
                    <motion.div
                      key="otp-input"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <OtpInput />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {!sentingotp && (
                    <motion.div
                      key="social-login"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="my-6"
                    >
                      <p className="text-center text-gray-500 text-sm uppercase tracking-wider mb-4">
                        OR
                      </p>
                      <div className="flex justify-center space-x-6">
                        <GoogleLoginComponent />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="w-full">
              {renderSequentialRegistration()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;