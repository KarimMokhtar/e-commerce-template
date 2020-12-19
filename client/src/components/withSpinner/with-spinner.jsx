import React from "react";

import "./with-spinner.scss";
const WithSpinner = (WrappedComponent) => ({ loading, ...props }) => {
  console.log("loadingloading", loading);
  return loading ? (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  ) : (
    <WrappedComponent {...props} />
  );
};

export default WithSpinner;
