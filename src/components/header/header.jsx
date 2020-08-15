import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./header.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { auth } from "../../firebase/firebase.utils";
const Header = ({ user }) => (
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

      {!user ? (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      ) : (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      )}
    </div>
  </div>
);
const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});
export default connect(mapStateToProps)(Header);
