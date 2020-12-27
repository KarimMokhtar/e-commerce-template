import React from "react";
import Spinner from "../spinner";

import "./with-spinner.scss";
const WithSpinner = (WrappedComponent) => ({ loading, ...props }) => {
  console.log("loadingloading", loading);
  return loading ? <Spinner /> : <WrappedComponent {...props} />;
};

export default WithSpinner;
