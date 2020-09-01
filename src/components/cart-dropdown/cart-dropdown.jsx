import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import "./cart-dropdown.scss";
import CustomButton from "../custom-button/custom-button";
import { selectCartItems } from "../../redux/cart/selector";
import CartItem from "../cart-item/cart-item";
import { toggleCartHidden } from "../../redux/cart/actions";
const CartDropdown = ({ items, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {items.length ? (
          items.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <span className="empty-message">Your cart is empoty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          dispatch(toggleCartHidden());
          history.push("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  items: selectCartItems,
});
export default withRouter(connect(mapStateToProps)(CartDropdown));
