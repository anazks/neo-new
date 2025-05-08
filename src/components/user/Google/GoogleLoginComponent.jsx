import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { googleAuth } from "../../../Services/userApi";
import { useAuth } from "../../../Context/UserContext";
const GoogleLoginComponent = ({ onLoginSuccess }) => {
  const { token, setToken, user } = useAuth();

  // When Google returns a successful login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      // credentialResponse.credential is the JWT token
      const token = credentialResponse.credential;
      const response = await googleAuth(token);
      // Handle the response from your backend
      const data = response.data;
      console.log(data);
      setToken(data.access);
    } catch (error) {
      console.log(error);
    }
  };

  // Store the JWT tokens in local storage or state
  //   localStorage.setItem('access_token', data.access);
  //   localStorage.setItem('refresh_token', data.refresh);

  //   // Call the onLoginSuccess callback if provided
  //   if (onLoginSuccess) {
  //     onLoginSuccess(data);
  //   }

  //   console.log("Authentication successful", data);
  // } catch (error) {
  //   console.error('Error during Google authentication', error);
  // }
  // };

  return (
    <GoogleOAuthProvider clientId="752728323430-85geretfsn5f7ino654hcqolnrm955c3.apps.googleusercontent.com">
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Google Login Failed")}
          useOneTap
          theme="filled_blue"
          shape="circle"
          type="icon"
          size="large"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
