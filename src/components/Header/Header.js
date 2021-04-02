import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";
import menuBar from "../../icons/menu.png";

const Header = () => {
  const [loggedUserData] = useContext(UserContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light text-white my-nav">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>Bazar-Sodai</b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src={menuBar} alt=""></img>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/deals">
                  Deals
                </Link>
              </li>
              {loggedUserData.isLoggedIn && (
                <li className="nav-item img-item">
                  <Link to="" className="nav-link disabled">
                    <img
                      className="ms-1 pro-pic"
                      src={loggedUserData.image}
                      alt=""
                    ></img>
                  </Link>
                </li>
              )}
              <li className="nav-item">
                {loggedUserData.isLoggedIn ? (
                  <Link
                    onClick={loggedUserData.handleSignOut}
                    className="mt-md-0 mt-3 ms-md-3 ms-0 btn btn-danger my-btn"
                    to=""
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    className="mt-md-0 mt-3 ms-md-3 ms-0 btn btn-danger my-btn"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
