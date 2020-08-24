import React from "react";
import { connect } from "react-redux";
import "./cart-dropdown.scss";
import CustomButton from "../custom-button/custom-button";
import { selectCartItems } from "../../redux/cart/selector";
import CartItem from "../cart-item/cart-item";

const CartDropdown = ({ items }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: selectCartItems(state),
});

export default connect(mapStateToProps)(CartDropdown);
