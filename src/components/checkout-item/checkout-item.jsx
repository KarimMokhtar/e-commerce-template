import React from "react";
import {connect} from 'react-redux';

import "./checkout-item.scss";

const CheckoutItem = ({ cartItem: { name, imgUrl, price, quantity } }) => {
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imgUrl} alt="item" />
      </div>
  <span className="name">{name}</span>
  <span className="quantity">{quantity}</span>
  <span className="price">{price}</span>
      <div className="remove-button">&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
