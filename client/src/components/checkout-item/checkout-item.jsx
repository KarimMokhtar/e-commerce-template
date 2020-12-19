import React from "react";
import { connect } from "react-redux";

import { clearItem, removeItem, addItem } from "../../redux/cart/actions";
import "./checkout-item.scss";

const CheckoutItem = ({ cartItem, clearItem, removeItem, addItem }) => {
  const { name, imgUrl, price, quantity, id } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imgUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(id)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItem(id)}>
        &#10005;
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  clearItem: (id) => dispatch(clearItem(id)),
  removeItem: (id) => dispatch(removeItem(id)),
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(CheckoutItem);
