import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="container">
      <div className="row not-height d-flex align-items-center justify-content-center">
        <div className="col-md-4">
          <div className="not-found d-flex align-items-center justify-content-center ">
            <div>
              <h1 className="display-4">404</h1>
              <p className="lead">Page Not Found</p>
              <Link className="btn btn-danger my-btn" to="/">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="my-card d-flex align-items-center  text-center">
    //   <div className="container my-container">
    //
    //   </div>
    // </div>
  );
};

export default NotFound;
