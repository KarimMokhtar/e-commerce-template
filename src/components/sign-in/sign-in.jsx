import React from "react";
import { connect } from "react-redux";
import "./sign-in.scss";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import { auth } from "../../firebase/firebase.utils";
import { googleSignInStart } from "../../redux/user/actions";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      console.log(user);
      // createUserProfileDocument(user, { displayName });
      this.setState({ email: "", password: "" });
    } catch (error) {}
  };
  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h1>I already have account</h1>
        <span>Sing in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            required
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
            label="Password"
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton
              type="button"
              isGoogleSignIn
              onClick={googleSignInStart}
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);
