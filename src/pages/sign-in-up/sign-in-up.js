import React from "react";

import "./sign-in-up.scss";
import SignIn from "../../components/sign-in/sign-in.jsx";
import SignUp from "../../components/sign-up/sign-up";

const SingInUp = (props) => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
);

export default SingInUp;
