import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import googleIcon from "../../icons/Group 573.png";
import "./Login.css";

import firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import "firebase/auth";
import { UserContext } from "../../App";

const firebaseInitializer = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};
firebaseInitializer();

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [loggedUserData, setLoggedUserData] = useContext(UserContext);
  const handleGooglSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const newUserInfo = { ...loggedUserData };
        newUserInfo.userName = displayName;
        newUserInfo.email = email;
        newUserInfo.image = photoURL;
        newUserInfo.isLoggedIn = true;
        newUserInfo.error = "";
        newUserInfo.handleSignOut = handleSignOut;
        setLoggedUserData(newUserInfo);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUserInfo = { ...loggedUserData };
        newUserInfo.error = errorMessage;
        setLoggedUserData(newUserInfo);
      });
  };
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const newUserInfo = { ...loggedUserData };
        newUserInfo.userName = "";
        newUserInfo.email = "";
        newUserInfo.image = "";
        newUserInfo.isLoggedIn = false;
        newUserInfo.error = "";
        newUserInfo.handleSignOut = handleSignOut;
        setLoggedUserData(newUserInfo);
      });
  };


  return (
    <div className="container mt-4">
      <Link className="my-link text-dark" to="/">
        <h3>Bazar-Sodai</h3>
      </Link>
      <div className="row height-vh d-flex justify-content-center align-items-center mx-md-0 mx-3">
        <div className="col-md-6 login-form border border-1 d-flex align-items-center justify-content-center">
          <div>
            <button
              onClick={handleGooglSignIn}
              className="my-btn-google d-flex align-items-center justify-content-center"
            >
              <img className="me-auto" src={googleIcon} alt=""></img>
              <span className="me-auto">Continue with Google</span>
            </button>
            {loggedUserData.error && (
              <p className="d-block text-center error">
                {loggedUserData.error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
