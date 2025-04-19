import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // ✅ use named import

const GoogleLoginComponent = () => {
  const [googleAuth, setGoogleAuth] = useState(false);

  const LoginWith = async (data) => {
    try {
      const decoded = jwtDecode(data.credential); // ✅ decode JWT
      console.log("Decoded Google User:", decoded);

      // Optional: Save user or send token to backend
      localStorage.setItem("googleUser", JSON.stringify(decoded));

      setGoogleAuth(true);
      console.log(true, "googleAuth");
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="69145476126-31qfbt7ehrgopm6uka09end6hchl2e4j.apps.googleusercontent.com">
      <div className="flex justify-center items-center h-screen">
        <div>
          <h2 className="text-xl font-semibold mb-4">Login with Google</h2>
          <GoogleLogin
            onSuccess={LoginWith}
            onError={() => {
              console.log('Google Login Failed');
            }}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
