import React from "react";
import loader from "../../icons/preloader.gif";
const Spinner = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <img src={loader} alt="" />
    </div>
  );
};

export default Spinner;
