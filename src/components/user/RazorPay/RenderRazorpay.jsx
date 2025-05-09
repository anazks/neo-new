import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from '../../../Axios/Axios';
import PaymentDone from '../PaymentDone/PaymentDone';
import {payemntCallBack} from '../../../Services/Products'
const loadScript = (src) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    console.log('Razorpay loaded successfully');
    resolve(true);
  };
  script.onerror = () => {
    console.log('Error loading Razorpay');
    resolve(false);
  };
  document.body.appendChild(script);
});

const RenderRazorpay = ({ orderDetails, setDisplayRazorpay }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  const rzpInstance = useRef(null); // Ref to store Razorpay instance

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      console.log('Razorpay SDK failed to load. Are you online?');
      return;
    }
   
    console.log('Order Details:', orderDetails);
    let {data} = orderDetails
    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: "NEO TOKYO",
      description: "Order Payment",
      order_id: data.raz_order_id,
      handler: async (response) => {
        console.log("Payment Success Response:", response);
        paymentId.current = response.razorpay_payment_id;

        await handlePayment("success", {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          raz_order_id: orderDetails.raz_order_id,
        });
        
        // Close the Razorpay modal
        if (rzpInstance.current) {
          rzpInstance.current.close();
        }
        setDisplayRazorpay(false)
        
        // Set payment success to true after handling payment
        setPaymentSuccess(true);
      },
      prefill: {
        name: "Neo Tokyo",
        email: "user@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "User Address",
      },
      theme: {
        color: "#528FF0",
      },
      modal: {
        // This ensures the modal closes when payment is successful
        ondismiss: () => {
          if (!paymentSuccess) {
            setDisplayRazorpay(false);
          }
        }
      }
    };

    rzpInstance.current = new window.Razorpay(options);

    rzpInstance.current.on('payment.submit', (response) => {
      paymentMethod.current = response.method;
    });

    rzpInstance.current.on('payment.failed', async (response) => {
      console.log("Payment Failed:", response.error);
      paymentId.current = response.error.metadata?.payment_id || null;
      await handlePayment("failed", {
        ...response.error,
        raz_order_id: orderDetails.raz_order_id,
      });
      rzpInstance.current.close();
      setDisplayRazorpay(false);
    });

    rzpInstance.current.open();
  };

  const handlePayment = async (status, paymentDetails) => {
    try {
      const data = {
        orderId: paymentDetails.raz_order_id,
        paymentId: paymentId.current,
        paymentMethod: paymentMethod.current,
        status: status,
        ...paymentDetails,
      };

      console.log("Sending payment result to server:", data);
      const response = await payemntCallBack(data);
      console.log("Server response:", response.data);
      if (response.data.payment === true) {
        window.location.href = "/payed";
        localStorage.setItem("payed", true);
        console.log("Payment status updated successfully on server.");  
      } else {
        console.error("Failed to update payment status on server:", response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!paymentSuccess) {
      console.log('Initializing Razorpay...');
      displayRazorpay();
    }

    return () => {
      // Clean up Razorpay instance when component unmounts
      if (rzpInstance.current) {
        rzpInstance.current.close();
      }
    };
  }, [paymentSuccess]);

  useEffect(() => {
    if (paymentSuccess) {
      setDisplayRazorpay(false);
      console.log('Payment was successful, displaying success message...');
    }
  }, [paymentSuccess, setDisplayRazorpay]);

  if (paymentSuccess) {
    return <PaymentDone />;
  }

  return null;
};

RenderRazorpay.propTypes = {
  orderDetails: PropTypes.shape({
    keyId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    razorpayOrderId: PropTypes.string.isRequired,
    raz_order_id: PropTypes.string.isRequired,
  }).isRequired,
  setDisplayRazorpay: PropTypes.func.isRequired,
};

export default RenderRazorpay;