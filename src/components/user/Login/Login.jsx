import React, { useState, useEffect } from "react";
import {
  IoArrowForwardCircleSharp,
  IoArrowBackCircleSharp,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../Services/userApi";
import Apple from "../../../Images/LoginWith/apple.png";
import Linkedin from "../../../Images/LoginWith/Linkedin.png";
import Google from "../../../Images/LoginWith/Google.png";
import logo from "../../../Images/LoginWith/neo_tokyo-logo.png";
import OtpInput from "../OtpSubmit/otp";
import { submitOTP } from "../../../Services/userApi";
import Alert from "../Alert/Alert";
import Pro from "../../../Images/pro.jpg";
import GoogleLoginComponent from "../../user/Google/GoogleLoginComponent";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(false);
  const [sentingotp, setsentingtOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(true);

  const LoginWith = async (data) => {
    try {
      setGoogleAuth(true);
      navigate("/GoogleAuth");
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    date_of_birth: "",
    pin_code: "",
    age: "",
    district: "",
    state: "",
    address: "",
    role: "user",
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
  const [currentField, setCurrentField] = useState("email");
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
    submit: false,
  });

  const registrationFields = [
    "email",
    "password",
    "terms",
    "first_name",
    "phone_number",
    "submit",
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

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setFormData((prev) => ({ ...prev, age: age.toString() }));
    }
  }, [formData.date_of_birth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registrationData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      phone_number: formData.phone_number,
      role: "user",
    };

    console.log("Registration Data:", registrationData);
    let response = await RegisterUser(registrationData);
    console.log(response, "response from register user");
    if (response.status === 400) {
      console.log(response.response.datal, "error message");
      setErrorMessage(response.response.data.detail);
    } else {
      setMessage(response.data.message);
    }

    setIsLogin(true);
  };

  const moveToNextField = () => {
    const currentIndex = registrationFields.indexOf(currentField);
    if (currentIndex < registrationFields.length - 1) {
      const nextField = registrationFields[currentIndex + 1];
      setCurrentField(nextField);

      setFormFieldsVisible((prev) => {
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
    if (["first_name", "email", "phone_number"].includes(field)) return 1;
    if (["password", "cpassword"].includes(field)) return 2;
    if (["terms"].includes(field)) return 3;
    // if (["district", "state", "address", "submit"].includes(field)) return 4;
    return 1;
  };

  const getCurrentStep = () => {
    return getStepFromField(currentField);
  };

  const isFieldValid = (fieldName) => {
    if (fieldName === "terms") return agreedToTerms;
    if (fieldName === "submit") return true;
    if (fieldName === "last_name") return true;
    if (fieldName === "address") return true;
    return !!formData[fieldName];
  };

  const renderSequentialRegistration = () => {
    const currentStep = getCurrentStep();

    return (
      <div className="w-full max-w-md mx-auto" style={{ minHeight: "600px" }}>
        {/* Step indicator */}
        <div className="flex flex-col mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-600"
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
              <h2 className="text-2xl font-bold mb-2">
                What's Your Basic Information
              </h2>
              <p className="text-gray-600">
                Psst.. It's a secret. we've got your back
              </p>
            </>
          )}
          {currentStep === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Set Your Secret</h2>
              <p className="text-gray-600">Set Your Secret Password Now</p>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-2">Please Agree Terms</h2>
              <p className="text-gray-600">Almost there!</p>
            </>
          )}
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          {formFieldsVisible.email && (
            <div
              className={`relative ${currentField === "email" ? "" : "hidden"}`}
            >
              <div className="relative" style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  id="FirstNameInput"
                  required
                  className="w-full pt-5 pb-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderRadius: "20px",
                    border: "2px solid black",
                    padding: "1rem 0.4rem 0.5rem 0.4rem",
                  }}
                />
                <label
                  htmlFor="FirstNameInput"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    formData.first_name
                      ? "text-xs top-1 text-gray-600"
                      : "text-base top-3 text-gray-400"
                  }`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Name
                </label>
              </div>

              <div className="relative" style={{ marginTop: "10px" }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  id="regEmail"
                  required
                  className="w-full pt-5 pb-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderRadius: "20px",
                    // border: "2px solid black",
                    backgroundColor: "lightgray",

                    padding: "1rem 0.4rem 0.5rem 0.4rem",
                  }}
                />
                <label
                  htmlFor="regEmail"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    formData.email
                      ? "text-xs top-1 text-gray-600"
                      : "text-base top-3 text-gray-400"
                  }`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Email ID
                </label>
              </div>

              <div className="relative " style={{ marginTop: "10px" }}>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  id="tel"
                  required
                  className="w-full pt-5 pb-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderRadius: "20px",
                    // border: "2px solid black",
                    padding: "1rem 0.4rem 0.5rem 0.4rem",
                    backgroundColor: "lightgray",
                  }}
                />
                <label
                  htmlFor="tel"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    formData.phone_number
                      ? "text-xs top-1 text-gray-600"
                      : "text-base top-3 text-gray-400"
                  }`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Phone Number
                </label>
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wap",
                  gap: "20px",
                }}
              >
                {/* Always display the button, but make it disabled when validation fails */}
                <button
                  disabled={
                    !(
                      isFieldValid("email") &&
                      isFieldValid("phone_number") &&
                      isFieldValid("first_name")
                    )
                  }
                  style={{
                    backgroundColor:
                      isFieldValid("email") &&
                      isFieldValid("phone_number") &&
                      isFieldValid("first_name")
                        ? "black"
                        : "#999", // Gray color when disabled
                    height: "40px",
                    width: "200px",
                    borderRadius: "20px",
                    marginTop: "15px",
                    opacity:
                      isFieldValid("email") &&
                      isFieldValid("phone_number") &&
                      isFieldValid("first_name")
                        ? "1"
                        : "0.7", // Reduced opacity when disabled
                    cursor:
                      isFieldValid("email") &&
                      isFieldValid("phone_number") &&
                      isFieldValid("first_name")
                        ? "pointer"
                        : "not-allowed",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: "40px", // Make room for the arrow circle
                  }}
                  className="text-white px-3 py-1 rounded text-sm transition-colors"
                  onClick={moveToNextField}
                >
                  Next
                  {/* Arrow circle positioned on the right side */}
                  <div
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      height: "100%", // Full height of button
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* Black arrow pointing right */}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              {/* {currentField === "email" && isFieldValid("email") && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )} */}
            </div>
          )}

          {formFieldsVisible.password && (
            <div
              className={`relative ${
                currentField === "password" ? "" : "hidden"
              }`}
            >
              {/* {currentField === "password" && (
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )} */}

              <div className="relative" style={{ marginTop: "10px" }}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  required
                  className="w-full pt-5 pb-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderRadius: "20px",
                    border: "2px solid black",
                    // backgroundColor: "lightgray",

                    padding: "1rem 0.4rem 0.5rem 0.4rem",
                  }}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    formData.password
                      ? "text-xs top-1 text-gray-600"
                      : "text-base top-3 text-gray-400"
                  }`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Enter Password
                </label>
              </div>

              <div className="relative" style={{ marginTop: "10px" }}>
                <input
                  type="password"
                  name="cpassword"
                  value={formData.password1}
                  onChange={handleChange}
                  id="cpassword"
                  required
                  className="w-full pt-5 pb-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderRadius: "20px",
                    // border: "2px solid black",
                    backgroundColor: "lightgray",

                    padding: "1rem 0.4rem 0.5rem 0.4rem",
                  }}
                />
                <label
                  htmlFor="cpassword"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    formData.cpassword
                      ? "text-xs top-1 text-gray-600"
                      : "text-base top-3 text-gray-400"
                  }`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Confirm Password
                </label>
              </div>

              {/* {currentField === "password" && isFieldValid("password") && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )} */}
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wap",
                  gap: "20px",
                }}
              >
                <button
                  style={{
                    backgroundColor: "black",
                    height: "40px",
                    width: "200px",
                    borderRadius: "20px",
                    marginTop: "15px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: "40px", // Make room for the arrow circle
                  }}
                  className="text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  onClick={moveToPreviousField}
                >
                  {/* Arrow circle positioned on the left side */}
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0",
                      height: "100%", // Full height of button
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* Black arrow pointing left */}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 12H5M5 12L12 5M5 12L12 19"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  Previous
                </button>

                <button
                  style={{
                    backgroundColor:
                      isFieldValid("password") && isFieldValid("cpassword")
                        ? "black"
                        : "#999", // Gray color when disabled
                    height: "40px",
                    width: "200px",
                    borderRadius: "20px",
                    marginTop: "15px",
                    opacity:
                      isFieldValid("password") && isFieldValid("cpassword")
                        ? "1"
                        : "0.7", // Reduced opacity when disabled
                    cursor:
                      isFieldValid("password") && isFieldValid("cpassword")
                        ? "pointer"
                        : "not-allowed",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: "40px", // Make room for the arrow circle
                  }}
                  className="text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  onClick={moveToNextField}
                >
                  Next
                  {/* Arrow circle positioned on the right side */}
                  <div
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      height: "100%", // Full height of button
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* Black arrow pointing right */}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {formFieldsVisible.terms && (
            <div
              className={`relative ${currentField === "terms" ? "" : "hidden"}`}
            >
              {/* {currentField === "terms" && (
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={moveToPreviousField}
                >
                  <IoArrowBackCircleSharp className="text-xl" />
                </button>
              )} */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-600">
                  Yes; NEO TOKYO may use and share my email to enable
                  personalized advertising with third parties (e.g. Google,
                  Twitch) and to send me info about new releases, updates,
                  events, or other related content.
                </span>
              </div>
              {/* {currentField === "terms" && isFieldValid("terms") && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600"
                  onClick={moveToNextField}
                >
                  <IoArrowForwardCircleSharp className="text-2xl" />
                </button>
              )} */}

              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wap",
                  gap: "20px",
                }}
              >
                <button
                  style={{
                    backgroundColor: "black",
                    height: "40px",
                    width: "200px",
                    borderRadius: "20px",
                    marginTop: "15px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: "40px", // Make room for the arrow circle
                  }}
                  className="text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  onClick={moveToPreviousField}
                >
                  {/* Arrow circle positioned on the left side */}
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0",
                      height: "100%", // Full height of button
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* Black arrow pointing left */}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 12H5M5 12L12 5M5 12L12 19"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  Previous
                </button>

                {isFieldValid("terms") && (
                  <button
                    style={{
                      backgroundColor: "black",
                      height: "40px",
                      width: "200px",
                      borderRadius: "20px",
                      marginTop: "15px",
                    }}
                    className="text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          )}

          {/* OTP field */}
          {formFieldsVisible.first_name && (
            <div>
              <div className="relative" style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  name="OTP"
                  value={formData.password1}
                  onChange={handleChange}
                  id="otp"
                  required
                  className="w-full pt-5 pb-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    borderRadius: "20px",
                    // border: "2px solid black",
                    backgroundColor: "lightgray",
                    textAlign: "center",

                    padding: "1rem 0.4rem 0.5rem 0.4rem",
                  }}
                />
                <label
                  htmlFor="otp"
                  className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                    formData.OTP
                      ? "text-xs top-1 text-gray-600"
                      : "text-base top-3 text-gray-400"
                  }`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  OTP
                </label>
              </div>

              <button
                className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                style={{ borderRadius: "20px", marginTop: "15px" }}
              >
                SUBMIT
              </button>
            </div>
          )}

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
                {/* OR Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <p className="text-center text-gray-500 text-sm uppercase tracking-wider px-4">
                    OR
                  </p>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-6">
                  <GoogleLoginComponent />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ALREADY HAVE AN ACCOUNT?{" "}
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
            <div
              className="inset-0 bg-white opacity-70 backdrop-blur-md"
              style={{
                width: "100%",
                position: "absolute",
                height: "100%",
                backdropFilter: "blur(8px)",
              }}
            ></div>
            <div className="w-full h-full bg-black opacity-60 absolute z-10"></div>
            <a href="/">
              <img
                src={Pro}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </a>
          </div>

          <div className="mb-8 relative z-20" style={{ minHeight: "200px" }}>
            <img
              src={logo}
              alt="Logo"
              className="h-12 absolute"
              style={{ opacity: ".6" }}
            />

            <div
              className="text-center md:text-left absolute z-20"
              style={{ top: "50%" }}
            >
              <p
                className="text-xl md:text-3xl tracking-tight font-normal"
                style={{
                  // fontFamily: "'Bebas Neue', 'Oswald', 'Barlow Condensed', sans-serif",
                  letterSpacing: "-0.05em",
                  fontWeight: "300",
                  textTransform: "uppercase",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                NEW THINKING
                <br />
                ENDLESS POSSIBILITIES
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="md:w-1/2 p-8 flex flex-col justify-center"
          style={{ minHeight: "600px" }}
        >
          <div className="flex justify-center space-x-4 mb-8">
            <button
              className={`px-6 py-2 rounded-full transition-colors ${
                isLogin
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-full transition-colors ${
                !isLogin
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => {
                setIsLogin(false);
                setCurrentField("email");
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
                  submit: false,
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

          {message && (
            <div className="mb-4">
              <Alert type="success" message={message} productId={null} />
            </div>
          )}
          {errorMessage && (
            <div className="mb-4">
              <Alert type="error" message={errorMessage} productId={null} />
            </div>
          )}
          {isLogin ? (
            <div
              className="max-w-md w-full login-container"
              style={{ minHeight: "300px", margin: "auto", marginTop: "50px" }}
            >
              <h2 className="text-2xl font-bold mb-6 text-left">Login</h2>

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
                      {/* Replace your current input with this code */}
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChangeOTP}
                          id="emailInput"
                          className="w-full pt-5 pb-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{
                            borderRadius: "20px",
                            border: "2px solid black",
                            padding: "1rem 0.4rem 0.5rem 0.4rem",
                          }}
                        />
                        <label
                          htmlFor="emailInput"
                          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
                            formData.email
                              ? "text-xs top-1 text-gray-600"
                              : "text-base top-3 text-gray-400"
                          }`}
                          style={{ marginLeft: "0.5rem" }}
                        >
                          Email
                        </label>
                      </div>
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
                          backgroundColor: "black",
                          height: "40px",
                          width: "200px",
                          borderRadius: "20px",
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
                      {/* OR Divider */}
                      <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <p className="text-center text-gray-500 text-sm uppercase tracking-wider px-4">
                          OR
                        </p>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>
                      <div className="flex justify-center space-x-6">
                        <GoogleLoginComponent />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="w-full">{renderSequentialRegistration()}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
