import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { selectCartHidden } from "../../redux/cart/selector";
import { selectCurrentUser } from "../../redux/user/selector";

import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import "./header.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { signOutStart } from "../../redux/user/actions";

const Header = ({ currentUser, hidden, signOutStart }) => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo"></Logo>
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>

      {!currentUser ? (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      ) : (
        <div className="option" onClick={signOutStart}>
          SIGN OUT
        </div>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);
const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
