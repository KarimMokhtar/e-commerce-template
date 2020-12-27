import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/selector";
import { checkUserSession } from "./redux/user/actions";
import Header from "./components/header/header.jsx";
import Spinner from "./components/spinner";

const HomePage = lazy(() => import("./pages/homepage/homepage"));
const ShopPage = lazy(() => import("./pages/shope/shop"));
const SingInUp = lazy(() => import("./pages/sign-in-up/sign-in-up"));
const Checkout = lazy(() => import("./pages/checkout/checkout"));

const App = ({ checkUserSession, user }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <>
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={Checkout} />
          <Route
            exact
            path="/signin"
            render={() => (user ? <Redirect to="/" /> : <SingInUp />)}
          />
        </Suspense>
      </Switch>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
