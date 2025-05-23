import React from "react";
import axios from "axios";
import Apiconfigs from "../apiconfigs/Apiconfig";

const RazorpayPayment = () => {
  const handlePayment = async () => {
    const amount = 5; // ₹5.00
    console.log("asasas", process.env.REACT_APP_RAZORPAY_KEY_ID);

    try {
      const res = await axios({
        url: Apiconfigs?.create_order,
        method: "POST",
        data: { amount: amount },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("resassasas", res);

      const { orderId } = res.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace with your Razorpay key_id
        amount: 100,
        currency: "INR",
        name: "black product",
        description: "Test Transaction",
        order_id: orderId,
        handler: function (response) {
          alert("Payment ID: " + response.razorpay_payment_id);
          alert("Order ID: " + response.razorpay_order_id);
          alert("Signature: " + response.razorpay_signature);
        },
        prefill: {
          name: "Monu Rajput",
          email: "monurajput89099@gmail.com",
          contact: "8433203463",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <button className="button-92" onClick={handlePayment}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-cart3"
        viewBox="0 0 16 16"
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
      </svg>
      Checkout and Pay ₹5
    </button>
  );
};

export default RazorpayPayment;
