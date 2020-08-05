import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";

import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shope/shop";
import Header from "./components/header/header.jsx";
import SingInUp from "./pages/sign-in-up/sign-in-up";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });

    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <>
      <Header user={user}/>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SingInUp} />
      </Switch>
    </>
  );
}

export default App;
