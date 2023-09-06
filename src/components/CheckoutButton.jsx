// import React, { useState } from "react";

// const CheckoutButton = ({ orderData }) => {
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   const handlePayment = async () => {
//     setPaymentLoading(true);

//     try {
//       const response = await fetch("https://townbazzar-backend.onrender.com/order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       const order = await response.json();

//       const options = {
//         key: "your-razorpay-key-id",
//         amount: order.amount,
//         currency: order.currency,
//         name: "Your Company Name",
//         description: "Payment for your order",
//         order_id: order.id,
//         handler: (response) => {
//           // Handle the success or failure of the payment here
//           console.log(response);
//         },
//         prefill: {
//           name: "User Name",
//           email: "user@example.com",
//           phone_number: "1234567890",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Error creating order:", error);
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   return (
//     <button onClick={handlePayment} disabled={paymentLoading}>
//       {paymentLoading ? "Processing..." : "Pay Now"}
//     </button>
//   );
// };

// export default CheckoutButton;
