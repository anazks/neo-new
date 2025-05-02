// userApi.js - Fixed version
import Axios from "../Axios/Axios";
import CryptoJS from "crypto-js";
import { jwtDecode } from "jwt-decode";

const SECRET_KEY = "your_secret_key_123";

export const RegisterUser = async (data) => {
  try {
      console.log(data, "in js")
      const response = await Axios.post('/authentication/user_registration/', data, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(response.data, "userAPI from register user")
      return response;
  } catch (error) {
    console.error("Error registering user:", error);
    return error;
  }
}

export const submitOTP = async (email) => {
  try {
    console.log(email, "in js");
    
    const response = await Axios.post(
      "/authentication/generate_otp/",
      { identifier: email },
      { headers: { "Content-Type": "application/json" } }
    );
    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending OTP:",
      error
    );
    return null;
  }
};

export const verifyOtp = async (email, otp, setToken, setIsAdmin) => {
  try {
    console.log(email, otp, "in js");
    
    const response = await Axios.post(
      "/authentication/verify_otp_and_login/",
      { identifier: email, otp: otp },
      { headers: { "Content-Type": "application/json" } }
    );
    
    console.log(response.data, "response from verifyOtp");

    console.log(response.data.is_admin,"admin");
    // Check if setIsAdmin is a function before calling it
    // if (response?.data?.is_admin === true) {
    //   setIsAdmin(true);
    // } else {
    //   setIsAdmin(false)
    //   console.warn("setIsAdmin is not a function");
    // }
    
    if (response?.data?.access) {
      let token = response.data.access;
      let admin = response.data.is_admin
      setIsAdmin(response.data.is_admin);
      // Set the token using setToken from context
      if (typeof setToken === 'function') {
        setToken(token);
      } else {
        console.warn("setToken is not a function");
      }
      
      // Encrypt the token before storing it
      const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
      
      // Store the encrypted token in localStorage
      localStorage.setItem("token", encryptedToken);
      
      return ({data:true,admin});
    } else {
      console.error("No access token in response data");
      return false;
    }
  } catch (error) {
    console.error(
      "Error verifying OTP:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};
// export const verifyOtp = async (email, otp, setToken, SetIsAdmin) => {
//   try {
//     console.log(email, otp, "in js");
    
//     const response = await Axios.post(
//       "/authentication/verify_otp_and_login/",
//       { identifier: email, otp: otp },
//       { headers: { "Content-Type": "application/json" } }
//     );
    
//     console.log(response.data, "response from verifyOtp");
//       if(response?.data?.is_admin == true){
//         SetIsAdmin(true)
//       }else{
//         SetIsAdmin(false)
//       }
//     if (response?.data?.access) {
//       let token = response.data.access;
     
      
//       // Set the token using setToken from context
//       setToken(token);
      
//       // Encrypt the token before storing it
//       const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
      
//       // Store the encrypted token in localStorage
//       localStorage.setItem("token", encryptedToken);
      
//       return true;
//     } else {
//       console.error("No access token in response data");
//       return false;
//     }
//   } catch (error) {
//     console.error(
//       "Error verifying OTP:",
//       error.response ? error.response.data : error.message
//     );
//     return false;
//   }
// };

// Remove the hook usage and make this a helper function
export const decryptToken = () => {
  try {
    const encryptedToken = localStorage.getItem("token");
    if (!encryptedToken) return null;
    
    const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decryptedToken;
  } catch (error) {
    console.error("Error decrypting token:", error);
    return null;
  }
};

// Make this a regular function that uses the decryptToken helper
// export const getUserInfo = async () => {
//   try {
//     const token = decryptToken();
//     if (!token) return null;
    
//     let tokenDecoded = jwtDecode(token);
//     console.log(tokenDecoded, "token decoded..");
//     let user = await Axios.get(`authentication/get_user_data/${tokenDecoded.user_id}`)
//     console.log(user,"user in api ")
//     if(user){
//         return user;
//     }else{
//         return {message : "unknown user"}
//     }
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };
// In userApi.js
export const getUserInfo = async () => {
    try {
      // Get the encrypted token from localStorage
      const encryptedToken = localStorage.getItem("token");
      if (!encryptedToken) return null;
      
      // Decrypt the token
      const decryptedToken = CryptoJS.AES.decrypt(
        encryptedToken, 
        SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      
      if (!decryptedToken) return null;
      
      // Decode the JWT token
      const tokenData = jwtDecode(decryptedToken);
      console.log("Token decoded:", tokenData);
      let user = await Axios.get(`authentication/get_user_data/${tokenData.user_id}`)
        console.log(user,"user in api ")
      return user;
    } catch (error) {
      console.error("Error getting user info:", error);
      return null;
    }
  };

export const  addTocart = async (product_id)=>{
  try {
      let quantity= 1;
      let cartAdded = await Axios.post(`orders/add_to_cart/`,{product_id,quantity})
      console.log(cartAdded)
      return true
  } catch (error) {
    return false
  }
}

export const getMyCart = async()=>{
  try {
    let myCart = await Axios.get(`orders/cart_detail/`)
    console.log(myCart,"cart-")
    return myCart
  } catch (error) {
    return false
  }
}

export const RemoveFromCart =  async(item_id)=>{
  try {
        const removecart = await Axios.post('orders/remove_from_cart/',{item_id})
        return removecart
  } catch (error) {
    console.log(error)
    return error 
  }
}
export const cartIncrement = async(product_id, cart_id) => {
  try {
    console.log( cart_id, product_id, "in user api")

    let increment = await Axios.post(`/orders/cart/${cart_id}/product/${product_id}/increase/`)
    console.log(increment, "inc")
    return increment
  } catch (error) {
    console.log(error)
    return error
  }
}

export const cartDecrement = async(product_id, cart_id) => {
  try {
    console.log( cart_id, product_id, "in user api")

    let increment = await Axios.post(`/orders/cart/${cart_id}/product/${product_id}/decrease/`)
    console.log(increment, "inc")
    return increment
  } catch (error) {
    console.log(error)
    return error
  }
}

export const CreateOrder = async(id)=>{
  try {
    let delivery_address_id = id
    let payments = await Axios.post(`/orders/order/cart/`,{delivery_address_id})
    console.log(payments,"paymnets...callback")
    return payments 
  } catch (error) {
    console.log(error)
    return error
  }
}

export const AddDelievryAddress = async(data)=>{
  try {
    console.log(data,"in api--------")
    let address = await Axios.post('/authentication/delivery-addresses/',data)
    console.log(address)
    return address
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getMyDeliveryAddress = async()=>{
  try {
    let address = await Axios.get('/authentication/delivery-addresses')
    console.log(address,"get my dev address")
    return address
    
  } catch (error) {
    console.log(error)
    return error
  }
}
export const getMyPrimaryAddress = async()=>{
  try {
    let primaryAddress = await Axios.get('/authentication/delivery-addresses/primary/')
    return primaryAddress
  } catch (error) {
    return error 
  }
}

export const getMyOrder = async()=>{
  try {
    let orders = await Axios.get('orders/user/orders/')
    console.log(orders,"my orders")
    return orders
  } catch (error) {
    console.log(error)
    return error 
  }
}

