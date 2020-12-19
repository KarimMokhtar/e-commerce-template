import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import stripeImg from "../../assets/stripe.ico";
const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HNMi6GEGAYsLL3ABayDNQijgrrdodkoolR2ygQinmJnGNROVV3pSOtPAxEt7GjyuJPN9e7VKhut71WBK7CEPC3J00d984a4US";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((res) => {
        alert("Payment was successfull");
      })
      .catch((err) => {
        console.log("payment err:", err);
        alert(
          "there was an issue with your payment. please sure you use the provided credit card"
        );
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image={stripeImg}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
