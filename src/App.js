import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shope/shop";
import Header from "./components/header/header.jsx";
import SingInUp from "./pages/sign-in-up/sign-in-up";

import { selectCurrentUser } from "./redux/user/selector";
import Checkout from "./pages/checkout/checkout";
import { checkUserSession } from "./redux/user/actions";

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     const userRef = await createUserProfileDocument(user);
    //     userRef.onSnapshot((snapShot) => {
    //       setCurrentUser({ id: snapShot.id, ...snapShot.data() });
    //     });
    //   } else {
    //     setCurrentUser(user);
    //   }
    // });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.user ? <Redirect to="/" /> : <SingInUp />
            }
          />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
